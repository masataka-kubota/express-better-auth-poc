# Copilot instructions for this repository

- Prefer Bun for package management and scripts in this project.
- Use `bun install`, `bun run <script>`, `bun <file>`, and `bun test` instead of npm, pnpm, yarn, or Node-based equivalents.
- This repo is not a Bun workspaces monorepo. Apps live under `apps/backend` (Express) and `apps/web` (TanStack Start); install and run scripts from each app directory.
- Start the backend with `cd apps/backend && bun run dev`.
- Start the web app with `cd apps/web && bun run dev`.
- Keep Express + TypeScript for the API unless a task explicitly asks to switch to a Bun-native server.
- Keep TanStack Start for the web app unless a task explicitly asks to switch frameworks.
- Prefer the project's existing Vitest setup in `apps/web` over introducing Jest.
- When adding or updating scripts, keep them runnable through Bun and match the existing `apps/*/package.json` style.
