### Codebase Architecture Overview: Acquisitions API

This project is a modern **Node.js REST API** built with **Express.js**, designed to handle user authentication and management (referred to as the "Acquisitions API"). It follows a **layered architecture** pattern, ensuring a clean separation of concerns between HTTP handling, business logic, and data persistence.

---

### 1. The Big Picture

- **Type:** Backend REST API.
- **Problem it Solves:** Provides a secure and scalable way to manage user registrations, logins, and authentication using JWT (JSON Web Tokens) and secure cookie handling.

---

### 2. Core Architecture

The system uses a **Layered (n-tier) Architecture**, which organizes code into functional layers:

- **Entry Point:** `src/index.js` and `src/server.js` initialize the environment and start the HTTP server.
- **App Configuration:** `src/app.js` sets up middleware (security, logging, parsing).
- **Routing Layer:** `src/routes/` defines the API endpoints and maps them to controllers.
- **Controller Layer:** `src/controllers/` handles incoming HTTP requests, validates input, and calls services.
- **Service Layer:** `src/services/` contains the core business logic (e.g., password hashing, user creation).
- **Data Access Layer (Models):** `src/models/` and `src/config/database.js` define the schema and handle database interactions using **Drizzle ORM**.

---

### 3. Key Components

- **Controllers (`auth.controller.js`):** Acts as the "manager." It extracts data from requests, triggers validation, and sends the final JSON response.
- **Services (`auth.service.js`):** The "brain" of the app. It doesn't care about HTTP; it only cares about logic, like "How do I create a user in the DB?" or "Is this password correct?".
- **Validations (`auth.validation.js`):** Uses **Zod** to ensure that incoming data (like emails or passwords) meets specific criteria before any logic is executed.
- **Utilities (`utils/`):** Small, reusable helpers for JWT signing, cookie management, and error formatting.
- **Database Config:** Connects to a **Neon (PostgreSQL)** database using Drizzle ORM for type-safe queries.

---

### 4. Data Flow & Communication

Data flows linearly through the system:

1.  **Request:** User sends a POST request with JSON data.
2.  **Middleware:** Security headers (Helmet) and logging (Morgan) are applied.
3.  **Route:** The request is directed to the specific controller function.
4.  **Validation:** The controller uses Zod to "gatekeep" the data.
5.  **Service:** The controller calls a service function to perform the task.
6.  **Database:** The service interacts with the DB via Drizzle ORM.
7.  **Response:** The service returns data to the controller, which signs a JWT, sets a cookie, and sends a success response.

---

### 5. Tech Stack

| Technology      | Role          | Why it's used                                                                  |
| :-------------- | :------------ | :----------------------------------------------------------------------------- |
| **Express.js**  | Web Framework | Lightweight and flexible for building APIs.                                    |
| **Drizzle ORM** | ORM           | Provides TypeScript-like type safety for SQL queries.                          |
| **Neon**        | Database      | Serverless PostgreSQL for easy scaling.                                        |
| **Zod**         | Validation    | Schema-based validation that prevents "garbage data" from entering the system. |
| **Winston**     | Logging       | Professional logging to both console and files (`logs/error.log`).             |
| **Bcrypt**      | Security      | Securely hashes passwords before storing them.                                 |

---

### 6. Execution Flow (Example: User Sign-Up)

```ascii
[ Client ]
    |  (POST /api/auth/sign-up)
    v
[ app.js ] -> Middleware (CORS, Helmet, Body Parser)
    |
[ auth.route.js ] -> Matches route to signup()
    |
[ auth.controller.js ]
    |-- calls [ auth.validation.js ] (Check if email/pass are valid)
    |-- calls [ auth.service.js ] (createUser)
        |-- [ bcrypt ] (Hash Password)
        |-- [ database.js ] (INSERT into PostgreSQL)
    |-- calls [ jwt.js ] (Sign Token)
    |-- calls [ cookies.js ] (Set HTTP-only cookie)
    v
[ Client ] <- (201 Created + User Object)
```

---

### 7. Strengths & Tradeoffs

- **Strengths:**
  - **High Security:** Uses Helmet for headers, Bcrypt for passwords, and HTTP-only cookies for JWTs (preventing XSS).
  - **Modular:** Easy to test and maintain because logic is separated into layers.
  - **Type-Safe (ish):** Drizzle ORM and Zod provide great confidence in data structures.
- **Tradeoffs:**
  - **Complexity:** For a tiny app, this many folders might feel like "over-engineering," but it pays off as the project grows.

---

### 8. Final Summary

This is a **layered Node.js API** that prioritizes **security and maintainability**. It uses **Express** for routing, **Zod** for strict input validation, and **Drizzle ORM** for efficient database management, providing a robust foundation for user authentication and business logic.
