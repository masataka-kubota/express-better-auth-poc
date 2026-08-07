# Backend

## Local verification

The local workflow is split into two parts:

1. `bun run dev` for local development execution
2. `bun run container:build` to build a Docker image for the backend
3. `bun run container:run` to start that backend image as a container for verification

These scripts are intended for different purposes:

- `bun run dev` runs the backend directly in the local development environment
- `bun run container:build` builds the Docker image used for container-based verification
- `bun run container:run` starts that backend image as a container and passes the runtime environment values
- `bun run container:stop` stops the verification container

For local verification, prepare the environment file first:

```bash
bun install
cp .env.example .env
```

If you run the backend directly on the host with `bun run dev`, keep the local MySQL host in `.env`:

```env
DATABASE_URL=mysql://app_user:app_password@127.0.0.1:3307/my_app_db
```

If you run the backend inside a Docker container with `bun run container:run`, switch to the Docker host alias instead:

```env
DATABASE_URL=mysql://app_user:app_password@host.docker.internal:3307/my_app_db
```

This is needed on macOS/Windows Docker Desktop because a container cannot reach the host's `127.0.0.1` directly.

When running the backend with `bun run container:run`, note that the app is executed inside a container. If you want it to reach the host MySQL instance, switch `DATABASE_URL` to the container-friendly host value (for example, `DATABASE_URL=mysql://app_user:app_password@host.docker.internal:3307/my_app_db`). Email delivery is currently intended for local development with Mailpit, so container execution may not send mail correctly; in that case, update the SMTP host in `src/lib/mail.ts` to `mailpit`.

Then start the supporting services (MySQL and Mailpit) if you need the app to reach the database or test email delivery:

```bash
docker compose up -d
bun run db:migrate
bun run db:seed
```

You can also inspect the running containers with:

```bash
docker compose ps
```

Finally run:

```bash
bun run container:build
bun run container:run
```

The `container:run` script reads `.env` automatically, so you do not need to copy each variable manually into the shell.

- Email: `test@example.com`
- Password: `secure_password_123`

### 4. Rebuild the supporting services after code changes

```bash
docker compose up -d --force-recreate
```

### 5. Stop the supporting services

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
docker compose logs -f mysql
docker compose logs -f mailpit
```
