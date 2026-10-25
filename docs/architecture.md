# Architecture

Meteofy is an npm-workspaces monorepo. The **web** app currently talks to **external weather/geocoding APIs** from the browser. The **api** app is a growing Express backend (health check + security middleware today). Shared code lives in `@meteofy/shared`.

## Layers

```text
┌─────────────────────────────────────────────────────────────┐
│  apps/web (React 18 + Vite)                                 │
│  pages → components → hooks / Redux → services/api (axios)  │
└─────────────┬───────────────────────────────┬───────────────┘
              │ VITE_* keys (apps/web/.env)   │ proxy /api → :3000
              ▼                               ▼
   External providers              apps/api (Express + TS)
   Visual Crossing, Open-Meteo,    middleware → routes → logger
   OpenWeatherMap, Geoapify,       packages/shared (types/helpers)
   GeoDB Cities (RapidAPI)
```

| Layer             | Responsibility                                                                                     |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| **pages**         | Route screens (`Home`, `Poland`, `Europe`, `World`, `LongTermWeather`, `AirPollution`, `NotFound`) |
| **components**    | Feature UI; folder = `Name.jsx` + optional `Name.styles.jsx` + `index.js`                          |
| **state**         | Redux Toolkit: `cityData`, `themeData` (+ theme `localStorage` middleware)                         |
| **services/api**  | Axios clients for each provider                                                                    |
| **utils**         | Routes, API URL constants, citiesConfig, chart config, theme, formatters                           |
| **api AppModule** | Express app: helmet/cors/rate-limit/slow-down, `GET /health`, error handlers                       |
| **shared**        | Pure TS exports consumed by web and api after `tsc` build                                          |

## Data flow (web)

1. User picks a city (search / map / geolocation) → Redux `cityData`.
2. Page/hook calls a function from `apps/web/src/services/api`.
3. Axios hits the external provider with `import.meta.env.VITE_*` (loaded from `apps/web/.env`).
4. Component renders charts/maps/modals (Chart.js, Leaflet, R3F, SweetAlert2).

Theme: `themeData.isDarkMode` ↔ `localStorage` key `meteofy-is-dark-theme` (`"true"` / `"false"`).

Vite proxies `/api` → `http://localhost:3000` for future backend routes.

## Directory map

```text
meteofy/
├── AGENTS.md
├── README.md
├── LICENSE.md                 # AGPL-3.0
├── package.json               # workspaces root
├── docker-compose.yml         # optional API container
├── .cursor/                   # rules, hooks, skills, mcp.json
├── apps/
│   ├── web/
│   │   ├── public/
│   │   ├── .env.example       # VITE_* for the browser app
│   │   └── src/
│   │       ├── main.jsx
│   │       ├── App.jsx
│   │       ├── app/           # Redux store
│   │       ├── pages/
│   │       ├── components/    # by feature (home, maps, airPollution, …)
│   │       ├── layouts/
│   │       ├── routes/
│   │       ├── services/api/
│   │       ├── state/
│   │       ├── hooks/
│   │       ├── utils/         # constants, citiesConfig, charts, styles
│   │       └── assets/
│   └── api/
│       ├── Dockerfile
│       ├── .env.example       # PORT, LOG_*
│       └── src/
│           ├── index.ts       # bootstrap
│           ├── app.module.ts
│           ├── middleware/
│           ├── logger/
│           └── utils/
├── packages/
│   └── shared/
│       └── src/index.ts       # @meteofy/shared entry
└── docs/
    ├── architecture.md        # this file
    ├── plans/
    └── releases/
```

## Decisions (current)

| Topic         | Choice                                                                  |
| ------------- | ----------------------------------------------------------------------- |
| Layout        | npm workspaces: `apps/web`, `apps/api`, `packages/shared`               |
| UI language   | JavaScript/JSX in web; TypeScript in api + shared                       |
| Styling       | styled-components + light/dark themes (no Tailwind, no Next.js)         |
| State         | Redux Toolkit (city + theme)                                            |
| Routing       | React Router 6; paths in `apps/web/src/utils/constants/routes.js`       |
| Lint / format | ESLint 9 flat per workspace (`--max-warnings 0`); Prettier at repo root |
| Hosting (web) | Netlify                                                                 |
| API packaging | Optional Docker Compose → port 3000                                     |
| Tests         | None yet — lint/typecheck + manual QA                                   |
| Agent tooling | `.cursor/rules`, hooks (format, git guard, env guards), project skills  |

## External APIs

| Need                               | Provider                |
| ---------------------------------- | ----------------------- |
| Current / forecast / air pollution | Visual Crossing         |
| Map/globe city weather; seasonal   | Open-Meteo              |
| Europe temperature tiles           | OpenWeatherMap          |
| Reverse geocoding                  | Geoapify                |
| City search                        | GeoDB Cities (RapidAPI) |

## Related

- Agent guide: [../AGENTS.md](../AGENTS.md)
- Plans for larger work: [plans/](./plans)
- Release notes / screenshots: [README.md](./README.md)
- Product README: [../README.md](../README.md)
