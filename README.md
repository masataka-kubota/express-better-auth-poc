# express-better-auth-poc

A proof-of-concept repository for evaluating an authentication stack built with Express, Better Auth, Drizzle ORM, and TanStack Start.

## What this POC demonstrates

- An Express backend with Better Auth email/password authentication
- Email verification and password reset flows
- A TanStack Start frontend that uses cookies and the Better Auth client
- MySQL-backed persistence via Docker Compose

## Tech stack

- Runtime / package manager: Bun
- Backend: Express + TypeScript in apps/backend
- Frontend: TanStack Start + React + Mantine in apps/web
- Authentication: Better Auth
- ORM: Drizzle ORM
- Database: MySQL 8.4

## Prerequisites

- Bun 1.3+
- Docker Desktop
- Optional: Mailpit for local email testing

## 1. Install dependencies

Install the root dependencies first:

```bash
bun install
```

## 2. Backend setup

From the backend app directory:

```bash
cd apps/backend
bun install
cp .env.example .env
```

Update the backend `.env` file with the required values:

- `NODE_ENV`
- `PORT`
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `FRONTEND_URLS`
- `SMTP_FROM`

For local development, run the backend directly with Bun:

```bash
cd apps/backend
bun run dev
```

The backend API will be available at `http://localhost:3000`.

If you need the database and mail services locally, start the supporting containers with Docker Compose:

```bash
cd apps/backend
docker compose up -d
```

This starts:

- MySQL at `localhost:3307`
- Mailpit at `http://localhost:8025`

Run the database migrations and seed a test user:

```bash
bun run db:migrate
bun run db:seed
```

The seed script creates a user with:

- Email: `test@example.com`
- Password: `secure_password_123`

To stop the support services later:

```bash
docker compose down
```

If you also want to verify the backend inside a Docker image, use the container scripts:

```bash
bun run container:build
bun run container:run
bun run container:stop
```

## 3. Frontend setup

From the web app directory:

```bash
cd apps/web
bun install
cp .env.example .env
```

The web app expects:

- `VITE_BACKEND_BASE_URL=http://localhost:3000`

Start the frontend:

```bash
bun run dev
```

Open `http://localhost:5173` and use the auth flows from the UI.

## 4. Auth flow notes

The current POC uses Better Auth email/password authentication with:

- sign up
- email verification
- sign in
- password reset

For local email testing, either use Mailpit or configure a real SMTP/Resend provider.

## 5. Web deployment to Cloudflare Workers

The web app can be deployed from GitHub Actions with the workflow at [.github/workflows/web-cloudflare-workers-deploy.yml](.github/workflows/web-cloudflare-workers-deploy.yml).

Configure these GitHub values before the first run:

- Repository secret: `CLOUDFLARE_API_TOKEN`
- Repository secret: `CLOUDFLARE_ACCOUNT_ID`
- Repository variable: `VITE_BACKEND_BASE_URL`

The workflow runs on pushes to `main` for changes under `apps/web/` and can also be triggered manually from the Actions tab.

## 6. Production-style deployment note

This POC currently works locally for the core authentication flows. For a production-style deployment, the frontend and backend should ideally be served from subdomains under the same parent domain, for example:

- `api.example.com` for the backend
- `admin.example.com` for the frontend

In that setup, Better Auth can share session cookies across both origins by enabling shared parent-domain cookies. In this repository, this configuration should be applied in the Better Auth setup defined in [apps/backend/src/lib/auth.ts](apps/backend/src/lib/auth.ts). A typical configuration looks like this:

```ts
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: "example.com",
    },
  },
});
```

This is a production-oriented recommendation rather than a requirement for the current local POC, but it is the expected pattern when the frontend and backend are deployed to different hosts.

## Useful backend scripts

From `apps/backend`:

```bash
bun run dev
bun run build
bun run test
bun run db:generate
bun run db:migrate
bun run db:seed
bun run db:studio
bun run container:build
bun run container:run
bun run container:stop
```

This repository is intended as a working proof-of-concept and reference implementation rather than a production-ready application.
