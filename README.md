# URL Shortener

A full-stack URL shortening application with user authentication, custom slugs, click tracking, and a responsive dashboard.

## Features

- Shorten long URLs with auto-generated or custom slugs
- Auto-generated links now use a Redis-backed global counter and base62 encoding instead of NanoID
- User registration and login with secure cookie-based sessions
- Personal dashboard to create and manage links
- Real-time click count tracking on redirect
- Input validation on both client and server
- Rate limiting and security middleware on the API
- Containerized with Docker and Docker Compose

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React 19, Vite, Tailwind CSS v4, Redux Toolkit, TanStack Router, TanStack Query, Axios |
| Backend | Node.js, Express 5, MongoDB, Mongoose, JWT, Zod, bcrypt, Redis, Base62 |
| Deployment | Docker Compose for local services, frontend on Vercel, backend API with CORS for production origin |

## Project Structure

```
UrlShortner/
├── FRONTEND/          # React SPA
│   ├── src/
│   │   ├── api/       # API client functions
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routing/
│   │   ├── store/
│   │   └── utils/
│   └── README.md
├── BACKEND/           # Express REST API
│   ├── src/
│   │   ├── controller/
│   │   ├── dao/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   ├── app.js
│   └── README.md
├── docker-compose.yml
└── README.md
```

## Quick Start

### Option 1: Docker Compose (recommended)

Prerequisites:

- Docker
- Docker Compose

Create the required environment files before starting the stack:

- [BACKEND/.env](./BACKEND/.env) with MongoDB, JWT, Redis, and app URL values
- [FRONTEND/.env](./FRONTEND/.env) with the Vite API URL

From the project root, run:

```bash
docker compose up --build
```

Services:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- MongoDB: localhost:27017
- Redis: localhost:6379

### Option 2: Local development

Prerequisites:

- Node.js 18+
- MongoDB (local or Atlas)
- Redis
- npm

#### 1. Backend

```bash
cd BACKEND
npm install
```

Create a `.env` file in `BACKEND/`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/urlshortener
JWT_SECRET=your_jwt_secret_here
APP_URL=http://localhost:3000/
PORT=3000
NODE_ENV=development
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

Start the server:

```bash
npm run dev
```

API runs at `http://localhost:3000`.

#### 2. Frontend

```bash
cd FRONTEND
npm install
```

Create a `.env` file in `FRONTEND/`:

```env
VITE_API_URL=http://localhost:3000
```

Start the dev server:

```bash
npm run dev
```

App runs at `http://localhost:5173`.

## API Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Log in |
| POST | `/api/auth/logout` | No | Log out |
| GET | `/api/auth/me` | Yes | Get current user |
| POST | `/api/create` | Yes | Create a short URL |
| POST | `/api/user/urls` | Yes | List user's URLs |
| GET | `/:id` | No | Redirect and increment clicks |
| GET | `/health` | No | Health check |

See [BACKEND/README.md](./BACKEND/README.md) for request/response details and validation rules.

## Architecture

```
┌─────────────┐     HTTP + cookies     ┌─────────────┐     Mongoose     ┌──────────┐
│   React     │ ◄────────────────────► │   Express   │ ◄──────────────► │ MongoDB  │
│   (Vite)    │                        │   REST API  │                  │          │
└─────────────┘                        └─────────────┘                  └──────────┘
```

- **Frontend**: SPA with protected routes, Redux auth state, React Query for server data
- **Backend**: Layered architecture (routes → controllers → services → DAO → models)
- **Auth**: JWT stored in httpOnly cookies (1-hour expiry)
- **Short URLs**: Custom slug or a Redis-backed base62 ID generated from a global counter; unique index on `short_url`

## Validation Summary

- **Register**: name required, valid email, password min 6 characters
- **Login**: valid email, password required
- **Create URL**: valid URL; optional slug (3–30 chars, alphanumeric, `-`, `_`); empty slug triggers a Redis-based short ID

## Scripts

| Location | Command | Description |
|----------|---------|-------------|
| BACKEND | `npm run dev` | Start API with nodemon |
| BACKEND | `npm start` | Start API (production) |
| FRONTEND | `npm run dev` | Start Vite dev server |
| FRONTEND | `npm run build` | Production build |
| FRONTEND | `npm run preview` | Preview production build |

## Documentation

- [Frontend README](./FRONTEND/README.md) — UI setup, routing, state management
- [Backend README](./BACKEND/README.md) — API reference, env vars, project layout

## License

ISC
