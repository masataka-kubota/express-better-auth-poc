# Copilot instructions for this repository

- Prefer Bun for package management and scripts in this project.
- Use `bun install`, `bun run <script>`, `bun <file>`, and `bun test` instead of npm, pnpm, yarn, or Node-based equivalents.
- For local development, start the app with `bun run dev`.
- This repository currently uses Express with TypeScript, so keep that setup unless a task explicitly asks to switch to a Bun-native server.
- Avoid introducing Vite, Jest, Vitest, or dotenv for new work in this repo.
- When adding or updating scripts, keep them runnable through Bun and match the existing package.json style.
