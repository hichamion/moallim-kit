// Server-side checks for apps-script/Code.gs: node tests/run.mjs
import assert from 'node:assert/strict';
import { createMock } from './mock-gas.mjs';

const call = (mock, body) => JSON.parse(mock.sandbox.doPost({ postData: { contents: JSON.stringify(body) } }).text);
const token = 'test-token';
const big = (chars) => JSON.stringify({ classes: [], filler: 'ا'.repeat(chars) });

{
  const m = createMock();
  assert.deepEqual(JSON.parse(m.sandbox.doGet({}).text), { ok: true, app: 'moallemkit', protocol: 2 });
  assert.equal(call(m, { token: 'wrong', action: 'read' }).error, 'unauthorized');
  assert.equal(call(m, { action: 'read' }).error, 'unauthorized');
}
{
  const m = createMock({ token: '' });
  assert.equal(call(m, { token: '', action: 'read' }).error, 'token_not_configured');
}
{
  // Data far past the 50,000-character cell limit round-trips intact.
  const m = createMock();
  const payload = big(600000);
  const w = call(m, { token, action: 'write', revision: null, payload });
  assert.equal(w.ok, true);
  assert.equal(w.revision, 1);
  assert.equal(w.chars, payload.length);
  const r = call(m, { token, action: 'read' });
  assert.equal(r.payload, payload);
  assert.equal(r.revision, 1);
}
{
  // A chunk that begins with "=" is not treated as a formula.
  const m = createMock();
  const filler = 'x'.repeat(40000 - '{"classes":[],"a":"'.length) + '=SUM(1)';
  const payload = JSON.stringify({ classes: [], a: filler });
  assert.equal(call(m, { token, action: 'write', revision: null, payload }).ok, true);
  assert.equal(call(m, { token, action: 'read' }).payload, payload);
}
{
  // A stale device is refused unless the teacher forces the write.
  const m = createMock();
  const v1 = big(10);
  const v2 = big(20);
  assert.equal(call(m, { token, action: 'write', revision: null, payload: v1 }).revision, 1);
  assert.equal(call(m, { token, action: 'write', revision: 1, payload: v2 }).revision, 2);
  const stale = call(m, { token, action: 'write', revision: 1, payload: v1 });
  assert.equal(stale.error, 'conflict');
  assert.equal(stale.revision, 2);
  assert.equal(call(m, { token, action: 'write', revision: null, payload: v1 }).error, 'conflict');
  assert.equal(call(m, { token, action: 'read' }).payload, v2);
  assert.equal(call(m, { token, action: 'write', revision: 1, force: true, payload: v1 }).revision, 3);
}
{
  // Data from the first version of the script can be read, and is not overwritten silently.
  const legacy = '{"classes":[{"id":"x"}]}';
  const m = createMock({ legacyA1: legacy });
  const r = call(m, { token, action: 'read' });
  assert.equal(r.legacy, true);
  assert.equal(r.payload, legacy);
  assert.equal(r.revision, 0);
  assert.equal(call(m, { token, action: 'write', revision: null, payload: big(5) }).error, 'conflict');
  assert.equal(call(m, { token, action: 'write', revision: 0, payload: big(5) }).ok, true);
  assert.equal(m.sheets[0].cells[0], legacy);
}
{
  assert.equal(call(createMock(), { token, action: 'write', payload: 'not json' }).error, 'bad_payload');
  assert.equal(call(createMock(), { token, action: 'write', payload: '{"a":1}' }).error, 'bad_payload');
}
{
  // Failure while writing leaves the live copy untouched.
  const m = createMock();
  const v1 = big(10);
  call(m, { token, action: 'write', revision: null, payload: v1 });
  const insert = m.book.insertSheet;
  m.book.insertSheet = () => { throw new Error('quota'); };
  assert.equal(call(m, { token, action: 'write', revision: 1, payload: big(99) }).error, 'server_error');
  m.book.insertSheet = insert;
  assert.equal(call(m, { token, action: 'read' }).payload, v1);
}
{
  // One dated backup per day, and the backups stay readable.
  const m = createMock();
  for (let i = 0; i < 4; i++) call(m, { token, action: 'write', revision: i || null, payload: big(i + 1) });
  const names = m.sheets.map((s) => s.name).filter((n) => n.startsWith('moallemkit_backup_'));
  assert.equal(names.length, 1);
}
console.log('Code.gs checks passed');
