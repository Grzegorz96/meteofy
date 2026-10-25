# Meteofy — agent guide

Responsive weather app (forecasts, maps, 3D globe, long-term charts, air quality). Live demo: https://meteofy-app.netlify.app · Repo: https://github.com/Grzegorz96/meteofy

## Stack

npm workspaces monorepo:

| Path              | Role                                                      |
| ----------------- | --------------------------------------------------------- |
| `apps/web`        | React 18 + Vite 5, **JavaScript/JSX** (not TS)            |
| `apps/api`        | Express 5 + TypeScript, OOP (`AppModule`, Winston logger) |
| `packages/shared` | `@meteofy/shared` — shared TS → `dist` JS + `.d.ts`       |

No Next.js, no Tailwind. Path alias `@/*` → `src/*` in both apps. License: AGPL-3.0 (whole monorepo).

## Commands (repo root)

```bash
npm install
npm run dev              # shared watch + api + web
npm run dev:web | dev:api | dev:shared
npm run build
npm run lint             # ESLint 9 flat; --max-warnings 0 (web + api + shared)
npm run lint:web | lint:api | lint:shared
npm run typecheck        # api + shared only
npm run format | format:check
```

Workspace-scoped: `npm run <script> -w web|api|@meteofy/shared`.

API Docker: `docker compose up` (port 3000, `apps/api/.env`). Web Vite proxies `/api` → `http://localhost:3000`.

## Env

| File                         | Purpose                                                |
| ---------------------------- | ------------------------------------------------------ |
| `apps/web/.env`              | Vite `VITE_*` keys (from `apps/web/.env.example`)      |
| `apps/api/.env`              | `PORT`, logging (from `apps/api/.env.example`)         |
| Root `.env` / `.env.example` | Optional Cursor MCP (e.g. Context7) — not used by Vite |

Never commit real `.env` files. Agent Read/Tab and shell access to secret `.env*` is blocked by hooks (allowlist: `.env.example` / `.sample` / `.template` / `.dist`).

## Docs for agents

- [docs/architecture.md](docs/architecture.md) — layers, data flow, directory map
- [docs/plans/](docs/plans/) — larger task plans
- [docs/README.md](docs/README.md) — docs index / versioned releases
- [README.md](README.md) — product overview, features, screenshots, setup

## Cursor layout

- Rules: `.cursor/rules/` — `project` + `keep-docs-updated` (always); `web-frontend`, `api-backend` (globs); `git-commits` (on request)
- Skills (see `skills-lock.json`): `caveman`, `domain-modeling`, `grill-me`, `grill-with-docs`, `grilling`
- Hooks (`.cursor/hooks.json`):
  - `afterFileEdit` → `format.sh`
  - `beforeShellExecution` → `block-git.sh` (matcher: `git` / `git.exe`); `block-env-read.sh` (matcher: `\.e` — blocks secret env refs/globs in shell)
  - `beforeReadFile` / `beforeTabFileRead` → `block-env-file-read.sh` (blocks secret env file reads; checks `attachments`)
- MCP: `.cursor/mcp.json`
- Ignore: `.cursorignore` (deps, dist, secrets, screenshot binaries)
- Format: root Prettier; `.cursor/skills/` is in `.prettierignore` (vendored / `skills-lock.json`)
