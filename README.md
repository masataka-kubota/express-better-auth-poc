# express-better-auth-poc

A proof-of-concept (PoC) and boilerplate repository for implementing and validating authentication using Express, Better Auth, and Drizzle ORM (MySQL).

## 🛠 Tech Stack

- **Runtime / Package Manager**: Bun
- **Backend Framework**: Express (TypeScript) — `apps/backend`
- **Authentication**: Better Auth
- **ORM**: Drizzle ORM
- **Database**: MySQL 8.4 (Docker Compose)

## 🏛️ Monorepo layout

```txt
apps/
  backend/   # Express + Better Auth
```

## 🛠️ Setup

```bash
cd apps/backend
bun install
cp .env.example .env
# Fill in DATABASE_URL, BETTER_AUTH_SECRET, etc.
```

## ✅ Run

```bash
cd apps/backend
bun run dev
```

## 🐳 Docker for MySQL

From `apps/backend`:

```bash
docker compose up -d
docker compose down
docker compose ps
```

## 🗄️ Database scripts

From `apps/backend`:

```bash
bun run db:generate
bun run db:migrate
bun run db:seed
bun run db:studio
```

This project was created using `bun init` in bun v1.3.14. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
