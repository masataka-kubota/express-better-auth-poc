# syntax=docker/dockerfile:1

# Stage 1: Build — install dependencies and bundle the app
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY tsconfig.json ./
COPY src ./src
RUN bun run build

# Stage 2: Runtime — minimal image with only the bundled output
FROM oven/bun:1
WORKDIR /app
COPY --from=build /app/dist ./dist
CMD ["bun", "./dist/index.js"]
