# Express + Vite React App

A full-stack app with **Express.js** (backend) and **Vite + React** (frontend).

---

## Folder Structure
```
your-project/
├── client/               # Frontend (Vite + React)
│   ├── dist/             # Built static files (production)
│   ├── node_modules/     # Frontend dependencies
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── assets/       # Images, fonts, etc.
│   │   ├── css/          # CSS files
│   │   ├── pages/        # React pages (Home, Login, etc.)
│   │   ├── pages_master.jsx
│   │   ├── main.jsx      # Main entry point
│   │   ├── eslint.config.js
│   │   ├── index.html
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   └── vite.config.js
│   └── README.md
│
├── server/
│   ├── node_modules/     # Backend dependencies
│   ├── src/
│   │   ├── routes/
│   │   │   ├── api_master.js
│   │   │   ├── links.js
│   │   │   └── express.js # Main Express server
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
│
├── package-lock.json     # Root (if any)
├── package.json          # Root scripts (dev, build, start)
└── README.md             # Project root
```

---

## Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd your-project
```

### 2. Install Dependencies
```bash
# Install all dependencies (including root dev tools)
npm run install-dev
```
or
```bash
# Install only frontend and backend dependencies (no root dev tools)
npm run install-base
```

---

## Development

### Run in Development Mode
```bash
# From the root folder
npm run dev
```
- **Frontend**: Vite dev server at `http://localhost:3000`
- **API Proxy**: Frontend requests to `/api/*` are proxied to Express.

---

## Production

### Build and Run
```bash
# Build the frontend
npm run build

# Start the Express server (serves frontend + API)
npm start
```
- The app will be served at `http://localhost:3000`.

---

## API Endpoints
| Endpoint          | Method | Description               |
|-------------------|--------|---------------------------|
| `/api/links`      | GET    | Get a list of links.      |

---

## Scripts
| Script       | Description                                  |
|--------------|----------------------------------------------|
| `npm run dev`| Run frontend + backend in development.       |
| `npm run build`| Build the frontend for production.         |
| `npm start`  | Start the Express server in production mode. |
| `npm run install-base` | Install frontend and backend dependencies. |
| `npm run install-dev` | Install frontend, backend, and root dev dependencies. |

---

## Tech Stack
- **Frontend**: Vite, React
- **Backend**: Express.js, Node.js
- **Proxy**: Vite proxies `/api` requests to Express in development.
