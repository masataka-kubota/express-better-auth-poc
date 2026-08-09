# syntax=docker/dockerfile:1

# Stage 1: Build — install dependencies and bundle the app
# NODE_ENV is baked into `isDev` by `bun build`, so it must be set for the build step.
# Default is production (Cloud Run). Local images pass --build-arg NODE_ENV=development.
FROM oven/bun:1 AS build
WORKDIR /app
ARG NODE_ENV=production
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY tsconfig.json ./
COPY src ./src
ENV NODE_ENV=$NODE_ENV
RUN bun run build

# Stage 2: Runtime — minimal image with only the bundled output
FROM oven/bun:1
WORKDIR /app
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
COPY --from=build /app/dist ./dist
CMD ["bun", "./dist/index.js"]
