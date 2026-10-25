# Meteofy documentation

Index for architecture, plans, and versioned release notes/screenshots.

## For agents and contributors

| Doc                                  | Purpose                              |
| ------------------------------------ | ------------------------------------ |
| [../AGENTS.md](../AGENTS.md)         | Stack, commands, env, Cursor layout  |
| [architecture.md](./architecture.md) | Layers, data flow, directory map     |
| [plans/](./plans)                    | Larger task plans                    |
| [../README.md](../README.md)         | Product overview, setup, screenshots |

## Releases

| Version                      | Status                  | Notes                                                                |
| ---------------------------- | ----------------------- | -------------------------------------------------------------------- |
| [v1.0.0](./releases/v1.0.0/) | Current product UI docs | Original UI; living tree is now a monorepo (see release README note) |

## Layout

```text
docs/
├── README.md                 # this index
├── architecture.md
├── logo.svg
├── plans/                    # implementation plans (one file per initiative)
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
