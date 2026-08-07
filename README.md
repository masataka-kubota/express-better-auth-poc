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

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `FRONTEND_URLS`
- `SMTP_FROM`

The local development flow is Docker Compose-based. Start the backend stack and its dependencies:

```bash
cd apps/backend
bun install
docker compose up -d --build
```

The backend API will be available at `http://localhost:3000`, MySQL at `localhost:3307`, and Mailpit at `http://localhost:8025`.

Run the database migrations and seed a test user:

```bash
bun run db:migrate
bun run db:seed
```

The seed script creates a user with:

- Email: `test@example.com`
- Password: `secure_password_123`

To stop the stack later:

```bash
docker compose down
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

## Useful backend scripts

From `apps/backend`:

```bash
bun run build
bun run test
bun run db:generate
bun run db:migrate
bun run db:seed
bun run db:studio
```

This repository is intended as a working proof-of-concept and reference implementation rather than a production-ready application.
