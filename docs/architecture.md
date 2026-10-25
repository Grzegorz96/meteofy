# Architecture

Meteofy is an npm-workspaces monorepo. The **web** app currently talks to **external weather/geocoding APIs** from the browser. The **api** app is a growing Express backend (health check + security middleware today). Shared code lives in `@meteofy/shared`.

## Layers

```text
┌─────────────────────────────────────────────────────────────┐
│  apps/web (React 18 + Vite)                                 │
│  pages → components → hooks / Redux → services/api (axios)  │
└─────────────┬───────────────────────────────┬───────────────┘
              │ VITE_* keys                   │ future: /api
              ▼                               ▼
   External providers              apps/api (Express + TS)
   Visual Crossing, Open-Meteo,    middleware → routes → logger
   OpenWeatherMap, Geoapify,       packages/shared (types/helpers)
   GeoDB Cities (RapidAPI)
```

| Layer | Responsibility |
| --- | --- |
| **pages** | Route screens (`Home`, `Poland`, `Europe`, `World`, `LongTermWeather`, `AirPollution`, `NotFound`) |
| **components** | Feature UI; folder = `Name.jsx` + optional `Name.styles.jsx` + `index.js` |
| **state** | Redux Toolkit: `cityData`, `themeData` (+ theme `localStorage` middleware) |
| **services/api** | Axios clients for each provider |
| **utils** | Routes, API URL constants, citiesConfig, chart config, theme, formatters |
| **api AppModule** | Express app: helmet/cors/rate-limit/slow-down, `/health`, error handlers |
| **shared** | Pure TS exports consumed by web and api after `tsc` build |

## Data flow (web)

1. User picks a city (search / map / geolocation) → Redux `cityData`.
2. Page/hook calls a function from `apps/web/src/services/api`.
3. Axios hits the external provider with `import.meta.env.VITE_*`.
4. Component renders charts/maps/modals (Chart.js, Leaflet, R3F, SweetAlert2).

Theme: `themeData.isDarkMode` ↔ `localStorage` key `meteofy-is-dark-theme` (`"true"` / `"false"`).

## Directory map

```text
meteofy/
├── AGENTS.md                 # agent entrypoint
├── apps/
│   ├── web/
│   │   ├── public/           # static assets (weather icons)
│   │   └── src/
│   │       ├── main.jsx
│   │       ├── App.jsx
│   │       ├── app/          # Redux store
│   │       ├── pages/
│   │       ├── components/   # by feature (home, maps, airPollution, …)
│   │       ├── layouts/
│   │       ├── routes/
│   │       ├── services/api/
│   │       ├── state/
│   │       ├── hooks/
│   │       ├── utils/        # constants, citiesConfig, charts, styles
│   │       └── assets/
│   └── api/
│       ├── Dockerfile
│       └── src/
│           ├── index.ts      # bootstrap
│           ├── app.module.ts
│           ├── middleware/
│           ├── logger/
│           └── utils/
└── packages/
    └── shared/
        └── src/index.ts      # @meteofy/shared entry
```

## Decisions (current)

| Topic | Choice |
| --- | --- |
| UI language | JavaScript/JSX in web; TypeScript in api + shared |
| Styling | styled-components + light/dark themes (no Tailwind) |
| State | Redux Toolkit (city + theme) |
| Routing | React Router 6; paths in `utils/constants/routes.js` |
| Lint | ESLint 9 flat config per workspace; `--max-warnings 0` |
| Hosting (web) | Netlify |
| API packaging | Optional Docker Compose → port 3000 |
| Tests | None yet — lint/typecheck + manual QA |

## External APIs

| Need | Provider |
| --- | --- |
| Current / forecast / air pollution | Visual Crossing |
| Map/globe city weather; seasonal | Open-Meteo |
| Europe temperature tiles | OpenWeatherMap |
| Reverse geocoding | Geoapify |
| City search | GeoDB Cities (RapidAPI) |

## Related

- Plans for larger work: [plans/](./plans/)
- Release notes / screenshots: [README.md](./README.md)
- Product README: [../README.md](../README.md)
