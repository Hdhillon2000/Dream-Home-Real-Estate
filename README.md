# Dream Home Real Estate

## Project Overview
Dream Home Real Estate is our capstone-style build that pairs a React/Vite front-end with an Express API wired for Oracle stored procedures. The current milestone delivers a fully documented UI skeleton covering the instructor’s Staff, Branch, Client, Authentication, and Property Listing/Details flows, while the backend team prepares the database integrations.

## Workspace Layout
```
Dream-Home-Real-Estate/
├─ client/          # React 19 + Vite front-end
├─ server/          # Express API ready for Oracle connectivity
├─ docs/            # Instructor brief, property research, and supporting assets
└─ package.json     # npm workspace entry point + shared scripts
```

### Front-End Highlights (client/)
- React Router 7 navigation with documented routes for staff, branch, client, login, registration, and the new listings/detail experiences.
- Reusable layout + `PageSection` component to keep UX consistent while placeholders stand in for API data.
- Inline `@file`, `@purpose`, and `TODO (Backend Team)` comments flag exact integration points for future API calls.
- Property research + UX intent is documented in `docs/property-pages-research.md` to guide future design polish.
- Detailed front-end README at `client/README.md` containing change log, TODOs, and setup notes.

### Back-End Highlights (server/)
- Express server bootstrapped with CORS, JSON parsing, and production static serving for the built React bundle.
- `/api/test` endpoint proves Express wiring; new routers can be added under `server/src/routes/` to call Oracle procedures (`dh_staff_hire_sp`, `new_branch`, etc.).
- MySQL/Oracle connection scaffolding staged inside `server/src/mysql/` and awaiting credentials.

## Getting Started
### Prerequisites
- Node.js 20+
- npm 10+

### Install Dependencies
```bash
npm install
```
The npm workspace manages packages for both `client/` and `server/`.

### Run the App
- **Full stack dev mode:** `npm run dev`
  - React dev server: http://localhost:5173
  - Express API: http://localhost:3000 (all non-API routes proxy to the Vite dev server)
- **Front-end only:** `npm run dev --workspace=client`
- **Back-end only:** `npm run dev --workspace=server`

### Production Tasks
##### - (NYI) - Lint front-end code: `npm run lint --workspace=client`
- Build static assets: `npm run build`
- Serve production bundle: `npm start` (runs Express with `NODE_ENV=production` and serves `client/dist`)

## Current Status & Coordination Notes
- Front-end components call `resolvePlaceholder(...)` or reference `PROPERTY_LISTINGS` so they render meaningful layouts before APIs are live.
- Backend teammates should replace those placeholders with calls to the upcoming routes:
  - `GET /api/staff`, `POST /api/staff/hire`
  - `GET /api/branches`, `POST /api/branches`, `PATCH /api/branches/:id`
  - `GET /api/clients`, `POST /api/clients`, `PATCH /api/clients/:id`
  - `POST /api/auth/login`, `POST /api/auth/register`
- Property flows expect:
  - `GET /api/properties` for listing/search filters, pagination, saved searches.
  - `GET /api/properties/:id` for hero media, documents, disclosures, and map overlays.
  - `POST /api/leads` + `POST /api/showings` once the booking/tour router ships.
- Once endpoints ship, we will add form validation feedback and route guards on the React side.

## Change Log
- **2025-11-03** — Added research-backed property listing + detail scaffolds, expanded placeholder datasets, and refreshed global styles.
- **2025-11-03** — Front-end authentication scaffolding, project-wide README, and backend integration breadcrumbs.
- **2025-11-01** — Staff/Branch/Client menus with placeholder datasets and reusable layout primitives.
- **2025-10-31** — React/Vite bootstrap aligned with portfolio coding standards and documented components.

## Roles & Contributors
- **Front-End Lead:** Alex Kachur — https://github.com/AlexKachur98
- **Back-End Lead:** Michael Goodie — https://github.com/gidsola
- **Project / Kanban Manager:** Harkaran Singh Dhillon — https://github.com/Hdhillon2000

## Next Milestones
1. Backend connects Express routes to Oracle stored procedures and finalizes authentication strategy.
2. Front-end replaces placeholder loaders with live fetch calls and surfaces API validation states.
3. Team coordinates deployment + environment configuration for production hand-off.
---

### *May your code be clean and your pancakes fluffy!* 🥞  