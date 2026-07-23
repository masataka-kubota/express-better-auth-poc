# express-better-auth-poc

A proof-of-concept (PoC) and boilerplate repository for implementing and validating authentication using Express, Better Auth, and Drizzle ORM (MySQL).

## Tech Stack

- **Runtime / Package Manager**: Bun
- **Backend Framework**: Express (TypeScript) — `apps/backend`
- **Frontend**: TanStack Start (React + TanStack Router) — `apps/web`
- **UI**: Mantine — `apps/web`
- **Authentication**: Better Auth
- **ORM**: Drizzle ORM
- **Database**: MySQL 8.4 (Docker Compose)

## Layout

```txt
apps/
  backend/   # Express + Better Auth
  web/       # TanStack Start + Mantine
```

## Setup

### Backend

```bash
cd apps/backend
bun install
cp .env.example .env
# Fill in DATABASE_URL, BETTER_AUTH_SECRET, etc.
```

### Web

```bash
cd apps/web
bun install
```

## Run

### Backend

```bash
cd apps/backend
bun run dev
```

### Web

```bash
cd apps/web
bun run dev
```

Open `http://localhost:5173/login` (the backend remains on port `3000`).

Demo credentials (temporary auth, not Better Auth yet):

- Email: `admin@example.com`
- Password: `password`

## Docker for MySQL

From `apps/backend`:

```bash
docker compose up -d
docker compose down
docker compose ps
```

## Database scripts

From `apps/backend`:

```bash
bun run db:generate
bun run db:migrate
bun run db:seed
bun run db:studio
```

This project was created using `bun init` in bun v1.3.14. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
