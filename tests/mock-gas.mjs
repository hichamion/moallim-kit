// Runs the real apps-script/Code.gs on a fake Google Sheet, served over local HTTP.
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

class FakeRange {
  constructor(sheet, row, col, rows) { Object.assign(this, { sheet, row, col, rows }); }
  setNumberFormat() { return this; }
  setValue(v) { this.setValues([[v]]); return this; }
  setValues(values) {
    values.forEach((r, i) => {
      if (String(r[0]).length > 50000) throw new Error('Your input contains more than the maximum of 50000 characters in a single cell.');
      if (/^[=+]/.test(String(r[0]))) throw new Error('formula not allowed in test');
      this.sheet.cells[this.row - 1 + i] = r[0];
    });
    return this;
  }
  getValue() { return this.sheet.cells[this.row - 1] ?? ''; }
  getValues() { return this.sheet.cells.slice(this.row - 1, this.row - 1 + this.rows).map((v) => [v]); }
}

class FakeSheet {
  constructor(name) { this.name = name; this.cells = []; }
  getName() { return this.name; }
  setName(n) { this.name = n; }
  getLastRow() { return this.cells.length; }
  getRange(a, b, c) { return typeof a === 'string' ? new FakeRange(this, 1, 1, 1) : new FakeRange(this, a, b, c); }
}

export function createMock({ token = 'test-token', legacyA1 = '' } = {}) {
  const sheets = [new FakeSheet('Sheet1')];
  if (legacyA1) sheets[0].cells[0] = legacyA1;
  const props = token ? { SYNC_TOKEN: token } : {};
  const book = {
    getSheets: () => [...sheets],
    getSheetByName: (n) => sheets.find((s) => s.name === n) || null,
    insertSheet: (n) => { const s = new FakeSheet(n); sheets.push(s); return s; },
    deleteSheet: (s) => sheets.splice(sheets.indexOf(s), 1)
  };
  const sandbox = {
    SpreadsheetApp: { getActiveSpreadsheet: () => book, flush() {} },
    PropertiesService: { getScriptProperties: () => ({
      getProperty: (k) => props[k] ?? null,
      setProperty: (k, v) => { props[k] = v; },
      setProperties: (o) => Object.assign(props, o)
    }) },
    LockService: { getScriptLock: () => ({ tryLock: () => true, releaseLock() {} }) },
    ContentService: {
      MimeType: { JSON: 'json' },
      createTextOutput: (text) => ({ text, setMimeType() { return this; } })
    },
    Utilities: { getUuid: () => 'a-b', formatDate: (d) => d.toISOString().slice(0, 10) },
    Session: { getScriptTimeZone: () => 'UTC' },
    Logger: { log() {} }
  };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(join(root, 'apps-script/Code.gs'), 'utf8'), sandbox);
  return { sandbox, book, sheets, props };
}

// `old` mode imitates the first version of the script.
export function serveMock(port, mock, { mode = 'v2' } = {}) {
  let oldA1 = '{"classes":[]}';
  let writesToOld = 0;
  const server = createServer((req, res) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (c) => { body += c; });
    req.on('end', () => {
      const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
      if (req.url.startsWith('/prod')) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(readFileSync(join(root, 'dist/moallim-kit.html')));
        return;
      }
      if (req.url.startsWith('/app')) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(readFileSync(join(root, 'tests/.build/test.html')));
        return;
      }
      if (req.url.startsWith('/__')) {
        res.writeHead(200, headers);
        res.end('{}');
        return;
      }
      if (server.failNext) {
        server.failNext = false;
        res.writeHead(500, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/html' });
        res.end('<html>error</html>');
        return;
      }
      if (server.mode === 'old') {
        if (req.method === 'POST') { oldA1 = body; writesToOld++; server.writesToOld = writesToOld; }
        res.writeHead(200, headers);
        res.end(oldA1);
        return;
      }
      const out = req.method === 'POST'
        ? mock.sandbox.doPost({ postData: { contents: body } })
        : mock.sandbox.doGet({});
      res.writeHead(200, headers);
      res.end(out.text);
    });
  });
  server.mode = mode;
  server.writesToOld = 0;
  server.listen(port, '127.0.0.1');
  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.argv[2] || 8766);
  const server = serveMock(port, createMock());
  // Lets the browser test switch failure modes through a test-only route.
  server.prependListener('request', (req) => {
    if (req.url === '/__old') server.mode = 'old';
    if (req.url === '/__v2') server.mode = 'v2';
    if (req.url === '/__fail') server.failNext = true;
  });
  console.log(`mock on http://127.0.0.1:${port}`);
}
