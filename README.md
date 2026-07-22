<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1mQVNtJI362mNTeyy8PVGR-ooA2Hcvxbi

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
