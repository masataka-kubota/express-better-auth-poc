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
cp .env.example .env
bun run dev
```

Set the backend URL in `.env`:

```dotenv
VITE_BACKEND_BASE_URL=http://localhost:3000
```

The dev server runs at `http://localhost:5173`.

## Auth flows

The app currently supports:

- sign up
- sign in
- password reset
- email verification

The backend must be running for these flows to work.

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

## GitHub Actions deployment

A workflow is available at [.github/workflows/web-cloudflare-workers-deploy.yml](../../.github/workflows/web-cloudflare-workers-deploy.yml) to deploy the app automatically from GitHub Actions.

The workflow expects these GitHub values to be configured:

- Repository secret: `CLOUDFLARE_API_TOKEN`
- Repository secret: `CLOUDFLARE_ACCOUNT_ID`
- Repository variable: `VITE_BACKEND_BASE_URL`

It runs on pushes to `main` when files under `apps/web/` or the workflow file change, and can also be triggered manually from the Actions tab.
