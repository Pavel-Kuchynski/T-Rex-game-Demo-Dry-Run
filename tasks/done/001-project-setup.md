# Project Setup

## ID
001

## Priority
High

## Status
done

## Description
Bootstrap the project with an HTML entry point, HTML5 Canvas element, Vite bundler, ESLint, and Vitest. Establish the full folder structure so all subsequent tasks have a consistent home for their modules and tests.

## Acceptance Criteria
- [x] `index.html` exists at project root with a `<canvas id="game-canvas">` element (800×300 px)
- [x] Vite is configured (`vite.config.js`) and `npm run dev` launches a local dev server without errors
- [x] `npm run build` produces a production bundle in `dist/`
- [x] Vitest is configured (`vitest.config.js` or inside `vite.config.js`) and `npm run test` runs the test suite
- [x] ESLint is configured (`.eslintrc.js` or `eslint.config.js`) with at minimum `no-unused-vars` and `no-undef` rules enabled
- [x] Folder structure exists: `src/entities/`, `src/systems/`, `src/core/`, `tests/`
- [x] `src/main.js` is the Vite entry point and is referenced in `index.html`
- [x] `package.json` contains scripts: `dev`, `build`, `test`, `lint`
- [x] `.gitignore` excludes `node_modules/` and `dist/`

## Technical Notes
- Use Vite 5+ with vanilla JS (no framework).
- Canvas dimensions should be defined as constants in `src/core/constants.js` (e.g. `CANVAS_WIDTH = 800`, `CANVAS_HEIGHT = 300`) so all systems share a single source of truth.
- Vitest should be configured to run in a jsdom environment so DOM APIs are available in tests.
- ESLint should not block the dev server — use it as a separate `lint` script only.

## Dependencies
None

## Estimated Effort
S
