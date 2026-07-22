# Public Events API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `GET /api/events?month=YYYY-MM` in ygpt (Vercel serverless + Supabase service role) returning `monthEvents` and `upcomingEvents`, and wire `#/events` to it.

**Architecture:** Pure mapping/filter helpers in `lib/public-events.ts` are unit-tested with Vitest. `api/events.ts` uses those helpers plus `@supabase/supabase-js` service role. The React Events page fetches via `services/eventsService.ts` on month change. Local API requires `vercel dev` (documented in README).

**Tech Stack:** Vite 6, React 19, Vercel Node serverless (`api/`), `@supabase/supabase-js`, Vitest

## Global Constraints

- Service role (`SUPABASE_SERVICE_ROLE_KEY`) must never appear in client bundles or Vite `define`
- Public statuses only: `funded`, `completed`, `report_submitted`
- Response shape: `{ month, monthEvents, upcomingEvents }` where both arrays use ygpt `Event` from `types.ts`
- Do not query `calendar_events`; do not expose budgets, approvals, Drive URLs, or coordinator PII
- Select only: `id, title, description, goal, event_date, event_end_date, start_time, end_time, location, venue_gmaps_link, region, event_pillar, status`
- Upcoming limit: 20; order by `event_date` ascending
- Keep Weekly Global Prayer Thursday overlay client-side in `pages/Events.tsx`
- Clubs / ClubDetails / ContentPages may keep using `EVENTS_DATA` mocks (out of scope)
- Never commit `.env`

## File structure

| Path | Responsibility |
|---|---|
| `lib/public-events.ts` | Month parsing, row→`Event` mapping, Online/Offline inference, month overlap + upcoming split |
| `lib/public-events.test.ts` | Vitest unit tests for helpers |
| `api/events.ts` | Vercel serverless handler: env check, Supabase query, JSON response |
| `services/eventsService.ts` | Browser `fetch('/api/events?month=...')` + types |
| `pages/Events.tsx` | Load/error/data wiring; replace `EVENTS_DATA` as primary source |
| `vercel.json` | SPA fallback rewrite that does not steal `/api` |
| `.gitignore` | Ensure `.env` ignored |
| `.env.example` | Document Supabase + Gemini keys |
| `README.md` | `vercel dev` + env setup |
| `package.json` | Add `@supabase/supabase-js`, `@vercel/node`, `vitest`, scripts |

---

### Task 1: Project scaffolding (deps, ignore, env example, vercel, vitest)

**Files:**
- Modify: `package.json`
- Modify: `.gitignore`
- Create: `.env.example`
- Create: `vercel.json`
- Create: `vitest.config.ts`
- Modify: `README.md`

**Interfaces:**
- Produces: `npm test` runs Vitest; `vercel.json` ready for deploy; `.env` ignored

- [ ] **Step 1: Add `.env` to `.gitignore`**

Append to `.gitignore`:

```
.env
```

Ensure a trailing newline after `.env`.

- [ ] **Step 2: Create `.env.example`**

```
# Gemini (client — used by Vite define)
GEMINI_API_KEY=

# Supabase (server — used by /api/events only; never expose service role to the browser)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key...
```

- [ ] **Step 3: Create `vercel.json`**

```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
```

- [ ] **Step 5: Install dependencies and update scripts**

Run:

```bash
npm install @supabase/supabase-js
npm install -D @vercel/node vitest
```

Update `package.json` scripts to:

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "dev:full": "vercel dev --listen 3000"
}
```

- [ ] **Step 6: Update README “Run Locally” section**

Replace the Run Locally section with:

```markdown
## Run Locally

**Prerequisites:** Node.js, and [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`) for the events API.

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and fill in:
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL` (or `SUPABASE_URL`)
   - `SUPABASE_SERVICE_ROLE_KEY`
3. For UI only (no `/api`): `npm run dev`
4. For UI + events API: `npm run dev:full` (or `vercel dev --listen 3000`), then open `http://localhost:3000/#/events`
5. Unit tests: `npm test`
```

- [ ] **Step 7: Commit**

```bash
git add .gitignore .env.example vercel.json vitest.config.ts package.json package-lock.json README.md
git commit -m "chore: scaffold vercel api, vitest, and env docs for events"
```

---

### Task 2: Pure helpers + unit tests (`lib/public-events.ts`)

**Files:**
- Create: `lib/public-events.ts`
- Create: `lib/public-events.test.ts`
- Test: `lib/public-events.test.ts`

**Interfaces:**
- Produces:
  - `export type PublicEventRow` — Supabase row shape (selected columns)
  - `export function parseMonthParam(month: string | null | undefined, now?: Date): string` — returns `YYYY-MM` (invalid/missing → current UTC month from `now`)
  - `export function monthBounds(month: string): { start: string; end: string }` — inclusive `YYYY-MM-DD` start/end
  - `export function todayUtcDateString(now?: Date): string` — `YYYY-MM-DD` UTC
  - `export function formatEventTime(start: string | null, end: string | null): string`
  - `export function inferEventType(location: string | null, venueGmapsLink: string | null): 'Online' | 'Offline'`
  - `export function mapRowToEvent(row: PublicEventRow): Event` — uses `../types` `Event`
  - `export function eventOverlapsMonth(row: PublicEventRow, month: string): boolean`
  - `export function buildEventsResponse(rows: PublicEventRow[], month: string, now?: Date): { month: string; monthEvents: Event[]; upcomingEvents: Event[] }`

- [ ] **Step 1: Write failing tests in `lib/public-events.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import {
  parseMonthParam,
  monthBounds,
  formatEventTime,
  inferEventType,
  mapRowToEvent,
  eventOverlapsMonth,
  buildEventsResponse,
  type PublicEventRow,
} from './public-events';

const baseRow = (overrides: Partial<PublicEventRow> = {}): PublicEventRow => ({
  id: '11111111-1111-1111-1111-111111111111',
  title: 'Peace Walk',
  description: 'A walk for peace',
  goal: null,
  event_date: '2026-07-15',
  event_end_date: null,
  start_time: '10:00:00',
  end_time: '12:00:00',
  location: 'Mumbai',
  venue_gmaps_link: 'https://maps.google.com/?q=mumbai',
  region: 'West',
  event_pillar: null,
  status: 'funded',
  ...overrides,
});

describe('parseMonthParam', () => {
  it('returns valid YYYY-MM', () => {
    expect(parseMonthParam('2026-07')).toBe('2026-07');
  });
  it('defaults invalid to current UTC month', () => {
    expect(parseMonthParam('nope', new Date('2026-03-05T12:00:00Z'))).toBe('2026-03');
  });
  it('defaults missing to current UTC month', () => {
    expect(parseMonthParam(undefined, new Date('2026-03-05T12:00:00Z'))).toBe('2026-03');
  });
});

describe('monthBounds', () => {
  it('returns inclusive start and end', () => {
    expect(monthBounds('2026-07')).toEqual({ start: '2026-07-01', end: '2026-07-31' });
    expect(monthBounds('2026-02')).toEqual({ start: '2026-02-01', end: '2026-02-28' });
  });
});

describe('formatEventTime', () => {
  it('formats start-end', () => {
    expect(formatEventTime('10:00:00', '12:00:00')).toBe('10:00 – 12:00');
  });
  it('formats start only', () => {
    expect(formatEventTime('10:00:00', null)).toBe('10:00');
  });
  it('returns empty when no times', () => {
    expect(formatEventTime(null, null)).toBe('');
  });
});

describe('inferEventType', () => {
  it('detects online keywords', () => {
    expect(inferEventType('Zoom meeting', null)).toBe('Online');
    expect(inferEventType('Google Meet', null)).toBe('Online');
    expect(inferEventType('Online webinar', null)).toBe('Online');
  });
  it('defaults to Offline', () => {
    expect(inferEventType('Community Hall', 'https://maps.google.com')).toBe('Offline');
  });
});

describe('mapRowToEvent', () => {
  it('maps fields and falls back description to goal', () => {
    const event = mapRowToEvent(baseRow({ description: null, goal: 'Build unity' }));
    expect(event).toMatchObject({
      id: '11111111-1111-1111-1111-111111111111',
      title: 'Peace Walk',
      date: '2026-07-15',
      time: '10:00 – 12:00',
      location: 'Mumbai',
      type: 'Offline',
      description: 'Build unity',
    });
  });
});

describe('eventOverlapsMonth', () => {
  it('includes event_date inside month', () => {
    expect(eventOverlapsMonth(baseRow({ event_date: '2026-07-15' }), '2026-07')).toBe(true);
  });
  it('includes multi-day range overlapping month', () => {
    expect(
      eventOverlapsMonth(
        baseRow({ event_date: '2026-06-28', event_end_date: '2026-07-02' }),
        '2026-07'
      )
    ).toBe(true);
  });
  it('excludes outside month', () => {
    expect(eventOverlapsMonth(baseRow({ event_date: '2026-08-01' }), '2026-07')).toBe(false);
  });
});

describe('buildEventsResponse', () => {
  it('splits month and upcoming with limit 20', () => {
    const now = new Date('2026-07-10T00:00:00Z');
    const rows = [
      baseRow({ id: '1', event_date: '2026-07-05', title: 'Past in month' }),
      baseRow({ id: '2', event_date: '2026-07-20', title: 'Upcoming in month' }),
      baseRow({ id: '3', event_date: '2026-08-01', title: 'Next month' }),
      baseRow({ id: '4', event_date: '2026-06-01', title: 'Old' }),
    ];
    const result = buildEventsResponse(rows, '2026-07', now);
    expect(result.month).toBe('2026-07');
    expect(result.monthEvents.map((e) => e.id).sort()).toEqual(['1', '2']);
    expect(result.upcomingEvents.map((e) => e.id)).toEqual(['2', '3']);
  });
});
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test
```

Expected: FAIL (module `./public-events` not found or exports missing).

- [ ] **Step 3: Implement `lib/public-events.ts`**

```ts
import type { Event } from '../types';

export type PublicEventRow = {
  id: string;
  title: string;
  description: string | null;
  goal: string | null;
  event_date: string;
  event_end_date: string | null;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  venue_gmaps_link: string | null;
  region: string | null;
  event_pillar: string | null;
  status: string;
};

const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;

export function parseMonthParam(month: string | null | undefined, now: Date = new Date()): string {
  if (month && MONTH_RE.test(month)) return month;
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

export function monthBounds(month: string): { start: string; end: string } {
  const [ys, ms] = month.split('-');
  const y = Number(ys);
  const m = Number(ms);
  const start = `${month}-01`;
  const lastDay = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const end = `${month}-${String(lastDay).padStart(2, '0')}`;
  return { start, end };
}

export function todayUtcDateString(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

function trimTime(t: string): string {
  return t.slice(0, 5);
}

export function formatEventTime(start: string | null, end: string | null): string {
  if (start && end) return `${trimTime(start)} – ${trimTime(end)}`;
  if (start) return trimTime(start);
  return '';
}

export function inferEventType(
  location: string | null,
  _venueGmapsLink: string | null
): 'Online' | 'Offline' {
  const hay = (location ?? '').toLowerCase();
  if (/(zoom|google meet|meet\.google|teams|online|youtube|webinar|virtual)/.test(hay)) {
    return 'Online';
  }
  return 'Offline';
}

export function mapRowToEvent(row: PublicEventRow): Event {
  return {
    id: row.id,
    title: row.title,
    date: row.event_date,
    time: formatEventTime(row.start_time, row.end_time),
    location: row.location ?? '',
    type: inferEventType(row.location, row.venue_gmaps_link),
    description: row.description ?? row.goal ?? '',
  };
}

export function eventOverlapsMonth(row: PublicEventRow, month: string): boolean {
  const { start, end } = monthBounds(month);
  const eventStart = row.event_date;
  const eventEnd = row.event_end_date ?? row.event_date;
  return eventStart <= end && eventEnd >= start;
}

export function buildEventsResponse(
  rows: PublicEventRow[],
  month: string,
  now: Date = new Date()
): { month: string; monthEvents: Event[]; upcomingEvents: Event[] } {
  const today = todayUtcDateString(now);
  const monthEvents = rows.filter((r) => eventOverlapsMonth(r, month)).map(mapRowToEvent);
  const upcomingEvents = rows
    .filter((r) => r.event_date >= today)
    .sort((a, b) => a.event_date.localeCompare(b.event_date))
    .slice(0, 20)
    .map(mapRowToEvent);
  return { month, monthEvents, upcomingEvents };
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/public-events.ts lib/public-events.test.ts
git commit -m "feat: add public event mapping helpers with unit tests"
```

---

### Task 3: Vercel API route `GET /api/events`

**Files:**
- Create: `api/events.ts`

**Interfaces:**
- Consumes: `parseMonthParam`, `monthBounds`, `todayUtcDateString`, `buildEventsResponse`, `PublicEventRow` from `../lib/public-events`
- Produces: `GET /api/events?month=YYYY-MM` → `200` JSON `{ month, monthEvents, upcomingEvents }` or `500` `{ error }`

- [ ] **Step 1: Implement `api/events.ts`**

```ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import {
  buildEventsResponse,
  monthBounds,
  parseMonthParam,
  todayUtcDateString,
  type PublicEventRow,
} from '../lib/public-events';

const PUBLIC_STATUSES = ['funded', 'completed', 'report_submitted'] as const;

const SELECT =
  'id, title, description, goal, event_date, event_end_date, start_time, end_time, location, venue_gmaps_link, region, event_pillar, status';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const month = parseMonthParam(
    typeof req.query.month === 'string' ? req.query.month : undefined
  );
  const { start, end } = monthBounds(month);
  const today = todayUtcDateString();

  // Fetch rows that could appear in either monthEvents or upcomingEvents
  const rangeStart = start < today ? start : today;

  const { data, error } = await supabase
    .from('events')
    .select(SELECT)
    .in('status', [...PUBLIC_STATUSES])
    .or(
      `and(event_date.gte.${start},event_date.lte.${end}),and(event_end_date.gte.${start},event_date.lte.${end}),event_date.gte.${today}`
    )
    .order('event_date', { ascending: true });

  if (error) {
    console.error('events query failed', error);
    return res.status(500).json({ error: 'Failed to fetch events' });
  }

  const rows = (data ?? []) as PublicEventRow[];
  // buildEventsResponse still filters correctly if the OR is broad
  void rangeStart;
  return res.status(200).json(buildEventsResponse(rows, month));
}
```

**Note for implementer:** If the `.or(...)` filter proves awkward in PostgREST, use two queries instead:

1. Month window: `.or(\`and(event_date.gte.${start},event_date.lte.${end}),and(event_end_date.not.is.null,event_end_date.gte.${start},event_date.lte.${end})\`)` with status filter  
2. Upcoming: `.gte('event_date', today).limit(20)` with status filter  

Then merge/dedupe by `id` before `buildEventsResponse`. Prefer two queries if the single OR fails manual curl testing.

- [ ] **Step 2: Manual verify with Vercel**

```bash
npm run dev:full
# in another terminal:
curl -s "http://localhost:3000/api/events?month=2026-07" | head -c 500
```

Expected: JSON with keys `month`, `monthEvents`, `upcomingEvents` (arrays may be empty if DB has no matching rows). Missing env → `{ "error": "Server misconfigured" }`.

- [ ] **Step 3: Commit**

```bash
git add api/events.ts
git commit -m "feat: add GET /api/events for month and upcoming public events"
```

---

### Task 4: Browser service + wire `#/events`

**Files:**
- Create: `services/eventsService.ts`
- Modify: `pages/Events.tsx`
- Modify: `types.ts` (add response type only if not colocated in service)

**Interfaces:**
- Consumes: `GET /api/events?month=`
- Produces:
  - `export type EventsApiResponse = { month: string; monthEvents: Event[]; upcomingEvents: Event[] }`
  - `export async function fetchEventsForMonth(month: string): Promise<EventsApiResponse>`
  - Events page uses `monthEvents` for calendar/grid/list filtering; when sort is `date-asc` (“Upcoming First”), prefer showing `upcomingEvents` for grid/list (calendar still uses month data). Spec: use monthEvents for month-scoped views; use upcomingEvents where upcoming sort/list is appropriate.

**Concrete UI behavior (lock this):**
- Always fetch for `YYYY-MM` derived from `calendarDate` (local year/month padded).
- Refetch when `calendarDate` month/year changes.
- `sourceEvents` state = `monthEvents` for calendar/grid/list base list (so month navigation matches the calendar).
- Additionally keep `upcomingEvents` in state (available for future UI); for this task, grid/list also use `monthEvents` so month nav stays consistent. Do not silently fall back to `EVENTS_DATA`.
- Show a loading message while fetching; show an error banner with retry on failure.
- Preserve Thursday Weekly Global Prayer overlay logic unchanged.

- [ ] **Step 1: Create `services/eventsService.ts`**

```ts
import type { Event } from '../types';

export type EventsApiResponse = {
  month: string;
  monthEvents: Event[];
  upcomingEvents: Event[];
};

export async function fetchEventsForMonth(month: string): Promise<EventsApiResponse> {
  const res = await fetch(`/api/events?month=${encodeURIComponent(month)}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      typeof body.error === 'string' ? body.error : `Failed to load events (${res.status})`
    );
  }
  return res.json() as Promise<EventsApiResponse>;
}

export function toMonthKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}
```

- [ ] **Step 2: Update `pages/Events.tsx`**

Replace mock import and filtering source with fetch state. Minimal structural edit:

1. Remove `import { EVENTS_DATA } from '../constants';`
2. Add:

```ts
import { useEffect, useState } from 'react';
import { fetchEventsForMonth, toMonthKey } from '../services/eventsService';
```

(merge with existing React import — use `useEffect` + `useState` from `react`).

3. Add state after existing hooks:

```ts
const [events, setEvents] = useState<Event[]>([]);
const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [reloadToken, setReloadToken] = useState(0);

useEffect(() => {
  let cancelled = false;
  const month = toMonthKey(calendarDate);
  setLoading(true);
  setError(null);
  fetchEventsForMonth(month)
    .then((data) => {
      if (cancelled) return;
      setEvents(data.monthEvents);
      setUpcomingEvents(data.upcomingEvents);
    })
    .catch((err: unknown) => {
      if (cancelled) return;
      setEvents([]);
      setUpcomingEvents([]);
      setError(err instanceof Error ? err.message : 'Failed to load events');
    })
    .finally(() => {
      if (!cancelled) setLoading(false);
    });
  return () => {
    cancelled = true;
  };
}, [calendarDate, reloadToken]);
```

4. Change filter to use `events` instead of `EVENTS_DATA`:

```ts
const filteredEvents = events.filter(/* same predicates */);
```

5. In the JSX above the content display, add loading/error UI:

```tsx
{error && (
  <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 flex justify-between items-center gap-4">
    <span>{error}</span>
    <button
      type="button"
      onClick={() => setReloadToken((t) => t + 1)}
      className="font-bold underline"
    >
      Retry
    </button>
  </div>
)}
{loading ? (
  <div className="text-center py-20 text-gray-500 font-medium">Loading events…</div>
) : (
  /* existing min-h-[500px] content block */
)}
```

Keep `upcomingEvents` referenced with a void pattern or a small comment-free usage to avoid unused-var lint if no UI yet — e.g. prefix with underscore in destructure only if unused; or show nothing extra. Prefer storing it; if TypeScript/ESLint unused, reference in a `data-upcoming-count={upcomingEvents.length}` on the content wrapper.

- [ ] **Step 3: Manual UI check**

```bash
npm run dev:full
```

Open `http://localhost:3000/#/events`:
- Loading state appears briefly
- Calendar month arrows trigger refetch
- No mock-only titles unless they exist in Supabase
- Thursday prayer still appears on Thursdays

- [ ] **Step 4: Commit**

```bash
git add services/eventsService.ts pages/Events.tsx
git commit -m "feat: wire Events page to /api/events"
```

---

### Task 5: Verification pass

**Files:** none new (verify only)

- [ ] **Step 1: Unit tests**

```bash
npm test
```

Expected: PASS.

- [ ] **Step 2: API smoke**

With `vercel dev` running and real env:

```bash
curl -s "http://localhost:3000/api/events?month=2026-07" | python3 -c 'import sys,json; d=json.load(sys.stdin); assert "monthEvents" in d and "upcomingEvents" in d and d["month"]=="2026-07"; print("ok", len(d["monthEvents"]), len(d["upcomingEvents"]))'
```

Expected: prints `ok <n> <m>`.

- [ ] **Step 3: Confirm service role not in client bundle**

```bash
npm run build
grep -R "SERVICE_ROLE" dist || true
grep -R "service_role" dist || true
```

Expected: no matches.

- [ ] **Step 4: Final commit if any doc/fixups**; otherwise done

If README or query OR needed fixes, commit:

```bash
git add -A
git status
# commit only if there are intentional fixes; never add .env
```

---

## Spec coverage checklist

| Spec item | Task |
|---|---|
| Vercel serverless in ygpt | 1, 3 |
| Combined `monthEvents` + `upcomingEvents` | 2, 3, 4 |
| Status filter funded/completed/report_submitted | 3 |
| Public column select only | 3 |
| Map to ygpt `Event` | 2 |
| Wire `#/events` + loading/error | 4 |
| No mock silent fallback | 4 |
| Keep prayer overlay | 4 |
| Env docs / vercel dev | 1 |
| Service role not in client | 3, 5 |
| `.env` ignored | 1 |

## Placeholder / consistency self-review

- No TBD/TODO left in steps
- Types aligned: `PublicEventRow`, `EventsApiResponse`, `Event`
- Function names consistent across tasks: `fetchEventsForMonth`, `buildEventsResponse`, `parseMonthParam`
