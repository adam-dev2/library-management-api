# 📚 Library Management System API

A fully featured RESTful API for managing a library's core operations including books, users, and loan records. Built using Node.js, Express.js, and MongoDB, following a scalable service-controller architecture.

## 🚀 Features

- 📘 Book Management (Add, Update, Delete, List)
- 👤 User Management (Register, Login, Role-based Access Control)
- 🔁 Loan Management (Issue, Return, Track)
- ✅ JWT Authentication & Authorization (Admin / User)
- 🧪 Postman Tested Endpoints
- 📦 Modular codebase with clean service-controller separation
- 📊 MongoDB Aggregations for loan history and book availability

## 📂 Folder Structure

```

.
├── controllers
├── models
├── routes
├── services
├── middlewares
├── utils
├── config
├── .env.example
└── server.js

````

## Authentication

- **Login/Register** endpoints return a JWT token.
- **Protected Routes** require a valid token.
- **Role-based access** differentiates Admin and User capabilities.

## API Testing

- Fully tested using Postman
- Supports CRUD operations for all major entities
- Includes sample payloads for quick testing

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (JSON Web Token)
- **Validation:** Express Validator
- **Dev Tools:** Nodemon, dotenv, Postman

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/library-management-api.git
````

2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file using `.env.example` as a reference.
4. Start the server:
   ```bash
   npm run dev
   ```

## Example Endpoints

* `POST /api/auth/register` - User Registration
* `POST /api/auth/login` - User Login
* `GET /api/books` - List All Books
* `POST /api/books` - Add Book (Admin only)
* `POST /api/loans/issue` - Issue a Book
* `POST /api/loans/return` - Return a Book

## Notes

* Supports 25+ API endpoints with clean error handling
* Easily extendable for search, pagination, or analytics
* Built for scalability and production-readiness

---

**Feel free to fork, extend, or integrate into your own systems.**
PRs and suggestions are welcome!

