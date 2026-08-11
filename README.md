# Optimo Casino UI

A responsive crash-game interface built with React, TypeScript, and Vite. The
project currently provides the client-side presentation layer for a casino game:
bet controls, multiplier history, bet/statistics board, settings menu, and
English/Georgian localization.

> **Project status:** UI prototype. Game-round execution, authentication,
> balance management, real-time transport, and payment-grade betting logic are
> intentionally not implemented yet.

## Highlights

- Responsive, component-based casino interface
- Reusable betting controls with preset amounts, auto-bet, and auto-cash-out UI
- Multiplier history and bet/statistics tabs
- English (`/en`) and Georgian (`/ka`) routes
- Locale-aware currency and multiplier formatting
- CSS Modules for component-scoped styles
- TypeScript, ESLint, and production build validation

## Technology

| Area | Choice |
| --- | --- |
| UI | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| Styling | CSS Modules |
| Localization | i18next + react-i18next |
| Planned game renderer | Phaser |
| Quality checks | ESLint + TypeScript build |

## Prerequisites

- Node.js 20.19+ or 22.12+
- npm 10+

## Getting started

```bash
git clone <repository-url>
cd casino-project-optimo
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

To view the Georgian interface, open `/ka`; English is the default and is
available at `/en` or `/`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with HMR |
| `npm run lint` | Run ESLint across the project |
| `npm run build` | Type-check and create an optimized production build |
| `npm run preview` | Serve the local production build |

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

## Project structure

```text
src/
├── components/              # Shared UI and application-shell components
│   ├── shell/               # Header and footer
│   └── ui/                  # Buttons, inputs, multiplier badge
├── features/                # Product features grouped by domain
│   ├── betControlPanel/     # Bet amount, auto-bet, and cash-out controls
│   ├── betsBoard/           # Bets table, tabs, and statistics views
│   ├── game/                # Current multiplier external store
│   ├── menu/                # Settings dropdown
│   └── multiplierHistory/   # Previous-round multiplier list
├── hooks/                   # Reusable React hooks
├── i18n/                    # Locale setup, route-language sync, translations
├── layouts/                 # Page composition shell
├── pages/                   # Route-level views
├── utils/                   # Formatting helpers
└── assets/                  # SVG and other static UI assets
```

Import aliases are configured for `@components`, `@features`, `@hooks`,
`@layouts`, `@pages`, `@assets`, `@utils`, and `@styles`.

## Localization

Translations are located in:

- `src/i18n/locales/en/common.json`
- `src/i18n/locales/ka/common.json`

`usePathLanguage` synchronizes the active language with the first URL segment.
When adding user-visible copy, add the same key to both locale files and use
`useTranslation()` rather than hard-coding text in a component.

Currency and multiplier output should use `src/utils/format.ts`, which maps
supported languages to their appropriate `Intl` locale.

## Architecture notes

Feature folders own their UI, styles, types, and feature-specific hooks. Shared
elements belong under `components/`, while route composition lives in `pages/`
and `layouts/`. This keeps pages thin and makes reusable controls independent of
their parent view.

`src/features/game/multiplierStore.ts` exposes a small external store via
`useSyncExternalStore`. When the Phaser game is introduced, publish round
multiplier updates through `setCurrentMultiplier()`; components consuming
`useCurrentMultiplier()` will update consistently.

## Current limitations

The interface uses local and mock data. In particular, multiplier history and
bets are static, and placing/cashing out a bet affects only component state.
This is deliberate for the prototype, but it must not be treated as real-money
game logic.

The following capabilities are required before a production launch:

- Server-authoritative rounds, balances, bet placement, and cash-out settlement
- Authenticated API/WebSocket transport with reconnect and error handling
- Idempotency keys and validation for every financial operation
- A verified provably-fair workflow and immutable audit records
- Responsible-gambling limits and compliance controls
- Automated unit, integration, and end-to-end tests
- CI checks for linting, type-checking, tests, and production builds

## Contributing guidelines

- Keep UI components small, typed, and accessible.
- Use CSS Modules; avoid global styling unless it is an application-wide token or reset.
- Keep feature-specific code inside its feature directory.
- Do not place secrets, API keys, or real-money settlement rules in the client.
- Update both locales when adding translated UI text.
- Add tests alongside new game rules and state transitions once the test stack is introduced.

## License

No license has been specified for this repository. Add a license file before
sharing or distributing the project.
