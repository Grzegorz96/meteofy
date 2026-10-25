# Meteofy — agent guide

Responsive weather app (forecasts, maps, 3D globe, long-term charts, air quality). Live demo: https://meteofy-app.netlify.app · Repo: https://github.com/Grzegorz96/meteofy

## Stack

npm workspaces monorepo:

| Path              | Role                                                      |
| ----------------- | --------------------------------------------------------- |
| `apps/web`        | React 18 + Vite 5, **JavaScript/JSX** (not TS)            |
| `apps/api`        | Express 5 + TypeScript, OOP (`AppModule`, Winston logger) |
| `packages/shared` | `@meteofy/shared` — shared TS → `dist` JS + `.d.ts`       |

No Next.js, no Tailwind. Path alias `@/*` → `src/*` in both apps. License: AGPL-3.0.

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

API Docker: `docker compose up` (port 3000, `apps/api/.env`).

## Env

- Web (project root `.env`): `VITE_VISUAL_CROSSING_API_KEY`, `VITE_GEO_DB_API_KEY`, `VITE_OPEN_WEATHER_API_KEY`, `VITE_GEO_APIFY_API_KEY`
- API: `apps/api/.env` (see `apps/api/.env.example`)
- Never commit real `.env` files

## Docs for agents

- [docs/architecture.md](docs/architecture.md) — layers, data flow, directory map
- [docs/plans/](docs/plans/) — larger task plans
- [docs/README.md](docs/README.md) — versioned release docs / screenshots
- [README.md](README.md) — product overview, features, screenshots

## Cursor layout

- Rules: `.cursor/rules/` (scoped by glob)
- Skills: `.cursor/skills/example-skill/` — learning stub; install real skills from upstream yourself
- Hooks: `.cursor/hooks.json` → `afterFileEdit`: `format.sh`; `beforeShellExecution`: `block-git.sh` (blocks agent `git add` / `commit` / `push`), `block-env-read.sh` (blocks shell refs/globs to secret `.env*` / `.envrc`; allows `.env.example`/`.sample`/`.template`/`.dist`; matcher `\\.e` so normal commands skip the guard but `.e*` / `.en?` still hit it); `beforeReadFile` + `beforeTabFileRead`: `block-env-file-read.sh` (blocks Read/Tab of secret env files incl. multi-dot names and prompt `attachments`; same allowlist)
- MCP: `.cursor/mcp.json` (empty by default)
- Ignore: `.cursorignore`
