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
