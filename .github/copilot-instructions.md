# Copilot instructions for this repository

- Prefer Bun for package management and scripts in this project.
- Use `bun install`, `bun run <script>`, `bun <file>`, and `bun test` instead of npm, pnpm, yarn, or Node-based equivalents.
- This repo is not a Bun workspaces monorepo. The Express app lives in `apps/backend`; install and run scripts from that directory.
- Start the backend with `cd apps/backend && bun run dev`.
- Keep Express + TypeScript for the API unless a task explicitly asks to switch to a Bun-native server.
- Avoid introducing Jest or Vitest for new work in this repo.
- When adding or updating scripts, keep them runnable through Bun and match the existing `apps/backend/package.json` style.
