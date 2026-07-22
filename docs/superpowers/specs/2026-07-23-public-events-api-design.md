# Public Events API Design

**Date:** 2026-07-23  
**Repo:** ygpt (Vite + React SPA)  
**Status:** Awaiting user review  
**Reference:** ygptecf Supabase `events` schema and public API patterns (`/api/quotes`)

## Problem

The public site page `#/events` (`pages/Events.tsx`) currently renders mock data from `EVENTS_DATA`. Real events live in the shared Supabase project used by ygptecf. Anon RLS does not allow public `SELECT` on `events`, so the browser cannot query safely with the anon key alone.

## Goals

1. Add a **server-side** API in **ygpt** that reads public events from Supabase using the service role.
2. Return **both** month-scoped events and upcoming events in one response.
3. Wire `#/events` to that API (loading + error states), keeping client-only overlays (e.g. Weekly Global Prayer) as they are today.

## Non-goals

- Auth, admin CRUD, approvals, budgets, Drive, Telegram
- Exposing drafts, in-review, rejected, or archived events
- Querying `calendar_events` (internal org calendar)
- Migrating ygpt to Next.js or changing HashRouter

## Decisions (locked)

| Decision | Choice |
|---|---|
| API host | **ygpt** (Option B) — Vercel serverless |
| Response shape | Single payload: `monthEvents` + `upcomingEvents` |
| Public statuses | `funded`, `completed`, `report_submitted` only |
| Frontend | Wire `#/events` to the new API |

## Architecture

```
Browser (#/events)
  → GET /api/events?month=YYYY-MM
  → Vercel Serverless (api/events.ts)
  → Supabase service role → public.events
  → JSON { month, monthEvents, upcomingEvents }
```

- Service role stays on the server only (`SUPABASE_SERVICE_ROLE_KEY` never in client bundles).
- Local development uses `vercel dev` (or equivalent) so `/api/*` is available alongside the Vite app. Document this in README.
- Production: deploy ygpt to Vercel with the same Supabase env vars already listed in `.env.example`.

## Endpoint

### `GET /api/events`

**Query**

| Param | Required | Description |
|---|---|---|
| `month` | No | `YYYY-MM`. Defaults to current UTC month if omitted or invalid. |

**Response `200`**

```json
{
  "month": "2026-07",
  "monthEvents": [ /* Event[] overlapping that month */ ],
  "upcomingEvents": [ /* Event[] with date >= today UTC, asc, limit 20 */ ]
}
```

**Mapped `Event` shape** (matches `types.ts`, public-safe):

| Field | Source |
|---|---|
| `id` | `events.id` |
| `title` | `events.title` |
| `date` | `events.event_date` (`YYYY-MM-DD`) |
| `time` | Format `start_time`–`end_time` when present; else empty string or a single time |
| `location` | `events.location` (fallback empty) |
| `type` | Infer `Online` if location/link looks online (e.g. contains “zoom”, “meet”, “online”, or `venue_gmaps_link` empty + online keywords); else `Offline` |
| `description` | `events.description` (fallback `goal` if description null) |

**Selected Supabase columns (only):**  
`id, title, description, goal, event_date, event_end_date, start_time, end_time, location, venue_gmaps_link, region, event_pillar, status`

**Filters**

- Always: `.in('status', ['funded', 'completed', 'report_submitted'])`
- Month set: events where `event_date` is within `[monthStart, monthEnd]` **or** (if `event_end_date` set) the range overlaps the month
- Upcoming: `event_date >= today` (UTC date), order `event_date` asc, `.limit(20)`

Implementation may use one or two Supabase queries; prefer clarity over micro-optimization.

**Errors**

| Case | Response |
|---|---|
| Missing Supabase env | `500` `{ "error": "Server misconfigured" }` |
| Supabase query failure | `500` `{ "error": "Failed to fetch events" }` |

No auth required (public read).

## Frontend changes

- Add `services/eventsService.ts`: `fetchEventsForMonth(month: string)` → typed response.
- Update `pages/Events.tsx` to load on mount and when month navigation changes; show loading/error; use `monthEvents` for calendar/list/grid filters that are month-scoped; use `upcomingEvents` where “upcoming” sort/list is appropriate (or merge as needed for existing UI without redesign).
- Stop using `EVENTS_DATA` as the primary source on this page (may leave constant for fallback only if useful during offline demos — prefer no silent mock fallback in production path).
- Do **not** put `SUPABASE_SERVICE_ROLE_KEY` in Vite `define` / client code.

## Env

Reuse existing names (already in `.env.example`):

- `NEXT_PUBLIC_SUPABASE_URL` (or `SUPABASE_URL` if preferred server-side; support reading URL from either)
- `SUPABASE_SERVICE_ROLE_KEY`

Optional client-only:

- None required if relative `/api/events` works under same origin via Vercel.

## Dependencies

- `@supabase/supabase-js` (server usage in `api/`)
- Vercel serverless Node runtime for `api/events.ts` (default Vercel Node)

## Testing

- Manual: `vercel dev`, open `#/events`, confirm month nav refetches and upcoming list populates from live DB.
- Curl: `GET /api/events?month=2026-07` returns JSON with both arrays and only public statuses.
- Confirm no service role leakage in client bundle / network tab (only `/api/events` calls).

## Risks

| Risk | Mitigation |
|---|---|
| Vite-only `npm run dev` has no `/api` | Document `vercel dev`; optional short note in README |
| Over-exposing columns | Strict select list; no budgets/PII/Drive |
| Online/Offline inference wrong | Conservative heuristic; default `Offline` |

## Open follow-ups (out of this change)

- Public RLS view as alternative to service role
- Including `calendar_events` for org-wide public holidays
- Caching / `Cache-Control` headers
