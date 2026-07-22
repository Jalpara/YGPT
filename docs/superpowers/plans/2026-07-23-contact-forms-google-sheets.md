# Contact Forms → Google Sheets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire Volunteer / Partner / Contact forms on `#/contact` so submissions POST to `/api/contact` and append rows to a Google Sheet via Apps Script.

**Architecture:** Pure validation + Apps Script forwarder live in `lib/contact-submit.ts`. Vercel `api/contact.ts` and Vite middleware call the same helper. `pages/Contact.tsx` becomes controlled forms that call `services/contactService.ts`. Sheet owner deploys the Apps Script from the design spec; app only needs env vars.

**Tech Stack:** Vite 6, React 19, Vercel Node serverless, Vitest, Google Apps Script web app (external)

## Global Constraints

- Never expose `GOOGLE_SHEETS_WEBAPP_URL` or `GOOGLE_SHEETS_SECRET` to the client / Vite `define`
- Tabs must be named exactly `Volunteer`, `Partner`, `Contact`
- Form types: `"volunteer" | "partner" | "contact"` only
- Browser must only call relative `/api/contact` (not Apps Script URL)
- Preserve existing Contact page visual design (colors, tabs, layout); only add state + submit behavior
- No CAPTCHA / email / Resend in this change
- Never commit `.env`

## File structure

| Path | Responsibility |
|---|---|
| `docs/superpowers/scripts/ygpt-contact-apps-script.js` | Canonical Apps Script for the sheet owner |
| `lib/contact-submit.ts` | Validate payload + POST to Apps Script |
| `lib/contact-submit.test.ts` | Unit tests for validation and forwarder |
| `api/contact.ts` | Vercel `POST /api/contact` |
| `api/contact.test.ts` | Handler method/env tests |
| `services/contactService.ts` | Browser `fetch('/api/contact')` |
| `pages/Contact.tsx` | Controlled forms + submit UX |
| `vite-plugin-api-events.ts` | Also handle `POST /api/contact` in dev |
| `vite.config.ts` | Load Google env into `process.env` for middleware |
| `.env.example` | Document `GOOGLE_SHEETS_*` |
| `README.md` | Brief setup pointer to design spec / script |

---

### Task 1: Ship Apps Script artifact + env docs

**Files:**
- Create: `docs/superpowers/scripts/ygpt-contact-apps-script.js`
- Modify: `.env.example`
- Modify: `README.md`
- Modify: `vite.config.ts` (add Google env keys to the server-only `process.env` copy loop)

**Interfaces:**
- Produces: documented env keys `GOOGLE_SHEETS_WEBAPP_URL`, `GOOGLE_SHEETS_SECRET`
- Produces: copy-pasteable Apps Script matching the approved design spec

- [ ] **Step 1: Create `docs/superpowers/scripts/ygpt-contact-apps-script.js`**

Copy the Apps Script from `docs/superpowers/specs/2026-07-23-contact-forms-google-sheets-design.md` verbatim into this file (including `SECRET = 'REPLACE_WITH_LONG_RANDOM_SECRET'`).

- [ ] **Step 2: Append to `.env.example`**

```
# Google Sheets contact forms (server only — Apps Script web app)
GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_SHEETS_SECRET=replace-with-long-random-secret
```

- [ ] **Step 3: Update `vite.config.ts` env copy loop**

Add `'GOOGLE_SHEETS_WEBAPP_URL'` and `'GOOGLE_SHEETS_SECRET'` to the existing key list that copies `loadEnv` values into `process.env` (alongside Supabase keys). Do **not** add them to Vite `define`.

- [ ] **Step 4: Add a short README subsection**

After the events run steps, add:

```markdown
## Contact forms → Google Sheets

1. Create a Sheet with tabs `Volunteer`, `Partner`, `Contact` (see design spec).
2. Paste `docs/superpowers/scripts/ygpt-contact-apps-script.js` into Apps Script, set `SECRET`, deploy as Web app (Anyone).
3. Set `GOOGLE_SHEETS_WEBAPP_URL` and `GOOGLE_SHEETS_SECRET` in `.env`.
4. Submit forms at `http://localhost:3000/#/contact`.
```

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/scripts/ygpt-contact-apps-script.js .env.example vite.config.ts README.md
git commit -m "docs: add Apps Script artifact and Google Sheets env for contact forms"
```

---

### Task 2: Validation + Apps Script forwarder (`lib/contact-submit.ts`) — TDD

**Files:**
- Create: `lib/contact-submit.ts`
- Create: `lib/contact-submit.test.ts`
- Test: `lib/contact-submit.test.ts`

**Interfaces:**
- Produces:
  - `export type ContactFormType = 'volunteer' | 'partner' | 'contact'`
  - `export type ContactPayload =` union of the three field shapes with `type`
  - `export function validateContactPayload(input: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string }`
  - `export async function submitContactToSheet(payload: ContactPayload): Promise<{ ok: true; status: 200 } | { ok: false; status: 500 | 502; error: string }>`
- `submitContactToSheet` reads `process.env.GOOGLE_SHEETS_WEBAPP_URL` and `GOOGLE_SHEETS_SECRET`, POSTs JSON `{ secret, ...payload }` to the web app URL with `redirect: 'follow'`, treats non-OK HTTP or `{ ok: false }` JSON as 502, missing env as 500 `{ error: 'Server misconfigured' }`

- [ ] **Step 1: Write failing tests in `lib/contact-submit.test.ts`**

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { validateContactPayload, submitContactToSheet } from './contact-submit';

describe('validateContactPayload', () => {
  it('rejects invalid type', () => {
    expect(validateContactPayload({ type: 'other' }).ok).toBe(false);
  });

  it('accepts volunteer with required fields', () => {
    const result = validateContactPayload({
      type: 'volunteer',
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      interests: ['Teaching'],
      whyJoin: 'Impact',
    });
    expect(result.ok).toBe(true);
  });

  it('rejects volunteer missing email', () => {
    const result = validateContactPayload({
      type: 'volunteer',
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: '',
      interests: [],
      whyJoin: 'x',
    });
    expect(result.ok).toBe(false);
  });

  it('accepts partner required fields', () => {
    const result = validateContactPayload({
      type: 'partner',
      organization: 'Acme',
      contactPerson: 'Bob',
      role: 'CSR',
      partnershipType: 'Corporate CSR',
      proposal: 'Plant trees',
    });
    expect(result.ok).toBe(true);
  });

  it('accepts contact required fields', () => {
    const result = validateContactPayload({
      type: 'contact',
      name: 'Casey',
      email: 'c@example.com',
      subject: 'Hello',
      message: 'Hi there',
    });
    expect(result.ok).toBe(true);
  });
});

describe('submitContactToSheet', () => {
  const payload = {
    type: 'contact' as const,
    name: 'Casey',
    email: 'c@example.com',
    subject: 'Hello',
    message: 'Hi',
  };

  beforeEach(() => {
    process.env.GOOGLE_SHEETS_WEBAPP_URL = 'https://script.google.com/macros/s/test/exec';
    process.env.GOOGLE_SHEETS_SECRET = 'test-secret';
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns misconfigured without env', async () => {
    delete process.env.GOOGLE_SHEETS_SECRET;
    const result = await submitContactToSheet(payload);
    expect(result).toEqual({ ok: false, status: 500, error: 'Server misconfigured' });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('forwards secret + payload to Apps Script', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );
    const result = await submitContactToSheet(payload);
    expect(result).toEqual({ ok: true, status: 200 });
    expect(fetch).toHaveBeenCalledWith(
      'https://script.google.com/macros/s/test/exec',
      expect.objectContaining({
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: 'test-secret', ...payload }),
      })
    );
  });

  it('returns 502 when Apps Script reports failure', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), { status: 200 })
    );
    const result = await submitContactToSheet(payload);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(502);
      expect(result.error).toBe('Failed to save submission');
    }
  });
});
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test -- lib/contact-submit.test.ts
```

Expected: FAIL (module missing).

- [ ] **Step 3: Implement `lib/contact-submit.ts`**

```ts
export type ContactFormType = 'volunteer' | 'partner' | 'contact';

export type VolunteerPayload = {
  type: 'volunteer';
  firstName: string;
  lastName: string;
  email: string;
  interests: string[];
  whyJoin: string;
};

export type PartnerPayload = {
  type: 'partner';
  organization: string;
  contactPerson: string;
  role: string;
  partnershipType: string;
  proposal: string;
};

export type GeneralContactPayload = {
  type: 'contact';
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactPayload = VolunteerPayload | PartnerPayload | GeneralContactPayload;

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

export function validateContactPayload(
  input: unknown
): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!input || typeof input !== 'object') {
    return { ok: false, error: 'Invalid payload' };
  }
  const body = input as Record<string, unknown>;
  const type = body.type;

  if (type === 'volunteer') {
    if (!isNonEmptyString(body.firstName) || !isNonEmptyString(body.lastName) || !isNonEmptyString(body.email)) {
      return { ok: false, error: 'First name, last name, and email are required' };
    }
    const interests = Array.isArray(body.interests)
      ? body.interests.filter((i): i is string => typeof i === 'string')
      : [];
    return {
      ok: true,
      data: {
        type: 'volunteer',
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
        email: body.email.trim(),
        interests,
        whyJoin: typeof body.whyJoin === 'string' ? body.whyJoin.trim() : '',
      },
    };
  }

  if (type === 'partner') {
    if (
      !isNonEmptyString(body.organization) ||
      !isNonEmptyString(body.contactPerson) ||
      !isNonEmptyString(body.partnershipType) ||
      !isNonEmptyString(body.proposal)
    ) {
      return { ok: false, error: 'Organization, contact person, partnership type, and proposal are required' };
    }
    return {
      ok: true,
      data: {
        type: 'partner',
        organization: body.organization.trim(),
        contactPerson: body.contactPerson.trim(),
        role: typeof body.role === 'string' ? body.role.trim() : '',
        partnershipType: body.partnershipType.trim(),
        proposal: body.proposal.trim(),
      },
    };
  }

  if (type === 'contact') {
    if (
      !isNonEmptyString(body.name) ||
      !isNonEmptyString(body.email) ||
      !isNonEmptyString(body.subject) ||
      !isNonEmptyString(body.message)
    ) {
      return { ok: false, error: 'Name, email, subject, and message are required' };
    }
    return {
      ok: true,
      data: {
        type: 'contact',
        name: body.name.trim(),
        email: body.email.trim(),
        subject: body.subject.trim(),
        message: body.message.trim(),
      },
    };
  }

  return { ok: false, error: 'Invalid form type' };
}

export async function submitContactToSheet(
  payload: ContactPayload
): Promise<{ ok: true; status: 200 } | { ok: false; status: 500 | 502; error: string }> {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  const secret = process.env.GOOGLE_SHEETS_SECRET;
  if (!url || !secret) {
    return { ok: false, status: 500, error: 'Server misconfigured' };
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, ...payload }),
    });

    if (!res.ok) {
      return { ok: false, status: 502, error: 'Failed to save submission' };
    }

    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!data || data.ok !== true) {
      return { ok: false, status: 502, error: 'Failed to save submission' };
    }

    return { ok: true, status: 200 };
  } catch {
    return { ok: false, status: 502, error: 'Failed to save submission' };
  }
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test -- lib/contact-submit.test.ts
```

Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/contact-submit.ts lib/contact-submit.test.ts
git commit -m "feat: validate contact payloads and forward to Apps Script"
```

---

### Task 3: `POST /api/contact` + Vite middleware

**Files:**
- Create: `api/contact.ts`
- Create: `api/contact.test.ts`
- Modify: `vite-plugin-api-events.ts` (add POST `/api/contact` branch; keep GET `/api/events`)
- Test: `api/contact.test.ts`

**Interfaces:**
- Consumes: `validateContactPayload`, `submitContactToSheet`
- Produces: `POST /api/contact` → `200 { ok: true }` | `400/405/500/502 { error }`

- [ ] **Step 1: Write `api/contact.test.ts`**

```ts
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../lib/contact-submit', () => ({
  validateContactPayload: vi.fn(),
  submitContactToSheet: vi.fn(),
}));

import handler from './contact';
import { validateContactPayload, submitContactToSheet } from '../lib/contact-submit';

function mocks() {
  const res = {
    setHeader: vi.fn(),
    status: vi.fn(),
    json: vi.fn(),
  };
  res.status.mockReturnValue(res);
  return res;
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects non-POST', async () => {
    const res = mocks();
    await handler({ method: 'GET', body: {} } as never, res as never);
    expect(res.status).toHaveBeenCalledWith(405);
  });

  it('returns 400 on invalid payload', async () => {
    vi.mocked(validateContactPayload).mockReturnValue({ ok: false, error: 'Invalid form type' });
    const res = mocks();
    await handler({ method: 'POST', body: { type: 'nope' } } as never, res as never);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid form type' });
  });

  it('returns 200 on success', async () => {
    const data = {
      type: 'contact' as const,
      name: 'A',
      email: 'a@b.com',
      subject: 'S',
      message: 'M',
    };
    vi.mocked(validateContactPayload).mockReturnValue({ ok: true, data });
    vi.mocked(submitContactToSheet).mockResolvedValue({ ok: true, status: 200 });
    const res = mocks();
    await handler({ method: 'POST', body: data } as never, res as never);
    expect(submitContactToSheet).toHaveBeenCalledWith(data);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });
});
```

- [ ] **Step 2: Run — expect FAIL**, then implement `api/contact.ts`

```ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { submitContactToSheet, validateContactPayload } from '../lib/contact-submit';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const parsed = validateContactPayload(req.body);
  if (!parsed.ok) {
    return res.status(400).json({ error: parsed.error });
  }

  const result = await submitContactToSheet(parsed.data);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.status(200).json({ ok: true });
}
```

- [ ] **Step 3: Extend Vite middleware for POST `/api/contact`**

In `vite-plugin-api-events.ts`, after the events GET handler block (or before `next()`), add:

```ts
if (req.method === 'POST' && url.pathname === '/api/contact') {
  const chunks: Buffer[] = [];
  req.on('data', (c) => chunks.push(c));
  req.on('end', async () => {
    try {
      const raw = Buffer.concat(chunks).toString('utf8');
      const json = raw ? JSON.parse(raw) : {};
      const { validateContactPayload, submitContactToSheet } = await import('./lib/contact-submit');
      const parsed = validateContactPayload(json);
      if (!parsed.ok) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: parsed.error }));
        return;
      }
      const result = await submitContactToSheet(parsed.data);
      res.statusCode = result.ok ? 200 : result.status;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-store');
      res.end(JSON.stringify(result.ok ? { ok: true } : { error: result.error }));
    } catch (err) {
      console.error('api-contact-dev middleware failed', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Failed to save submission' }));
    }
  });
  return;
}
```

**Important:** Restructure the middleware so GET `/api/events` and POST `/api/contact` both short-circuit correctly, and unrelated requests call `next()`. Prefer reading the body with a small helper; do not call `next()` after handling contact.

Also update the early guard that currently bails when `req.method !== 'GET'` — change it so POST to `/api/contact` is allowed.

- [ ] **Step 4: Run all tests**

```bash
npm test
```

Expected: PASS (including new contact tests).

- [ ] **Step 5: Commit**

```bash
git add api/contact.ts api/contact.test.ts vite-plugin-api-events.ts
git commit -m "feat: add POST /api/contact for Google Sheets submissions"
```

---

### Task 4: Wire `pages/Contact.tsx`

**Files:**
- Create: `services/contactService.ts`
- Modify: `pages/Contact.tsx`

**Interfaces:**
- Consumes: `POST /api/contact`
- Produces: `submitContactForm(payload: ContactPayload): Promise<void>` throws Error with message on failure

- [ ] **Step 1: Create `services/contactService.ts`**

```ts
import type { ContactPayload } from '../lib/contact-submit';

export async function submitContactForm(payload: ContactPayload): Promise<void> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(typeof body.error === 'string' ? body.error : 'Failed to submit');
  }
}
```

Note: importing the type from `lib/contact-submit` into the client is fine (types erase). Do **not** import `submitContactToSheet` into client code.

- [ ] **Step 2: Refactor `pages/Contact.tsx`**

Replace uncontrolled forms with controlled state. Minimal approach:

1. Import `useState` (already), add `submitContactForm` and interest options constant.
2. Per-tab state objects OR one state bag keyed by tab — keep it readable:

```ts
const INTERESTS = ['Event Management', 'Social Media', 'Content Creation', 'Tree Plantation', 'Teaching'] as const;

// Volunteer state
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [volunteerEmail, setVolunteerEmail] = useState('');
const [interests, setInterests] = useState<string[]>([]);
const [whyJoin, setWhyJoin] = useState('');

// Partner state
const [organization, setOrganization] = useState('');
const [contactPerson, setContactPerson] = useState('');
const [role, setRole] = useState('');
const [partnershipType, setPartnershipType] = useState('Corporate CSR');
const [proposal, setProposal] = useState('');

// Contact state
const [name, setName] = useState('');
const [contactEmail, setContactEmail] = useState('');
const [subject, setSubject] = useState('');
const [message, setMessage] = useState('');

const [submitting, setSubmitting] = useState(false);
const [formError, setFormError] = useState<string | null>(null);
const [formSuccess, setFormSuccess] = useState<string | null>(null);
```

3. Wire each `<form onSubmit={...}>` with `preventDefault`, set submitting, call `submitContactForm`, on success clear that form’s fields + set success message, on error set `formError`.
4. Show success/error banners above the active form.
5. Disable submit buttons while `submitting`.
6. Keep existing classes / colors / structure.

Volunteer submit payload:

```ts
await submitContactForm({
  type: 'volunteer',
  firstName,
  lastName,
  email: volunteerEmail,
  interests,
  whyJoin,
});
```

Partner / contact similarly per types.

- [ ] **Step 3: Manual check** (requires user env)

```bash
npm run dev
# open #/contact, submit each tab once
```

Expected: success message; new rows on the matching Sheet tabs.

If env missing: UI shows `Server misconfigured` — acceptable.

- [ ] **Step 4: Commit**

```bash
git add services/contactService.ts pages/Contact.tsx
git commit -m "feat: wire Contact forms to /api/contact"
```

---

### Task 5: Verification

**Files:** none required

- [ ] **Step 1:** `npm test` — all pass
- [ ] **Step 2:** `npm run build` then `grep -R "GOOGLE_SHEETS\|script.google.com" dist || true` — no matches for secret/URL
- [ ] **Step 3:** If env configured, curl:

```bash
curl -s -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"type":"contact","name":"Test","email":"t@example.com","subject":"Hi","message":"Ping"}'
```

Expected: `{"ok":true}` and a row on the Contact tab.

- [ ] **Step 4:** Commit only if verification prompted fixes; never add `.env`

---

## Spec coverage checklist

| Spec item | Task |
|---|---|
| Apps Script artifact for owner | 1 |
| Env vars documented / server-only | 1, 3, 5 |
| Validate + forward with secret | 2 |
| `POST /api/contact` | 3 |
| Vite middleware | 3 |
| Wire Contact.tsx three forms | 4 |
| No client exposure of sheet URL/secret | 2–5 |

## Placeholder / consistency self-review

- Types aligned: `ContactPayload`, `validateContactPayload`, `submitContactToSheet`, `submitContactForm`
- No TBD left in steps
- Partner required fields match design (organization, contactPerson, partnershipType, proposal)
