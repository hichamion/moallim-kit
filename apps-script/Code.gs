/**
 * MoallemKit cloud storage (protocol 2).
 *
 * Setup:
 *  1. Paste this file into Extensions > Apps Script of a private Google Sheet.
 *  2. Run setupToken once and copy the token from the execution log.
 *  3. Deploy > New deployment > Web app: Execute as "Me", access "Anyone".
 *     "Anyone" is required so the browser can reach the script; the token is
 *     what protects the data. Treat it like a password.
 */
var APP_ID = 'moallemkit';
var PROTOCOL = 2;
var DATA_SHEET = 'moallemkit_data';
var TEMP_SHEET = 'moallemkit_tmp';
var BACKUP_PREFIX = 'moallemkit_backup_';
var BACKUPS_TO_KEEP = 14;
var CHUNK_SIZE = 40000; // A Google Sheets cell holds at most 50,000 characters.
var CHUNK_PREFIX = 'd:'; // Stops Sheets from reading a chunk as a formula or number.

function setupToken() {
  var token = (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, '');
  PropertiesService.getScriptProperties().setProperty('SYNC_TOKEN', token);
  Logger.log('SYNC TOKEN: ' + token);
}

function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** GET answers a ping only. Data never leaves through a URL. */
function doGet() {
  return jsonOutput_({ ok: true, app: APP_ID, protocol: PROTOCOL });
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOutput_({ ok: false, error: 'bad_request' });
  }

  var expected = PropertiesService.getScriptProperties().getProperty('SYNC_TOKEN');
  if (!expected) return jsonOutput_({ ok: false, error: 'token_not_configured' });
  if (body.token !== expected) return jsonOutput_({ ok: false, error: 'unauthorized' });

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return jsonOutput_({ ok: false, error: 'busy' });
  try {
    if (body.action === 'read') return jsonOutput_(readData_());
    if (body.action === 'write') return jsonOutput_(writeData_(body));
    return jsonOutput_({ ok: false, error: 'bad_request' });
  } catch (err) {
    return jsonOutput_({ ok: false, error: 'server_error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getRevision_() {
  return Number(PropertiesService.getScriptProperties().getProperty('REVISION')) || 0;
}

function readSheetText_(sheet) {
  var rows = sheet.getLastRow();
  if (rows < 1) return '';
  var values = sheet.getRange(1, 1, rows, 1).getValues();
  return values.map(function (row) {
    return String(row[0]).slice(CHUNK_PREFIX.length);
  }).join('');
}

/** Data written by the first version of the script sits in cell A1 of the first sheet. */
function readLegacyCell_(book) {
  var first = book.getSheets()[0];
  if (!first || first.getName().indexOf('moallemkit_') === 0) return '';
  var value = first.getRange('A1').getValue();
  return typeof value === 'string' && value.charAt(0) === '{' ? value : '';
}

function readData_() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(DATA_SHEET);
  var payload = sheet ? readSheetText_(sheet) : '';
  var legacy = false;
  if (!payload) {
    payload = readLegacyCell_(book);
    legacy = Boolean(payload);
  }
  var props = PropertiesService.getScriptProperties();
  return {
    ok: true,
    revision: getRevision_(),
    updatedAt: props.getProperty('UPDATED_AT') || '',
    legacy: legacy,
    payload: payload
  };
}

function writeData_(body) {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var payload = String(body.payload || '');
  var parsed;
  try {
    parsed = JSON.parse(payload);
  } catch (err) {
    return { ok: false, error: 'bad_payload' };
  }
  if (!parsed || !Array.isArray(parsed.classes)) return { ok: false, error: 'bad_payload' };

  var current = getRevision_();
  var base = body.revision === null || body.revision === undefined ? null : Number(body.revision);
  var hasData = current > 0 || Boolean(book.getSheetByName(DATA_SHEET)) || Boolean(readLegacyCell_(book));
  var inSync = base === null ? !hasData : base === current;
  if (!inSync && !body.force) {
    return {
      ok: false,
      error: 'conflict',
      revision: current,
      updatedAt: PropertiesService.getScriptProperties().getProperty('UPDATED_AT') || ''
    };
  }

  // Build the new copy beside the old one so a failure leaves the old copy intact.
  var stale = book.getSheetByName(TEMP_SHEET);
  if (stale) book.deleteSheet(stale);
  var temp = book.insertSheet(TEMP_SHEET);
  var rows = [];
  for (var i = 0; i < payload.length; i += CHUNK_SIZE) {
    rows.push([CHUNK_PREFIX + payload.slice(i, i + CHUNK_SIZE)]);
  }
  temp.getRange(1, 1, rows.length, 1).setNumberFormat('@').setValues(rows);
  SpreadsheetApp.flush();

  if (readSheetText_(temp) !== payload) {
    book.deleteSheet(temp);
    return { ok: false, error: 'verify_failed' };
  }

  var live = book.getSheetByName(DATA_SHEET);
  if (live) retireSheet_(book, live);
  temp.setName(DATA_SHEET);

  var props = PropertiesService.getScriptProperties();
  var revision = current + 1;
  var updatedAt = new Date().toISOString();
  props.setProperties({ REVISION: String(revision), UPDATED_AT: updatedAt });
  return { ok: true, revision: revision, updatedAt: updatedAt, chars: payload.length };
}

/** Keeps the first copy of each day as a dated backup and removes the rest. */
function retireSheet_(book, sheet) {
  var day = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  var name = BACKUP_PREFIX + day;
  if (book.getSheetByName(name)) {
    book.deleteSheet(sheet);
  } else {
    sheet.setName(name);
  }
  var backups = book.getSheets().filter(function (s) {
    return s.getName().indexOf(BACKUP_PREFIX) === 0;
  }).sort(function (a, b) {
    return a.getName() < b.getName() ? -1 : 1;
  });
  while (backups.length > BACKUPS_TO_KEEP) {
    book.deleteSheet(backups.shift());
  }
}
