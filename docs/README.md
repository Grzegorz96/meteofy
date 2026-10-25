# Meteofy documentation

Release notes, screenshots, and version-specific docs live here. Each version is self-contained under `releases/<version>/`.

For agents and contributors:

- [architecture.md](./architecture.md) — layers, data flow, directory map
- [plans/](./plans/README.md) — larger task plans
- [../AGENTS.md](../AGENTS.md) — Cursor/agent commands and conventions

## Releases

| Version                      | Status  | Notes                                   |
| ---------------------------- | ------- | --------------------------------------- |
| [v1.0.0](./releases/v1.0.0/) | Current | Original UI before the planned redesign |

## Layout

```text
docs/
├── README.md                 # this index
├── logo.svg
└── releases/
    └── v1.0.0/
        ├── README.md         # release notes and screenshots
        └── screenshots/
            ├── pc/
            └── mobile/
```

When you publish a new version (for example `v2.0.0`):

1. Add `docs/releases/v2.0.0/` with its own `README.md` and `screenshots/`.
2. Link it in the table above.
3. Point the root project `README.md` screenshot paths at the newest folder so the main README always shows the latest UI.
