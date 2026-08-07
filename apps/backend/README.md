# Backend

## Development with Docker Compose

The primary development flow for this backend is Docker Compose.

The compose setup starts:

- the backend container
- MySQL
- Mailpit

### 1. Prepare the environment

```bash
cp .env.example .env
```

The compose file loads `.env` automatically, so you do not need to copy each variable manually into the shell.

### 2. Start the stack

```bash
docker compose up -d --build
```

You can inspect the running services with:

```bash
docker compose ps
```

The backend will be available at `http://localhost:3000`.

### 3. Run database migrations and seed data

```bash
bun run db:migrate
bun run db:seed
```

The seed script creates a test user with:

- Email: `test@example.com`
- Password: `secure_password_123`

### 4. Rebuild after code changes

```bash
docker compose up -d --build backend
```

### 5. Stop the stack

```bash
docker compose down
```

### Useful commands

```bash
bun run build
bun run test
bun run db:generate
bun run db:studio
```

If you need to inspect container logs, use:

```bash
docker compose logs -f backend
```
