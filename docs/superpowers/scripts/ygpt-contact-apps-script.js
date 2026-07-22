const SECRET = 'REPLACE_WITH_LONG_RANDOM_SECRET'; // same value as GOOGLE_SHEETS_SECRET

const HEADERS = {
  volunteer: ['Timestamp', 'First Name', 'Last Name', 'Email', 'Interests', 'Why Join'],
  partner: ['Timestamp', 'Organization', 'Contact Person', 'Role', 'Partnership Type', 'Proposal'],
  contact: ['Timestamp', 'Name', 'Email', 'Subject', 'Message'],
};

const SHEETS = {
  volunteer: 'Volunteer',
  partner: 'Partner',
  contact: 'Contact',
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) {
      return json_({ ok: false, error: 'Unauthorized' });
    }
    const type = String(data.type || '').toLowerCase();
    const sheetName = SHEETS[type];
    if (!sheetName) {
      return json_({ ok: false, error: 'Invalid type' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      return json_({ ok: false, error: 'Missing sheet: ' + sheetName });
    }

    // Ensure header row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS[type]);
    }

    const ts = new Date().toISOString();
    let row;
    if (type === 'volunteer') {
      row = [
        ts,
        data.firstName || '',
        data.lastName || '',
        data.email || '',
        Array.isArray(data.interests) ? data.interests.join(', ') : (data.interests || ''),
        data.whyJoin || '',
      ];
    } else if (type === 'partner') {
      row = [
        ts,
        data.organization || '',
        data.contactPerson || '',
        data.role || '',
        data.partnershipType || '',
        data.proposal || '',
      ];
    } else {
      row = [
        ts,
        data.name || '',
        data.email || '',
        data.subject || '',
        data.message || '',
      ];
    }

    sheet.appendRow(row);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
