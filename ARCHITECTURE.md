# 🏗️ Codebase Architecture Explanation: Acquisitions API

![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

### 1. 🖼️ Identify the Big Picture

- **Project Type:** This is a **RESTful API** built with Node.js and Express.
- **Problem it Solves:** It provides a secure backend for **User Management and Authentication**. It handles user registration, login, logout, and profile management while incorporating modern security practices like rate limiting and bot protection.

---

### 2. 🏛️ Core Architecture

The project follows a **Layered Architecture** (often referred to as a "Service-Layer" or "Controller-Service-Repository" pattern). This separates concerns, making the code easier to test and maintain.

- **Structure:**
  - **Entry Point:** `src/index.js` (loads environment) -> `src/server.js` (starts the server) -> `src/app.js` (configures the app).
  - **Routing Layer:** `src/routes/` - Defines API endpoints and maps them to controllers.
  - **Controller Layer:** `src/controllers/` - Handles incoming HTTP requests, validates input, and delegates logic to services.
  - **Service Layer:** `src/services/` - Contains the "heavy lifting" or business logic (e.g., password hashing, database interactions).
  - **Data Layer:** `src/models/` - Defines the database schema using Drizzle ORM.
  - **Configuration:** `src/config/` - Centralized setup for the database, logger, and security tools.

---

### 3. 🧩 Key Components

- **Routes (`src/routes/`):** Organizes endpoints by resource (e.g., `auth.route.js`, `users.route.js`).
- **Controllers (`src/controllers/`):** Manages the request/response lifecycle. It uses **Zod** for schema validation before any processing begins.
- **Services (`src/services/`):** Pure logic functions that interact with the database. This layer ensures that business rules are consistent across different controllers.
- **Models (`src/models/`):** Uses **Drizzle ORM** to define PostgreSQL tables (like the `users` table) with type safety.
- **Security Middleware (`src/middleware/`):** Includes `security.middleware.js` which integrates **Arcjet** for bot detection and rate limiting, and `auth.middleware.js` for JWT-based session validation.

---

### 4. 🔄 Data Flow & Communication

Data flows linearly through the system:

1.  **Request:** Client sends an HTTP request (e.g., POST `/api/auth/signup`).
2.  **Middleware:** The request passes through global middleware (Helmet, CORS, Morgan) and security middleware (Arcjet).
3.  **Routing:** Express routes the request to the specific controller method.
4.  **Validation:** The controller validates the request body using a Zod schema.
5.  **Service:** The controller calls a service function (e.g., `createUser`).
6.  **Database:** The service uses Drizzle ORM to execute a query against the PostgreSQL database.
7.  **Response:** The service returns data to the controller, which then sends a JSON response back to the client.

---

### 5. 🛠️ Tech Stack & Dependencies

- **Framework:** `Express 5.x` (Web framework).
- **ORM:** `Drizzle ORM` (Type-safe, lightweight database tool).
- **Database:** `PostgreSQL` (via Neon Serverless driver).
- **Security:**
  - `Arcjet`: For rate limiting and bot protection.
  - `Helmet`: For securing HTTP headers.
  - `jsonwebtoken (JWT)`: For stateless authentication.
  - `bcrypt`: For secure password hashing.
- **Validation:** `Zod`: For schema-based validation.
- **Logging:** `Winston` & `Morgan`: For structured and HTTP request logging.

---

### 6. ⚡ Execution Flow (Example: User Signup)

Here is a step-by-step walk-through of a **Signup** workflow:

```text
[Client] --- POST /api/auth/signup ---> [Express App]
                                             |
                                  [Security Middleware (Arcjet)]
                                     (Bot check? Rate limited?)
                                             |
                                    [Auth Controller]
                                     (Zod: Validate name/email)
                                             |
                                     [Auth Service]
                                     (Bcrypt: Hash Password)
                                             |
                                     [Drizzle ORM] --- INSERT INTO users ---> [PostgreSQL]
                                             |
                                    [Auth Controller]
                                     (JWT: Sign Token)
                                             |
[Client] <--- 201 Created (JSON + Cookie) --- [Response]
```

---

### 7. ⚖️ Strengths & Tradeoffs

- **Strengths:**
  - **Security First:** Integrated bot protection and rate limiting out of the box.
  - **Type Safety:** Use of Drizzle ORM and Zod provides great developer experience and reduces runtime errors.
  - **Separation of Concerns:** Clear boundaries between layers make unit testing straightforward.
- **Tradeoffs:**
  - **Complexity for Small Tasks:** For a very simple app, the 4-layer structure (Route -> Controller -> Service -> Model) might feel like "boilerplate" heavy.
  - **Statelessness:** Using JWTs in cookies is secure but requires careful handling for token revocation (logout is handled by clearing the cookie).

---

### 8. 📝 Final Summary

The **Acquisitions API** is a robust, security-focused Node.js backend utilizing a layered MVC-like architecture. It leverages **Drizzle ORM** for type-safe database operations and **Arcjet** for advanced traffic protection, ensuring a scalable and maintainable foundation for user-centric applications.
