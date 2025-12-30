---

# 🏬 Store Rating & Management System

A **full-stack role-based web application** where users can rate stores, store owners manage their store profile, and admins manage users and stores — built with **React, Node.js, Express, MySQL, Sequelize, and JWT (Cookie-based Auth)**.

---

## 🚀 Features

### 👤 Authentication & Security

* JWT-based authentication
* **JWT stored in HTTP-only cookies** (secure)
* Role-based access control (RBAC)
* Password hashing with bcrypt
* Protected routes using middleware

---

### 🧑‍💼 Roles & Capabilities

#### 🔹 Admin

* Add / manage users
* Add / manage stores
* Assign **exactly one store per store owner**
* Switch between Users & Stores view
* View system statistics

#### 🔹 Store Owner

* Login securely
* View own store dashboard
* View customer ratings
* Update **store email after login**
* One owner → one store (strictly enforced)

#### 🔹 Normal User

* Browse stores (paginated)
* Search stores by name & address
* Rate stores (add / update rating)

---

## 🧱 Tech Stack

### Frontend

* React
* Tailwind CSS
* Axios
* Context API

### Backend

* Node.js
* Express.js
* Sequelize ORM
* MySQL
* JWT (cookie-based)
* bcrypt
* cookie-parser

### Database

* MySQL (external / cloud-supported)

---

## 🗂️ Project Structure

```
├── frontend/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── api/
│   └── styles/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
```

---

## 🔐 Authentication Flow (JWT + Cookies)

1. User logs in with email & password
2. Backend validates credentials
3. JWT is generated and stored in **HTTP-only cookie**
4. Browser auto-sends cookie on each request
5. Backend verifies token via middleware
6. Access is granted based on user role

---

## 🏗️ Database Design (Key Rule)

### ✅ One Store ⇄ One Store Owner (Mandatory)

```text
User (STORE_OWNER)
   └── id
        │
        ▼
Store
   └── ownerId (FK, UNIQUE)
```

* Store ownership enforced via foreign key
* No email-based linking
* DB-level integrity guaranteed

---

## ⚙️ Environment Variables

Create a `.env` file in `backend/`:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating_db
DB_PORT=3306

NODE_ENV=development
```

---

## ▶️ Running the App Locally

### 1️⃣ Backend

```bash
cd backend
npm install
npm start
```

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Highlights

### Auth

```
POST /api/auth/login
POST /api/auth/logout
```

### Admin

```
POST /api/admin/users
POST /api/admin/stores
GET  /api/admin/stats
```

### User

```
GET  /user/stores?page=&limit=&name=&address=
POST /user/ratings
PUT  /user/ratings
```

### Store Owner

```
GET /owner/dashboard
PUT /owner/store/email
```

---

## 🛡️ Security Best Practices Used

* HTTP-only cookies (XSS protection)
* Password hashing (bcrypt)
* No sensitive data inside JWT
* Role-based authorization
* Server-side pagination & search
* Foreign key enforcement at DB level

---

## ☁️ Deployment Notes

* Backend can be deployed on **Render**
* MySQL must be hosted externally (PlanetScale, Railway, RDS, etc.)
* Cookies work over HTTPS in production
* `withCredentials: true` enabled in Axios

---

## 🧪 Known Constraints

* One store per store owner (by design)
* Store email editable only by owner
* JWT expiry requires re-login

---

## 📈 Future Enhancements

* Refresh tokens
* Email verification for store email
* Audit logs for admin actions
* Store analytics dashboard
* Skeleton loaders & UI animations

---

## 👨‍💻 Author

Built as part of a **Hobby**, following **industry-standard architecture and security practices**.

---

## 📄 License

This project is for educational and assessment purposes.

---
