# Backend

## Local container verification

The container startup flow is:

1. `bun run dev` for local development execution
2. `bun run container:build` to build a Docker image for the backend
3. `bun run container:run` to start a Docker container from that image with runtime environment variables

These scripts are intended for different purposes:

- `bun run dev` runs the backend directly in the local development environment
- `bun run container:build` builds the Docker image used for container-based verification
- `bun run container:run` starts that Docker image as a container and passes the runtime environment values

For local verification, prepare the environment file first:

```bash
cp .env.example .env
```

Then start the local MySQL dependency if you need the app to reach the database:

```bash
docker compose up -d
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

If you want to verify the Cloud Run image path instead of the local container path, use:

```bash
CLOUD_RUN_IMAGE=backend:local bun run cloudrun:build
CLOUD_RUN_IMAGE=backend:local bun run cloudrun:push
```

The container run command will fail until the required environment variables are present in the shell or in `.env`.

### What the local dependency startup covers

The backend expects a reachable MySQL-compatible database at the address configured in `DATABASE_URL`. For local verification, `docker compose up -d` starts the database dependency required by the backend container.

If you want to verify the database is ready before starting the app container, you can check it with:

```bash
docker compose ps
```

You can also stop the local dependencies later with:

```bash
docker compose down
```
