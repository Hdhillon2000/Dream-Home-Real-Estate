# Dream Home Real Estate — Front-End

## Overview
Dream Home Real Estate is a React + Vite interface that mirrors our instructor brief for staff, branch, client, authentication, and now the flagship property listing/detail workflows. The current build focuses on documented layouts, navigation parity, and placeholder data so the backend team can wire Oracle procedures and REST endpoints without UI blockers.

## Tech Stack
- React 19 with Vite 7 for a fast development experience
- React Router 7 for SPA navigation
- ESLint 9 standard config (matching portfolio code style)

## Getting Started
```bash
npm install
npm run dev
```

The dev server runs on http://localhost:5173 by default. Use `npm run lint` before committing to keep formatting aligned with the rest of the portfolio projects.

## Project Structure
```
client/
  src/
    components/      # Layout chrome + shared wrappers
    pages/           # Route-aligned screens (staff, branch, client, auth, listing, details)
    utils/           # Navigation metadata + API helpers + placeholder properties
    index.css        # Base design tokens + layout primitives
```

## Backend Coordination
- `GET /api/test` is the only live route today; staff/branch/client CRUD endpoints remain TODO on the Node backend.
- Authentication forms surface TODO comments in code that call out the expected routes (`POST /api/auth/login`, `POST /api/auth/register`).
- Property list/detail scaffolds rely on `PROPERTY_LISTINGS` inside `src/utils/properties.js`. Expect to replace these with:
  - `GET /api/properties?status=&beds=&price=` for listing grid filters, saved searches, and analytics tiles.
  - `GET /api/properties/:id` for hero media, documents, disclosures, schedule state, and map/school overlays.
  - `POST /api/leads` + `POST /api/showings` for card and detail CTAs (`Book Tour`, `Request Tour`, `Ask a Question`).
- Placeholder tables resolve through `resolvePlaceholder()` so swapping in real fetch calls will be straight-forward once routes go live.

## Change Log
- **2025-11-03** — Added research-backed property listing + detail pages with expanded placeholder data and supporting styles.
- **2025-11-03** — Added login/register scaffolding and surfaced auth cards on the dashboard.
- **2025-11-03** — Introduced shared utilities, refactored layout, and validated linting.
- **2025-11-01** — Scaffolded staff, branch, and client menus with placeholder data grids.
- **2025-10-31** — Realigned Vite bootstrap (App shell, router, styling) with portfolio code quality.

## Front-End TODOs
- Replace placeholder data loaders with `fetch` calls once `/api/staff`, `/api/branches`, and `/api/clients` are exposed by the backend team.
- Integrate login/register forms with upcoming authentication endpoints and show backend validation responses in `form-status` elements.
- Add route guards and persist session state once auth is in place.
- Wire property search/filter controls to live query params and hook CTA buttons to the lead router once `/api/properties` + `/api/leads` exist.
- Polish styling (typography, responsive trays) after core functionality is verified.

## Developer Notes
- Follow the inline `TODO (Backend Team)` breadcrumbs within the page components for exact integration points.
- Keep documentation headers (`@file`, `@author`, `@since`, `@purpose`) intact when extending components.
- See `docs/property-pages-research.md` for the rationale behind the listing/detail scaffold and planned future enhancements.
