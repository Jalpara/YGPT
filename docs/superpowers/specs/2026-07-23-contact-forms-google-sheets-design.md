# Contact Forms → Google Sheets Design

**Date:** 2026-07-23  
**Repo:** ygpt  
**Status:** Awaiting user review  
**Related UI:** `#/contact` (`pages/Contact.tsx`) — Volunteer / Partner / Contact tabs

## Problem

The three Get Involved forms are presentational only (no controlled state, no submit handlers). Submissions need to land in a Google Sheet for the team to review.

## Goals

1. Persist Volunteer, Partner, and Contact form submissions into one Google Spreadsheet with three tabs.
2. Keep the existing custom UI (no Google Form embed).
3. Keep the Apps Script web app URL and shared secret off the client (server-mediated).

## Non-goals

- Email notifications / Resend
- Auth-gated submissions
- Editing or reading rows from the app
- Spam protection beyond a shared secret + basic validation (CAPTCHA can be a follow-up)

## Decisions (locked)

| Decision | Choice |
|---|---|
| Sheet layout | One spreadsheet, three tabs: `Volunteer`, `Partner`, `Contact` |
| Write path | Google Apps Script web app |
| App architecture | Browser → `POST /api/contact` → Apps Script → Sheet |
| Local DX | Vite middleware for `/api/contact` (same pattern as events) |

## Architecture

```
Browser (Contact.tsx)
  → POST /api/contact  { type, fields... }
  → Vercel serverless / Vite middleware
  → POST Apps Script Web App URL  { secret, type, ... }
  → Appends row to matching sheet tab
```

Env (server only):

- `GOOGLE_SHEETS_WEBAPP_URL` — deployed Apps Script web app URL
- `GOOGLE_SHEETS_SECRET` — shared secret checked by the script

## Sheet setup (you create)

1. Create a Google Spreadsheet (any name, e.g. `YGPT Contact Submissions`).
2. Rename the first three sheets (tabs) exactly:
   - `Volunteer`
   - `Partner`
   - `Contact`
3. Put these **header rows in row 1** of each tab:

### Volunteer

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | First Name | Last Name | Email | Interests | Why Join | |

### Partner

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | Organization | Contact Person | Role | Partnership Type | Proposal |

### Contact

| A | B | C | D | E |
|---|---|---|---|---|
| Timestamp | Name | Email | Subject | Message |

## Apps Script (you paste + deploy)

In the spreadsheet: **Extensions → Apps Script**. Replace the default file with:

```javascript
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
```

**Deploy:**

1. Deploy → New deployment → Type: **Web app**
2. Execute as: **Me**
3. Who has access: **Anyone**
4. Deploy → copy the **Web app URL**
5. Put URL + the same `SECRET` into ygpt `.env` as `GOOGLE_SHEETS_WEBAPP_URL` and `GOOGLE_SHEETS_SECRET`

After script edits, create a **new deployment version** (or Manage deployments → Edit → New version) so the live URL picks up changes.

## API: `POST /api/contact`

**Request JSON**

```json
{
  "type": "volunteer" | "partner" | "contact",
  "...fields": "per type below"
}
```

### Field contracts

**volunteer:** `firstName`, `lastName`, `email` (required); `interests` (string[]); `whyJoin`  
**partner:** `organization`, `contactPerson`, `email?` optional; `role`, `partnershipType`, `proposal` — required: `organization`, `contactPerson`, `partnershipType`, `proposal`  
**contact:** `name`, `email`, `subject`, `message` (all required)

**Responses**

| Status | Body |
|---|---|
| 200 | `{ "ok": true }` |
| 400 | `{ "error": "..." }` validation |
| 500 | `{ "error": "Server misconfigured" }` missing env |
| 502 | `{ "error": "Failed to save submission" }` Apps Script failure |

Server forwards `{ secret, type, ...fields }` to the web app URL with `Content-Type: application/json`. Does not expose the secret or web app URL to the client.

## Frontend

Update `pages/Contact.tsx`:

- Controlled inputs for all three forms
- `preventDefault` submit → `POST /api/contact`
- Loading / success / error UI per form (disable button while submitting)
- On success: clear fields + short confirmation message

Optional tiny client helper: `services/contactService.ts`.

## Files (implementation sketch)

| Path | Role |
|---|---|
| `api/contact.ts` | Vercel handler |
| `lib/contact-submit.ts` | Validate + forward to Apps Script |
| `vite-plugin-api-events.ts` or sibling plugin | Dev middleware for `/api/contact` |
| `pages/Contact.tsx` | Wire forms |
| `.env.example` | Document new vars |
| `docs/.../apps-script-contact.js` | Canonical script copy for the sheet owner |

## Testing

- Unit: validation rejects missing required fields / invalid `type`
- Manual: submit each form with `npm run dev`; confirm new rows appear on the correct tab
- Confirm Network tab shows only `/api/contact` (not the Apps Script URL)

## Risks

| Risk | Mitigation |
|---|---|
| Apps Script URL public if leaked from server logs | Don't log full URL+body; rotate secret |
| Anyone access on web app | Shared secret required; follow-up CAPTCHA if abused |
| Deploy version stale after script edit | Document “new version” step |

## What we need from you before/during implementation

1. Create the Sheet + three tabs + headers (or leave headers empty — script can write them).
2. Paste script, set `SECRET`, deploy web app.
3. Add `GOOGLE_SHEETS_WEBAPP_URL` and `GOOGLE_SHEETS_SECRET` to local `.env` (and Vercel production env when deploying).

You can reply with “sheet ready” + that the two env vars are set (do **not** paste the secret into chat).
