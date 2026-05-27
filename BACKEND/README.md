# URL Shortener — Backend

Express REST API for the URL Shortener project. Handles authentication, URL shortening, redirects with click tracking, and user link management.

## Tech Stack

- **Node.js** + **Express 5**
- **MongoDB** + **Mongoose 8**
- **JWT** — session tokens in httpOnly cookies
- **bcryptjs** — password hashing
- **Zod** — request body validation
- **NanoID** — random short URL generation
- **express-rate-limit** — API rate limiting
- **cookie-parser** + **CORS** — cross-origin auth

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local instance or MongoDB Atlas)

### Installation

```bash
cd BACKEND
npm install
```

### Environment Variables

Create `.env` in the `BACKEND` folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/urlshortener
JWT_SECRET=your_strong_secret_key
APP_URL=http://localhost:3000/
PORT=3000
NODE_ENV=development
```

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret for signing JWTs |
| `APP_URL` | Yes | Base URL prepended to short links in API responses |
| `PORT` | No | Server port (default: `3000`) |
| `NODE_ENV` | No | `production` enables secure cookies |

The app exits on startup if required env vars are missing.

### Development

```bash
npm run dev
```

Uses nodemon for auto-restart.

### Production

```bash
npm start
```

## Project Structure

```
BACKEND/
├── app.js                 # Express app entry, middleware, routes
└── src/
    ├── config/
    │   ├── config.js      # Cookie options
    │   └── monogo.config.js
    ├── controller/        # Request handlers
    ├── dao/               # Database access
    ├── middleware/
    │   ├── auth.middleware.js
    │   └── validate.middleware.js
    ├── models/            # Mongoose schemas
    ├── routes/            # Route definitions
    ├── services/          # Business logic
    ├── utils/             # JWT, NanoID, errors
    └── validators/        # Zod schemas
```

## API Reference

Base URL: `http://localhost:3000` (or your deployed host).

### Authentication

#### POST `/api/auth/register`

Register a new user. Sets `accessToken` cookie.

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Validation:**

- `name` — required, min 1 character
- `email` — valid email format
- `password` — min 6 characters

**Response:** `200` — `{ user, message: "register success" }`  
**Errors:** `400` validation, `409` user already exists

---

#### POST `/api/auth/login`

Log in an existing user. Sets `accessToken` cookie.

**Body:**

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response:** `200` — `{ user, message: "login success" }`  
**Errors:** `400` validation, `401` invalid credentials

---

#### POST `/api/auth/logout`

Clears the auth cookie.

**Response:** `200` — `{ message: "logout success" }`

---

#### GET `/api/auth/me`

Returns the current authenticated user. Requires `accessToken` cookie.

**Response:** `200` — `{ user }`  
**Errors:** `401` unauthorized

---

### URL Shortening

#### POST `/api/create`

Create a short URL. Requires authentication.

**Body:**

```json
{
  "url": "https://example.com/long-page",
  "slug": "my-link"
}
```

**Validation:**

- `url` — required, valid URL
- `slug` — optional; if omitted or empty, a 7-character NanoID is generated
- If provided: 3–30 characters, `[A-Za-z0-9_-]` only

**Response:** `200` — `{ shortUrl: "http://localhost:3000/abc1234" }`  
**Errors:** `400` validation, `401` unauthorized, conflict if custom slug exists

---

#### GET `/:id`

Redirect to the original URL and increment click count atomically.

**Response:** `302` redirect to `full_url`  
**Errors:** `500` if short URL not found

---

### User URLs

#### POST `/api/user/urls`

List all URLs created by the authenticated user.

**Response:** `200` — `{ message: "success", urls: [...] }`  
**Errors:** `401` unauthorized

Each URL object includes: `full_url`, `short_url`, `clicks`, `user`, `_id`.

---

### Health

#### GET `/health`

**Response:** `200` — `{ status: "ok" }`

> **Note:** Register this route before the catch-all `/:id` redirect in production deployments so `/health` is not treated as a short URL slug.

---

## Validation Middleware

All validated routes use `validateBody(schema)` from `src/middleware/validate.middleware.js`.

On failure:

```json
{
  "message": "Invalid email",
  "errors": [ /* Zod error details */ ]
}
```

Status: `400`.

## Security

| Feature | Implementation |
|---------|----------------|
| Password hashing | bcrypt (10 rounds) on save |
| Sessions | JWT in httpOnly cookie, 1-hour expiry |
| Rate limiting | 100 req / 15 min (global); 10 req / min on `/api/auth` |
| Body size | JSON limited to 10kb |
| CORS | Whitelisted origins with `credentials: true` |
| Password field | Excluded from queries by default (`select: false`) |

### Cookie options

- `httpOnly: true`
- `secure: true` in production
- `sameSite: None` (production) / `Lax` (development)

## Data Models

### User

- `name` (required)
- `email` (required, unique)
- `password` (required, hashed)
- `avatar` (optional, default Gravatar)

### Short URL

- `full_url` (required)
- `short_url` (required, unique, indexed)
- `clicks` (default: 0)
- `user` (ObjectId ref, optional)

## Error Handling

Custom errors via `src/utils/errorHandler.js`:

- `BadRequestError` — 400
- `UnauthorizedError` — 401
- `NotFoundError` — 404
- `ConflictError` — 409

Unhandled errors return `500` with a message.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon |
| `npm start` | Start with node |

## Related

- [Root README](../README.md)
- [Frontend README](../FRONTEND/README.md)
