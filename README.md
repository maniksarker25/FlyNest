# 📘 Mini School Management API

A **School Management REST API** built with **Express.js, TypeScript, Prisma, and PostgreSQL**.  
Implements authentication, role-based access control, and basic modules for managing students and classes.

---

## 🚀 Features

- **Authentication**
  - User signup & login with hashed passwords
  - JWT authentication (Access + Refresh tokens)
  - Role-based authorization (`admin`, `teacher`, `student`)
- **Student Module**
  - `POST /students` → Create student (Admin only)
  - `GET /students` → List students (Admin/Teacher)
  - `GET /students/:id` → Get student details
- **Class Module**
  - `POST /classes` → Create class (Admin only)
  - `POST /classes/:id/enroll` → Enroll student in class (Admin/Teacher)
  - `GET /classes/:id/students` → Get students of a class
- **Database**
  - PostgreSQL with Prisma ORM
  - Proper relations & indexing
- **Extras**
  - DTOs & validation (`class-validator`)
  - Protected routes with JWT & Role Guards
  - Error handling (`400`, `401`, `403`, `404`)
  - **Seed script** for dummy data
  - **Docker setup** with `docker-compose` for PostgreSQL
  - Pagination for students

---

## 🛠️ Tech Stack

- **Backend:** Express.js + TypeScript
- **Database:** PostgreSQL (via Docker)
- **ORM:** Prisma
- **Auth:** JWT (Access + Refresh)
- **Validation:** class-validator

---

## ✅ Prerequisites

- Node.js (LTS recommended)
- npm (or yarn/pnpm)
- Docker & Docker Compose
- Open ports: `5432` (Postgres), your API `PORT` (default `5000`)

---

## ⚙️ Installation & Setup

### 1) Clone the repo

```bash
git clone https://github.com/your-username/school-management-api.git
cd school-management-api
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

# Application

NODE_ENV=development
PORT=5000

# Database (matches docker-compose.yml)

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/school_db?schema=public"

# JWT Config

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

### 3) For Start and stop the database:

# Start DB in background

docker-compose up -d

# 4) Stop DB

```bash
docker-compose up -d
```

# 5) Stop and remove volumes (resets DB)

```bash
docker-compose down -v
```

### 6) Run Prisma migrations

```bash
npx prisma migrate dev

```

# 7) Generate Prisma client:

```bash
npx prisma generate

```

# 8) Seed the database (optional)

```bash
npm run seed

```

# 9) Start the server

```bash
npm run dev


```
