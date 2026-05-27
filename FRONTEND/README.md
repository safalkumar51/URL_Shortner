# URL Shortener — Frontend

React single-page application for the URL Shortener project. Users can register, log in, shorten URLs, and manage links from a dashboard with live click analytics.

## Tech Stack

- **React 19** — UI library
- **Vite 6** — build tool and dev server
- **Tailwind CSS v4** — styling (slate/rose theme)
- **TanStack Router** — file-based routing with route guards
- **TanStack Query** — server state, caching, auto-refetch
- **Redux Toolkit** — client auth state
- **Axios** — HTTP client with credentials

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running (see [../BACKEND/README.md](../BACKEND/README.md))

### Installation

```bash
cd FRONTEND
npm install
```

### Environment Variables

Create `.env` in the `FRONTEND` folder:

```env
VITE_API_URL=http://localhost:3000
```

For production, set this to your deployed backend URL (no trailing slash required; the app normalizes it).

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── api/
│   ├── shortUrl.api.js    # Create short URL
│   └── user.api.js        # Auth + fetch user URLs
├── components/
│   ├── LoginForm.jsx
│   ├── RegisterForm.jsx
│   ├── NavBar.jsx
│   ├── UrlForm.jsx        # Shorten URL form
│   └── UserUrl.jsx        # Links table + click counts
├── pages/
│   ├── HomePage.jsx       # Landing + shorten (auth required)
│   ├── AuthPage.jsx       # Login / register tabs
│   └── DashboardPage.jsx  # Create + manage URLs
├── routing/
│   ├── routeTree.js
│   ├── homepage.js
│   ├── auth.route.js
│   └── dashboard.js       # Protected route
├── store/
│   ├── store.js
│   └── slice/authSlice.js
├── utils/
│   ├── axiosInstance.js   # Axios + error interceptor
│   └── helper.js          # Auth check for route guards
├── index.css              # Tailwind + theme variables
├── main.jsx               # App entry + providers
└── RootLayout.jsx         # Navbar + outlet
```

## Routes

| Path | Page | Access |
|------|------|--------|
| `/` | Home | Public (shortening requires login) |
| `/auth` | Login / Register | Public |
| `/dashboard` | Dashboard | Protected (`checkAuth`) |

Unauthenticated users hitting `/dashboard` are redirected to `/auth`.

## State Management

### Redux (auth)

- `isAuthenticated` — whether the user is logged in
- `user` — current user object (name, email, etc.)
- Actions: `login`, `logout`

Auth cookie is sent automatically via `axiosInstance` (`withCredentials: true`).

### React Query

- Query key: `['userUrls']` — list of user's shortened URLs
- Refetches every **30 seconds** on the dashboard
- Invalidated after creating a new short URL

## API Integration

All requests go through `src/utils/axiosInstance.js`:

- Base URL: `VITE_API_URL` or `http://localhost:3000`
- Cookies included for session auth
- Errors normalized to `{ message, status, data }`

| Function | Endpoint | Method |
|----------|----------|--------|
| `loginUser` | `/api/auth/login` | POST |
| `registerUser` | `/api/auth/register` | POST |
| `logoutUser` | `/api/auth/logout` | GET |
| `getCurrentUser` | `/api/auth/me` | GET |
| `getAllUserUrls` | `/api/user/urls` | POST |
| `createShortUrl` | `/api/create` | POST |

## Key UI Features

- **UrlForm** — long URL input, optional custom slug, copy-to-clipboard for result
- **UserUrl** — table of links with original URL, short URL, click badge, copy action
- **AuthPage** — tabbed login/register with inline validation errors from API
- Responsive layout with Tailwind; rose/red accent on slate background

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Deployment

The frontend is configured for deployment on **Vercel**. Set `VITE_API_URL` in the Vercel project environment to point at your production backend.

Ensure the backend CORS `origin` includes your Vercel URL (already configured for `https://url-shortner-snowy-eight.vercel.app` in the backend).

## Related

- [Root README](../README.md)
- [Backend README](../BACKEND/README.md)
