# Himflax Information Technology — Full Stack Website

A production-grade IT company website with a dynamic Careers CMS and Admin Panel.

## Tech Stack

- **Backend:** Node.js 20, Express.js, MongoDB, Mongoose, JWT, Multer, Nodemailer
- **Frontend:** React 18, Vite, Tailwind CSS v3, Framer Motion, React Query
- **Admin Panel:** React 18, Vite, Tailwind CSS v3, Recharts

## Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm 9+

## Quick Start

### 1. Clone & Install

```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Install admin dependencies
cd ../admin && npm install
```

### 2. Environment Setup

Copy the example env file and fill in your values:

```bash
cd backend
cp .env.example .env
```

**Required `.env` variables:**

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | API server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/himflax` |
| `JWT_SECRET` | Secret key for JWT signing | *(set a strong random string)* |
| `JWT_EXPIRE` | JWT expiry duration | `7d` |
| `CORS_ORIGINS` | Allowed CORS origins (comma-separated) | `http://localhost:5173,http://localhost:5174` |
| `SMTP_HOST` | SMTP mail server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP email username | *(your email)* |
| `SMTP_PASS` | SMTP email password/app password | *(your password)* |
| `SMTP_FROM` | Sender email address | `noreply@himflax.com` |
| `MAX_FILE_SIZE` | Max upload file size in bytes | `5242880` (5MB) |

### 3. Seed Database

```bash
cd backend
npm run seed
```

This creates:
- **Admin user:** `admin@himflax.com` / `Admin@123`
- **5 sample job listings**

### 4. Run in Development

Open 3 terminal windows:

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev

# Terminal 3 — Admin
cd admin && npm run dev
```

### 5. Access the Apps

| App | URL |
|-----|-----|
| Frontend | http://localhost:5173 |
| Admin Panel | http://localhost:5174 |
| API | http://localhost:5000/api/v1 |
| API Health | http://localhost:5000/api/v1/health |

### 6. Admin Login

- **Email:** `admin@himflax.com`
- **Password:** `Admin@123`

## Production Build

```bash
# Build frontend
cd frontend && npm run build

# Build admin
cd ../admin && npm run build

# Start backend with PM2
cd ../backend
npx pm2 start ecosystem.config.js --env production
```

## API Endpoints

### Auth (`/api/v1/auth`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/login` | Public | Login with email/password |
| POST | `/logout` | Public | Clear auth cookie |
| GET | `/me` | Protected | Get current user |

### Jobs (`/api/v1/jobs`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | List active jobs (filterable) |
| GET | `/:id` | Public | Get single job |
| POST | `/` | Protected | Create job |
| PUT | `/:id` | Protected | Update job |
| PATCH | `/:id/toggle` | Protected | Toggle active status |
| DELETE | `/:id` | Protected | Soft delete job |
| GET | `/stats/overview` | Protected | Dashboard statistics |

### Applications (`/api/v1/applications`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Public | Submit application (multipart) |
| GET | `/` | Protected | List applications (filterable) |
| PATCH | `/:id/status` | Protected | Update application status |

### Contact (`/api/v1/contact`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Public | Submit contact form |

## Project Structure

```
himflax-web/
├── backend/          # Express API server
├── frontend/         # Public-facing React website
├── admin/            # Admin panel (separate Vite app)
└── README.md
```

## License

© Himflax Information Technology. All rights reserved.
# himflax
