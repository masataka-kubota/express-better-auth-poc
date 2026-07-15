# express-better-auth-poc

A proof-of-concept (PoC) and boilerplate repository for implementing and validating authentication using Express, Better Auth, and Drizzle ORM (MySQL).

## 🛠 Tech Stack

- **Runtime / Package Manager**: Bun
- **Backend Framework**: Express (TypeScript)
- **Authentication**: Better Auth
- **ORM**: Drizzle ORM
- **Database**: MySQL 8.4 (Docker Compose)

## 🚀 Features

- **Type-Safe Authentication**: Robust schema definitions achieved through seamless integration between Better Auth and Drizzle ORM.
- **Fast Developer Experience**: Blazing-fast package management and hot reloading powered by Bun.
- **Portability**: Replicate the local development environment with a single command using Docker Compose.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

## 🐳 Docker for MySQL

Start the MySQL container:

```bash
docker compose up -d
```

Stop the container:

```bash
docker compose down
```

Check container status:

```bash
docker compose ps
```

This project was created using `bun init` in bun v1.3.14. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
