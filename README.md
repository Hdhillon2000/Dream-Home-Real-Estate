# Dream Home Real Estate

## Project Overview
Dream Home Real Estate is a full-stack real estate portal that connects home buyers with exceptional properties across the Greater Toronto Area. The application features a React/Vite front-end with a custom design system and an Express API with MySQL database integration and JWT authentication.

## Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 7, React Router 7, Tailwind CSS 4 |
| Backend | Express.js 5, Node.js 20+ |
| Database | MySQL 8 (via mysql2/promise) |
| Auth | JWT (ES512 algorithm), httpOnly cookies |

## Workspace Layout
```
Dream-Home-Real-Estate/
├─ client/              # React 19 + Vite front-end
│   ├─ src/
│   │   ├─ components/  # UI components (ui/, layout/, auth/)
│   │   ├─ pages/       # Route-aligned screens
│   │   ├─ styles/      # Global CSS + Tailwind config
│   │   └─ utils/       # Navigation metadata, API helpers
│   └─ public/          # Static assets and images
├─ server/              # Express API
│   └─ src/
│       ├─ routes/      # API route handlers
│       └─ mysql/       # Database connection + queries
├─ docs/                # Architecture docs and update logs
└─ package.json         # npm workspace entry point
```

## Front-End Highlights
- **Design System**: Custom component library (Button, Card, Header, Footer) with Tailwind CSS 4
- **Typography**: Fraunces (headings) + Plus Jakarta Sans (body) via Google Fonts
- **Color Palette**: Sea/Forest/Deepsea primary colors with Gold/Coral accents
- **Animations**: Fade-in, scale-in, and slide-in effects with stagger delays
- **Property Listings**: Filterable grid with status badges, hover effects, and responsive cards
- **Authentication**: Login/Register forms with session management

## Back-End Highlights
- Express 5 server with CORS, JSON parsing, and cookie handling
- JWT authentication with ES512 algorithm and httpOnly cookie storage
- MySQL2 database integration with connection pooling
- RESTful API routes for properties, showings, inquiries, and auth

## API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User authentication |
| `/api/auth/register` | POST | User registration |
| `/api/auth/session` | GET | Session validation |
| `/api/auth/logout` | POST | Logout and clear session |
| `/api/properties` | GET | List properties with filters |
| `/api/properties/:id` | GET | Property details |
| `/api/showings/user` | GET | User's scheduled showings |
| `/api/showings` | GET | All showings (admin only) |
| `/api/inquiries/user` | GET | User's inquiries |
| `/api/inquiries` | GET | All inquiries (admin only) |

## Getting Started

### Prerequisites
- Node.js 20+
- npm 10+
- MySQL 8+

### Install Dependencies
```bash
npm install
```
The npm workspace manages packages for both `client/` and `server/`.

### Environment Setup
Create `.env` files in both `client/` and `server/` directories. See `docs/README.md` for required variables.

### Run the App
- **Full stack dev mode:** `npm run dev`
  - React dev server: http://localhost:5173
  - Express API: http://localhost:3000 (proxied from Vite)
- **Front-end only:** `npm run dev --workspace=client`
- **Back-end only:** `npm run dev --workspace=server`

### Production
- Build static assets: `npm run build`
- Serve production bundle: `npm start` (runs Express with `NODE_ENV=production`)

## Current Status

### Completed Features
- User authentication (login, register, logout, session management)
- Property listing with filters (status, beds, baths, price range)
- Property details page with hero images and specifications
- Staff, Branch, and Client management menus
- Showings and Inquiries management (user and admin views)
- Responsive design with mobile navigation
- Custom design system with editorial typography

### In Progress
- Property search with saved searches
- Lead routing for property inquiries
- Email notifications for showings

## Change Log
- **2025-12-02** — Full frontend redesign: complete style overhaul, Google Fonts, enhanced color palette, animation system, component polish. Dead code cleanup and asset optimization.
- **2025-12-01** — Backend complete: JWT authentication, MySQL integration, full API routes. Full frontend and style redesign with new design system components (Button, Card, Header, Footer).
- **2025-11-03** — Property listing + detail scaffolds, placeholder datasets, global styles refresh.
- **2025-11-03** — Authentication scaffolding, project-wide README, backend integration breadcrumbs.
- **2025-11-01** — Staff/Branch/Client menus with placeholder datasets and layout primitives.
- **2025-10-31** — React/Vite bootstrap with documented components.

## Roles & Contributors
- **Front-End Lead:** Alex Kachur — https://github.com/AlexKachur98
- **Back-End Lead:** Michael Goodie — https://github.com/gidsola
- **Project Manager:** Harkaran Singh Dhillon — https://github.com/Hdhillon2000

## Next Milestones
1. Property search with saved filters and analytics
2. Lead routing system for inquiries and tour bookings
3. Email notification integration
4. Production deployment configuration

---

*May your code be clean and your pancakes fluffy!* 🥞
