import type { IncomingMessage } from 'node:http';
import type { Plugin } from 'vite';
import { fetchPublicEvents } from './lib/fetch-public-events';

/**
 * Serves API endpoints during `vite`/`npm run dev` so the SPA does not
 * receive raw TypeScript modules. Production uses Vercel serverless handlers.
 */
export function apiEventsDevPlugin(): Plugin {
  return {
    name: 'api-events-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) {
          next();
          return;
        }

        const url = new URL(req.url, 'http://localhost');
        if (req.method === 'GET' && url.pathname === '/api/events') {
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
          return;
        }

        if (req.method === 'POST' && url.pathname === '/api/contact') {
          try {
            const raw = await readRequestBody(req);
            const json = raw ? JSON.parse(raw) : {};
            const { submitContactToSheet, validateContactPayload } = await import('./lib/contact-submit');
            const parsed = validateContactPayload(json);
            if (!parsed.ok) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: (parsed as { error: string }).error }));
              return;
            }

            const result = await submitContactToSheet(parsed.data);
            res.statusCode = result.ok ? 200 : result.status;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-store');
            res.end(
              JSON.stringify(
                result.ok
                  ? { ok: true }
                  : { error: (result as { error: string }).error }
              )
            );
          } catch (err) {
            console.error('api-contact-dev middleware failed', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to save submission' }));
          }
          return;
        }

        next();
      });
    },
  };
}

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}
