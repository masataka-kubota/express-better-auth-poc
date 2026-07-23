# Web app

This is the TanStack Start frontend for the Better Auth PoC. It provides the authenticated UI for the Express backend.

## Stack

- TanStack Start + React
- TanStack Router
- Mantine UI
- Vite
- Cloudflare Workers deployment

## Development

From the app directory:

```bash
cd apps/web
bun install
bun run dev
```

The dev server runs at `http://localhost:5173`.

## Common scripts

```bash
bun run build
bun run test
bun run type-check
bun run lint
bun run format
```

## Deployment

This app can be deployed to Cloudflare Workers with Wrangler:

```bash
bunx wrangler login
bunx wrangler deploy
```

Use `bunx wrangler secret put MY_VAR` for secrets. Public values should be placed in `wrangler.jsonc`.
