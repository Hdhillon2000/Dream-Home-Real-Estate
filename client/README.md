# Dream Home Real Estate — Front-End

## Overview
Dream Home Real Estate is a React + Vite interface for a full-stack real estate portal. The application features a custom design system with editorial typography, responsive layouts, and polished UI components for property listings, authentication, and administrative workflows.

## Tech Stack
| Package | Version | Purpose |
|---------|---------|---------|
| React | 19 | UI framework |
| Vite | 7 | Build tool and dev server |
| React Router | 7 | SPA navigation |
| Tailwind CSS | 4 | Utility-first styling |
| ESLint | 9 | Code linting |

## Getting Started
```bash
npm install
npm run dev
```
The dev server runs on http://localhost:5173. API requests proxy to Express at http://localhost:3000.

## Project Structure
```
client/
  src/
    components/
      auth/          # AuthProvider, ProtectedRoute
      layout/        # Header, Footer
      ui/            # Button, Card, Logo, Icons
    pages/           # Route-aligned screens
    styles/          # global.css (Tailwind + custom theme)
    utils/           # Navigation metadata, API helpers
  public/
    images/          # Property images, logo, hero background
```

## Design System

### Typography
Fonts loaded via Google Fonts in `styles/global.css`:
- **Headings**: Fraunces (variable serif with optical sizing)
- **Body**: Plus Jakarta Sans (geometric sans-serif)

### Color Palette
```css
/* Primary */
--color-sea: #004d49       /* Dark teal - headers, CTAs */
--color-deepsea: #1c4044   /* Darker teal - text, accents */
--color-forest: #068466    /* Green - primary buttons, links */
--color-forestdark: #055D47

/* Accents */
--color-gold: #c9a227      /* Featured badges */
--color-coral: #e07a5f     /* New listing badges */
--color-midnight: #0d1f22  /* Dark backgrounds */

/* Neutrals */
--color-pearl: #f9f7f3     /* Off-white backgrounds */
--color-fog: #ecf5f1       /* Light green tint */
--color-pampas: #f3f1ec    /* Warm gray */
--color-borderGrey: #e5e5e5
--color-textGrey: #75898a
```

### Components

**Button** (`components/ui/Button.jsx`)
- Variants: `forest`, `sea`, `outline`, `outline-light`, `ghost`, `gold`
- Sizes: `sm`, `md`, `lg`
- Features: Link support, icons, hover scale, focus ring

**Card** (`components/ui/Card.jsx`)
- Variants: `white`, `fog`, `pearl`
- Features: Hover shadow, optional border, gradient option

**Header** (`components/layout/Header.jsx`)
- Fixed position with scroll-aware styling
- Backdrop blur on scroll
- Mobile hamburger menu with slide animation

**Footer** (`components/layout/Footer.jsx`)
- Multi-column layout with navigation links
- Social icons and copyright

### Animations
Defined in `styles/global.css`:
```css
.animate-fade-in-up    /* Fade in from below */
.animate-scale-in      /* Scale up from 95% */
.animate-slide-in-right /* Slide in from right */

/* Stagger delays */
.delay-100, .delay-200, .delay-300, .delay-400
```

## API Integration
The front-end communicates with Express backend routes:

| Feature | Endpoint | Component |
|---------|----------|-----------|
| Auth | `/api/auth/*` | AuthProvider.jsx |
| Properties | `/api/properties` | PropertyList.jsx |
| Property Details | `/api/properties/:id` | PropertyDetails.jsx |
| Showings | `/api/showings/*` | ShowingsAdmin.jsx |
| Inquiries | `/api/inquiries/*` | InquiriesAdmin.jsx |

## Authentication
- `AuthProvider` wraps the app and provides `useAuth()` hook
- JWT stored in httpOnly cookies (handled by backend)
- Session validated on app load via `/api/auth/session`
- Role-based rendering for admin features

## Change Log
- **2025-12-02** — Full frontend redesign: complete style overhaul, Google Fonts (Fraunces, Plus Jakarta Sans), accent colors (gold, coral, midnight), animation system, enhanced Button/Card/Header components. Dead code cleanup, CSS bug fixes.
- **2025-12-01** — Full frontend and style redesign with new design system components (Button, Card, Header, Footer), Tailwind CSS 4 integration, layout refactor.
- **2025-11-03** — Property listing + detail pages, placeholder data, global styles.
- **2025-11-03** — Login/register scaffolding, auth cards on dashboard.
- **2025-11-01** — Staff, branch, and client menus with placeholder data.
- **2025-10-31** — Initial Vite bootstrap with React Router.

## Developer Notes
- Follow inline `TODO (Backend Team)` comments for integration points
- Maintain documentation headers (`@file`, `@author`, `@since`, `@purpose`)
- Use existing design system components rather than creating new ones
- Test responsive behavior at mobile (375px), tablet (768px), and desktop (1280px+)
