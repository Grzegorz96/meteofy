<p align="center">
  <img src="docs/logo.svg" alt="Meteofy logo" width="100%" />
</p>

<h1 align="center">Meteofy</h1>

<p align="center">
  A responsive weather app built with React: forecasts, interactive maps, a 3D globe, long-term charts and air quality data.
</p>

<p align="center">
  <a href="https://meteofy-app.netlify.app"><img alt="Live demo" src="https://img.shields.io/badge/demo-live-brightgreen" /></a>
  <a href="https://github.com/Grzegorz96/meteofy/releases"><img alt="Latest release" src="https://img.shields.io/github/v/release/Grzegorz96/meteofy" /></a>
  <a href="LICENSE.md"><img alt="License" src="https://img.shields.io/badge/license-AGPL--3.0-blue" /></a>
  <img alt="React" src="https://img.shields.io/badge/React-Vite-61dafb" />
  <img alt="Monorepo" src="https://img.shields.io/badge/monorepo-npm%20workspaces-brightgreen" />
</p>

<p align="center">
  <img src="docs/releases/v1.0.0/screenshots/pc/home-page-dark.png" alt="Meteofy home page (dark mode)" width="49%" />
  <img src="docs/releases/v1.0.0/screenshots/pc/home-page-light.png" alt="Meteofy home page (light mode)" width="49%" />
</p>

## Table of contents

- [Overview](#overview)
- [Project structure](#project-structure)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Versions and documentation](#versions-and-documentation)
- [Lessons learned](#lessons-learned)
- [Author and contact](#author-and-contact)
- [License](#license)
- [Screenshots](#screenshots)

## Overview

Meteofy shows current weather and 15-day forecasts for cities around the world, and lets you explore conditions in several ways:

- an interactive **map of Poland** with voivodeship capitals,
- a **map of Europe** with country capitals,
- an interactive **3D globe**,
- a **long-term chart** with historical and future data,
- **air pollution** levels with a multi-day forecast.

It works on every screen size, supports light and dark themes, and combines data from several external APIs.

The repo is an **npm workspaces monorepo**: the React app in `apps/web`, a growing Express API in `apps/api`, and shared TypeScript in `packages/shared`. Today the browser still talks to weather providers directly; the API exposes health/security scaffolding for future `/api` routes.

**Live demo:** https://meteofy-app.netlify.app

For Cursor/agent conventions see [AGENTS.md](AGENTS.md). Architecture: [docs/architecture.md](docs/architecture.md).

## Project structure

```text
meteofy/
├── apps/
│   ├── web/                         # React 18 + Vite (JavaScript/JSX)
│   │   ├── public/                  # Static assets (weather icons)
│   │   ├── src/
│   │   │   ├── main.jsx             # Mounts Redux store and App
│   │   │   ├── App.jsx              # Theme provider, global styles, router
│   │   │   ├── app/                 # Redux store
│   │   │   ├── pages/               # Route screens
│   │   │   ├── components/          # UI by feature (Name.jsx + styles)
│   │   │   ├── layouts/             # MainLayout (header, outlet, footer)
│   │   │   ├── routes/              # React Router 6 config
│   │   │   ├── services/api/        # Axios clients for external APIs
│   │   │   ├── state/               # Redux Toolkit slices + theme persistence
│   │   │   ├── hooks/               # Shared data and UI hooks
│   │   │   ├── utils/               # Constants, charts, cities, formatters, theme
│   │   │   └── assets/              # Images, textures, CSS helpers
│   │   └── .env.example             # VITE_* keys for the web app
│   └── api/                         # Express 5 + TypeScript
│       ├── Dockerfile
│       ├── src/
│       │   ├── index.ts             # Bootstrap
│       │   ├── app.module.ts        # Express AppModule
│       │   ├── middleware/          # helmet, cors, rate-limit, errors, …
│       │   ├── logger/              # Winston
│       │   └── utils/               # Constants, response helpers
│       └── .env.example             # PORT, logging
├── packages/
│   └── shared/                      # @meteofy/shared (pure TS → dist)
│       └── src/                     # Types, schemas, constants, helpers
├── docs/
│   ├── architecture.md              # Layers, data flow, directory map
│   ├── plans/                       # Larger task plans
│   ├── releases/                    # Versioned notes + screenshots
│   └── logo.svg
├── .cursor/
│   ├── rules/                       # Agent rules (project, web, api, …)
│   ├── hooks/ + hooks.json          # Format, git guard, env guards
│   ├── skills/                      # Project skills (see skills-lock.json)
│   └── mcp.json                     # MCP server config
├── .vscode/                         # Editor extensions + settings
├── AGENTS.md                        # Agent/contributor entrypoint
├── README.md                        # Product overview (this file)
├── LICENSE.md                       # AGPL-3.0
├── package.json                     # Workspaces root scripts
├── package-lock.json
├── skills-lock.json                 # Locked Cursor skill versions
├── docker-compose.yml               # Optional API container (port 3000)
├── .editorconfig
├── .prettierrc + .prettierignore
├── .gitignore
├── .dockerignore
├── .cursorignore                    # Extra ignores for the agent
└── .env.example                     # Optional MCP keys (not Vite)
```

## Features

| Page                  | What you get                                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home**              | Current weather, 15-day forecast with hourly details, automatic data for your location                                                         |
| **Poland**            | Interactive map by voivodeship, weather labels on capitals, detailed weather modal on click                                                    |
| **Europe**            | Map with a temperature tile layer, clustered markers for European capitals, detailed modals                                                    |
| **World**             | 3D globe (rotate, zoom, multiple textures), weather boards for country capitals, highlight on hover, detailed modal on click                   |
| **Long-term weather** | Line chart with selectable date ranges and weather parameters, automatic data for your location                                                |
| **Air pollution**     | Current pollution on a bar chart with AQI, multi-day forecast with hourly line charts, switchable pollutants, automatic data for your location |
| **404**               | A friendly not-found page with a link back to the home page                                                                                    |

**Across the whole app:**

- **Themes:** light and dark mode, saved in local storage; on the first visit the theme follows the system setting.
- **Responsive design:** from wide desktop monitors to narrow phone screens, with a sidebar menu on screens below 768 px.
- **Search:** city search that asynchronously fetches suggestions as you type.
- **Loading and errors:** a loader for every data fetch, animated error modals, and handling of API responses with missing keys.
- **Routing:** every page has its own URL, so you can navigate with links or type the address directly.
- **Accessibility:** full keyboard support.

## Tech stack

| Area           | Technologies                                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Monorepo       | npm workspaces (`apps/*`, `packages/*`), concurrently for `dev`                                                                                   |
| Web            | JavaScript/JSX, React 18, Vite 5, React Router 6                                                                                                  |
| API            | TypeScript, Express 5, Winston, helmet / cors / rate-limit / slow-down                                                                            |
| Shared         | `@meteofy/shared` — pure TypeScript types/helpers built with `tsc`                                                                                |
| State          | Redux Toolkit, React Redux                                                                                                                        |
| Styling and UI | Styled Components, RSuite, React Icons, React Spinners, SweetAlert2, FontAwesome, React Accessible Accordion, React Burger Menu, React Responsive |
| 3D             | Three.js, @react-three/fiber, @react-three/drei                                                                                                   |
| Charts         | Chart.js, react-chartjs-2, chartjs-adapter-date-fns, chartjs-plugin-datalabels                                                                    |
| Maps           | Leaflet, React Leaflet, React Leaflet Cluster                                                                                                     |
| Data and forms | Axios, React Select, React Select Async Paginate                                                                                                  |
| SVG            | Vite Plugin SVGR                                                                                                                                  |
| Hosting (web)  | [Netlify](https://www.netlify.com)                                                                                                                |
| API packaging  | Optional Docker Compose → port 3000                                                                                                               |

**External APIs (used by the web app today):**

| Purpose                                                          | Provider                                                                         |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Current weather, forecast and air pollution                      | [Visual Crossing](https://www.visualcrossing.com)                                |
| City weather on maps and the globe; long-term / seasonal weather | [Open-Meteo](https://open-meteo.com)                                             |
| Europe temperature map tiles                                     | [OpenWeatherMap](https://openweathermap.org)                                     |
| Reverse geocoding                                                | [Geoapify](https://www.geoapify.com)                                             |
| City search                                                      | [GeoDB Cities (RapidAPI)](https://rapidapi.com/wirefreethought/api/geodb-cities) |

## Getting started

The quickest way is the [live demo](https://meteofy-app.netlify.app). To run locally you need [Node.js](https://nodejs.org) (npm) and an editor such as VS Code / Cursor.

**1. Clone and install** (from the repo root)

```bash
git clone https://github.com/Grzegorz96/meteofy.git
cd meteofy
npm install
```

**2. Get API keys** from [Visual Crossing](https://www.visualcrossing.com), [GeoDB Cities](https://rapidapi.com/wirefreethought/api/geodb-cities), [OpenWeatherMap](https://openweathermap.org) and [Geoapify](https://www.geoapify.com).

**3. Env files**

Web (required for the UI) — copy `apps/web/.env.example` → `apps/web/.env`:

```env
VITE_VISUAL_CROSSING_API_KEY=your_api_key
VITE_GEO_DB_API_KEY=your_api_key
VITE_OPEN_WEATHER_API_KEY=your_api_key
VITE_GEO_APIFY_API_KEY=your_api_key
```

API (optional for local backend) — copy `apps/api/.env.example` → `apps/api/.env` (see that file for `PORT` and logging).

Never commit real `.env` files.

**4. Start development** (shared watch + API + web)

```bash
npm run dev
```

Vite prints the web URL. The web dev server proxies `/api` to `http://localhost:3000`.

Useful root scripts: `npm run build` · `npm run lint` · `npm run typecheck` · `npm run format` · `npm run dev:web` / `dev:api` / `dev:shared`

API only via Docker: `docker compose up` (uses `apps/api/.env`, port 3000).

## Versions and documentation

Every release is tagged in git and has its own documentation (features and screenshots from that period) under `docs/releases/`. Opening a tag on GitHub shows the code and docs exactly as they were in that version.

| Version   | Description | Documentation                                | Release                                                             |
| --------- | ----------- | -------------------------------------------- | ------------------------------------------------------------------- |
| **1.0.0** | Original UI | [docs/releases/v1.0.0](docs/releases/v1.0.0) | [v1.0.0](https://github.com/Grzegorz96/meteofy/releases/tag/v1.0.0) |

Also useful:

- [docs/README.md](docs/README.md) — docs index
- [docs/architecture.md](docs/architecture.md) — monorepo layers and data flow
- [AGENTS.md](AGENTS.md) — agent/contributor guide

The project follows [Semantic Versioning](https://semver.org): a major version for a new UI or breaking changes, a minor version for new features, a patch for fixes.

When you publish a new version (for example `v2.0.0`), add `docs/releases/v2.0.0/` with its own `README.md` and `screenshots/`, link it above, and update the hero preview images in this README so they always show the latest UI.

## Lessons learned

Building Meteofy took about three months and taught me a lot about React and its ecosystem. Along the way I:

- learned Redux and how to structure folders in a larger application,
- shared data and logic between components in several ways, including custom hooks,
- worked with SVG files and generated custom SVGs,
- programmed 3D objects for the first time and dealt with raycasting,
- built dynamic charts where users switch between datasets on a single chart,
- got better at using ready-made library solutions instead of reinventing them.

Later work split the repo into an npm workspaces monorepo and added Express/TypeScript scaffolding plus Cursor agent tooling (rules, hooks, skills).

## Author and contact

**Grzegorz96** ([GitHub](https://www.github.com/Grzegorz96)) · grzesstrzeszewski@gmail.com

## License

Released under the [AGPL-3.0 license](LICENSE.md). The whole monorepo (web, api, shared) is covered by that license.

## Screenshots

Screenshots are organized by device type and feature, with light and dark theme variants where available. Full archive: [`docs/releases/v1.0.0/`](docs/releases/v1.0.0/).

### Desktop (PC)

#### Home

![Home — Dark Theme](docs/releases/v1.0.0/screenshots/pc/home-page-dark.png)

![Home — Light Theme](docs/releases/v1.0.0/screenshots/pc/home-page-light.png)

![Home with Accordion — Dark Theme](docs/releases/v1.0.0/screenshots/pc/home-page-with-accordion-dark.png)

![Home with Accordion — Light Theme](docs/releases/v1.0.0/screenshots/pc/home-page-with-accordion-light.png)

#### Poland

![Poland Map — Dark Theme](docs/releases/v1.0.0/screenshots/pc/poland-map-dark.png)

![Poland Map — Light Theme](docs/releases/v1.0.0/screenshots/pc/poland-map-light.png)

![Weather Modal — Poland — Dark Theme](docs/releases/v1.0.0/screenshots/pc/weather-modal-poland-dark.png)

![Weather Modal — Poland — Light Theme](docs/releases/v1.0.0/screenshots/pc/weather-modal-poland-light.png)

#### Europe

![Europe Map — Dark Theme](docs/releases/v1.0.0/screenshots/pc/europe-map-dark.png)

![Europe Map — Light Theme](docs/releases/v1.0.0/screenshots/pc/europe-map-light.png)

![Weather Modal — Europe — Dark Theme](docs/releases/v1.0.0/screenshots/pc/weather-modal-europe-dark.png)

![Weather Modal — Europe — Light Theme](docs/releases/v1.0.0/screenshots/pc/weather-modal-europe-light.png)

#### World

![World Globe — Dark Theme](docs/releases/v1.0.0/screenshots/pc/world-globe-dark.png)

![World Globe — Light Theme](docs/releases/v1.0.0/screenshots/pc/world-globe-light.png)

![Weather Modal — World — Dark Theme](docs/releases/v1.0.0/screenshots/pc/weather-modal-world-dark.png)

![Weather Modal — World — Light Theme](docs/releases/v1.0.0/screenshots/pc/weather-modal-world-light.png)

#### Long-term Weather

![Long-term Weather — Dark Theme](docs/releases/v1.0.0/screenshots/pc/long-term-weather-dark.png)

![Long-term Weather — Light Theme](docs/releases/v1.0.0/screenshots/pc/long-term-weather-light.png)

![Long-term Weather with Date Range — Dark Theme](docs/releases/v1.0.0/screenshots/pc/long-term-weather-daterange-dark.png)

![Long-term Weather with Date Range — Light Theme](docs/releases/v1.0.0/screenshots/pc/long-term-weather-daterange-light.png)

#### Air Pollution

![Air Pollution — Dark Theme](docs/releases/v1.0.0/screenshots/pc/air-pollution-dark.png)

![Air Pollution — Light Theme](docs/releases/v1.0.0/screenshots/pc/air-pollution-light.png)

![Air Pollution with Accordion — Dark Theme](docs/releases/v1.0.0/screenshots/pc/air-pollution-accordion-dark.png)

![Air Pollution with Accordion — Light Theme](docs/releases/v1.0.0/screenshots/pc/air-pollution-accordion-light.png)

#### Search and Error States

![Search — Dark Theme](docs/releases/v1.0.0/screenshots/pc/search-engine-dark.png)

![Search — Light Theme](docs/releases/v1.0.0/screenshots/pc/search-engine-light.png)

![Error Modal — Dark Theme](docs/releases/v1.0.0/screenshots/pc/error-modal-dark.png)

![Error Modal — Light Theme](docs/releases/v1.0.0/screenshots/pc/error-modal-light.png)

![Not Found Page — Dark Theme](docs/releases/v1.0.0/screenshots/pc/not-found-page-dark.png)

![Not Found Page — Light Theme](docs/releases/v1.0.0/screenshots/pc/not-found-page-light.png)

### Mobile

#### Home

![Home — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/home-page-dark.png)

![Home — Light Theme](docs/releases/v1.0.0/screenshots/mobile/home-page-light.png)

![Home with Accordion — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/home-page-with-accordion-dark.png)

![Home with Accordion — Light Theme](docs/releases/v1.0.0/screenshots/mobile/home-page-with-accordion-light.png)

#### Poland

![Poland Map — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/poland-map-dark.png)

![Poland Map — Light Theme](docs/releases/v1.0.0/screenshots/mobile/poland-map-light.png)

![Weather Modal — Poland — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/weather-modal-poland-dark.png)

![Weather Modal — Poland — Light Theme](docs/releases/v1.0.0/screenshots/mobile/weather-modal-poland-light.png)

#### Europe

![Europe Map — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/europe-map-dark.png)

![Europe Map — Light Theme](docs/releases/v1.0.0/screenshots/mobile/europe-map-light.png)

![Weather Modal — Europe — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/weather-modal-europe-dark.png)

![Weather Modal — Europe — Light Theme](docs/releases/v1.0.0/screenshots/mobile/weather-modal-europe-light.png)

#### World

![World Globe — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/world-globe-dark.png)

![World Globe — Light Theme](docs/releases/v1.0.0/screenshots/mobile/world-globe-light.png)

![Weather Modal — World — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/weather-modal-world-dark.png)

![Weather Modal — World — Light Theme](docs/releases/v1.0.0/screenshots/mobile/weather-modal-world-light.png)

#### Long-term Weather

![Long-term Weather — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/long-term-weather-dark.png)

![Long-term Weather — Light Theme](docs/releases/v1.0.0/screenshots/mobile/long-term-weather-light.png)

![Long-term Weather with Date Range — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/long-term-weather-daterange-dark.png)

![Long-term Weather with Date Range — Light Theme](docs/releases/v1.0.0/screenshots/mobile/long-term-weather-daterange-light.png)

#### Air Pollution

![Air Pollution — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/air-pollution-dark.png)

![Air Pollution — Light Theme](docs/releases/v1.0.0/screenshots/mobile/air-pollution-light.png)

![Air Pollution with Accordion — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/air-pollution-accordion-dark.png)

![Air Pollution with Accordion — Light Theme](docs/releases/v1.0.0/screenshots/mobile/air-pollution-accordion-light.png)

#### Search, Navigation, and Error States

![Search — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/search-engine-dark.png)

![Search — Light Theme](docs/releases/v1.0.0/screenshots/mobile/search-engine-light.png)

![Sidebar Menu — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/side-bar-menu-dark.png)

![Sidebar Menu — Light Theme](docs/releases/v1.0.0/screenshots/mobile/side-bar-menu-light.png)

![Error Modal — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/error-modal-dark.png)

![Error Modal — Light Theme](docs/releases/v1.0.0/screenshots/mobile/error-modal-light.png)

![Not Found Page — Dark Theme](docs/releases/v1.0.0/screenshots/mobile/not-found-page-dark.png)

![Not Found Page — Light Theme](docs/releases/v1.0.0/screenshots/mobile/not-found-page-light.png)
