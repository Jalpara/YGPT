import type { Plugin } from 'vite';
import { fetchPublicEvents } from './lib/fetch-public-events';

/**
 * Serves GET /api/events during `vite`/`npm run dev` so the SPA does not
 * receive the raw TypeScript module for api/events.ts.
 * Production still uses Vercel serverless `api/events.ts`.
 */
export function apiEventsDevPlugin(): Plugin {
  return {
    name: 'api-events-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || req.method !== 'GET') {
          next();
          return;
        }

        const url = new URL(req.url, 'http://localhost');
        if (url.pathname !== '/api/events') {
          next();
          return;
        }

        try {
          const result = await fetchPublicEvents(url.searchParams.get('month'));
          const body = JSON.stringify(result.body);
          res.statusCode = result.status;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-store');
          res.end(body);
        } catch (err) {
          console.error('api-events-dev middleware failed', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Failed to fetch events' }));
        }
      });
    },
  };
}
