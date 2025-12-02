# Dream Home Real Estate — Architecture Documentation

## System Overview

Dream Home Real Estate is a full-stack web application for browsing and managing real estate listings. The system uses a decoupled architecture with a React SPA frontend and Express.js REST API backend.

```
┌─────────────────┐     HTTP/JSON      ┌─────────────────┐
│                 │ ◄────────────────► │                 │
│  React Client   │                    │  Express API    │
│  (Vite + SPA)   │                    │  (Node.js)      │
│                 │                    │                 │
└─────────────────┘                    └────────┬────────┘
                                                │
                                                │ mysql2/promise
                                                ▼
                                       ┌─────────────────┐
                                       │                 │
                                       │  MySQL 8        │
                                       │  Database       │
                                       │                 │
                                       └─────────────────┘
```

## Authentication Flow

### Login Sequence
```
1. User submits credentials → POST /api/auth/login
2. Server validates against database
3. Server generates JWT (ES512) with user data
4. JWT stored in httpOnly cookie (7-day expiry)
5. Client receives user object, stores in React context
```

### Session Validation
```
1. App loads → AuthProvider calls GET /api/auth/session
2. Server reads JWT from cookie, validates signature
3. Returns user data or 401 if invalid/expired
4. Client updates auth context accordingly
```

### Security Features
- **Algorithm**: ES512 (ECDSA with P-521 curve)
- **Storage**: httpOnly cookies (XSS protection)
- **Expiry**: 7-day token lifetime
- **CORS**: Configured for allowed origins only

## API Reference

### Authentication

| Endpoint | Method | Body | Response |
|----------|--------|------|----------|
| `/api/auth/register` | POST | `{ email, password, name }` | `{ user }` |
| `/api/auth/login` | POST | `{ email, password }` | `{ user }` |
| `/api/auth/logout` | POST | — | `{ message }` |
| `/api/auth/session` | GET | — | `{ user }` or 401 |

### Properties

| Endpoint | Method | Query Params | Response |
|----------|--------|--------------|----------|
| `/api/properties` | GET | `status`, `beds`, `baths`, `minPrice`, `maxPrice` | `[Property]` |
| `/api/properties/:id` | GET | — | `Property` |

### Showings

| Endpoint | Method | Auth | Response |
|----------|--------|------|----------|
| `/api/showings/user` | GET | User | User's scheduled showings |
| `/api/showings` | GET | Admin | All showings |
| `/api/showings` | POST | User | Create showing request |

### Inquiries

| Endpoint | Method | Auth | Response |
|----------|--------|------|----------|
| `/api/inquiries/user` | GET | User | User's inquiries |
| `/api/inquiries` | GET | Admin | All inquiries |
| `/api/inquiries` | POST | User | Create inquiry |

## Database Schema

### Core Tables

**users**
| Column | Type | Description |
|--------|------|-------------|
| user_id | INT | Primary key |
| email | VARCHAR(255) | Unique, login identifier |
| password_hash | VARCHAR(255) | bcrypt hashed password |
| name | VARCHAR(255) | Display name |
| role | ENUM('user', 'admin') | Access level |
| created_at | TIMESTAMP | Registration date |

**properties**
| Column | Type | Description |
|--------|------|-------------|
| property_id | INT | Primary key |
| title | VARCHAR(255) | Listing title |
| address | VARCHAR(255) | Full address |
| price | DECIMAL(12,2) | Listing price |
| beds | INT | Bedroom count |
| baths | INT | Bathroom count |
| area | VARCHAR(50) | Square footage |
| status | VARCHAR(50) | Listing status |
| type | VARCHAR(50) | Property type |
| hero_image | VARCHAR(255) | Image URL |

**showings**
| Column | Type | Description |
|--------|------|-------------|
| showing_id | INT | Primary key |
| user_id | INT | FK → users |
| property_id | INT | FK → properties |
| scheduled_at | DATETIME | Showing date/time |
| status | VARCHAR(50) | Pending/Confirmed/Cancelled |

**inquiries**
| Column | Type | Description |
|--------|------|-------------|
| inquiry_id | INT | Primary key |
| user_id | INT | FK → users |
| property_id | INT | FK → properties |
| message | TEXT | Inquiry content |
| created_at | TIMESTAMP | Submission date |

## Environment Variables

### Server (.env)
```bash
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=dreamhome

# Authentication
JWT_PRIVATE_KEY=your_es512_private_key
JWT_PUBLIC_KEY=your_es512_public_key
JWT_EXPIRY=7d

# Server
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Client (.env)
```bash
VITE_API_URL=http://localhost:3000
```

## File Organization

### Backend (`server/src/`)
```
routes/
  auth.js          # Authentication endpoints
  properties.js    # Property CRUD
  showings.js      # Showing management
  inquiries.js     # Inquiry management
  api_master.js    # Route aggregation

mysql/
  connection.js    # Database pool
  queries.js       # SQL query functions
```

### Frontend (`client/src/`)
```
components/
  auth/            # AuthProvider, ProtectedRoute
  layout/          # Header, Footer
  ui/              # Button, Card, Logo, Icons

pages/
  Home.jsx         # Landing page
  PropertyList.jsx # Listing grid with filters
  PropertyDetails.jsx
  Login.jsx
  Register.jsx
  StaffMenu.jsx
  BranchMenu.jsx
  ClientMenu.jsx

styles/
  global.css       # Tailwind config + custom theme

utils/
  navigation.js    # Route metadata
  properties.js    # Placeholder data
```

## Development Workflow

### Running Locally
```bash
# Install all dependencies
npm install

# Start full stack (frontend + backend)
npm run dev

# Frontend only (http://localhost:5173)
npm run dev --workspace=client

# Backend only (http://localhost:3000)
npm run dev --workspace=server
```

### Building for Production
```bash
# Build frontend static assets
npm run build

# Start production server
npm start
```

## Contributing
1. Create feature branch from `main`
2. Follow existing code style and documentation headers
3. Test at mobile, tablet, and desktop breakpoints
4. Submit PR with description of changes
