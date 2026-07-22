<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1mQVNtJI362mNTeyy8PVGR-ooA2Hcvxbi

## Run Locally

**Prerequisites:** Node.js. Optional: [Vercel CLI](https://vercel.com/docs/cli) to mirror production serverless locally.

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and fill in:
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL` (or `SUPABASE_URL`)
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Run the app (UI + `/api/events` via Vite middleware): `npm run dev`
4. Open `http://localhost:3000/#/events`
5. Optional production-parity API: `npm run dev:full` (requires `vercel login`)
6. Unit tests: `npm test`
