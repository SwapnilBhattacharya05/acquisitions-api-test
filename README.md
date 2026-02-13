# 🏗️ Acquisitions API

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle](https://img.shields.io/badge/drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Arcjet](https://img.shields.io/badge/Arcjet-5C2D91?style=for-the-badge&logo=arcjet&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

---

## 🚀 Introduction

**Acquisitions API** solves the core problem of secure user management in modern web applications. Instead of reinventing the wheel for every project, this API provides a solid foundation handling user registration, authentication, and profile management.

It goes beyond basic CRUD by incorporating advanced security measures like **Arcjet** for bot protection and rate limiting, ensuring your application is safe from abuse from day one. The architecture is designed to be modular and testable, following a layered approach that separates concerns effectively.

---

## 🛠 Tech Stack

Chose a modern, performance-oriented stack to ensure long-term maintainability and scalability.

| Technology | Purpose | Why chose it |
|------------|---------|-----------------|
| **Node.js** | Runtime Environment | Non-blocking I/O model perfect for scalable network applications. |
| **Express.js** | Web Framework | Minimalist, flexible, and robust set of features for web and mobile applications. |
| **PostgreSQL** | Database | The world's most advanced open source relational database. |
| **Drizzle ORM** | Data Access | Lightweight, type-safe, and developer-friendly ORM with zero dependencies. |
| **Neon** | Database Platform | Serverless PostgreSQL that scales with your traffic. |
| **Arcjet** | Security | Native rate limiting and bot protection integration. |
| **Zod** | Validation | TypeScript-first schema declaration and validation library. |
| **Docker** | Containerization | Ensures consistency across development and production environments. |

---

## ✨ Features

- **🔐 Robust Authentication**:
  - Secure User Registration and Login.
  - State-of-the-art password hashing using `bcrypt`.
  - JWT-based stateless authentication.
- **🛡️ Advanced Security**:
  - **Rate Limiting**: Prevents abuse by limiting repeated requests.
  - **Bot Protection**: Identifies and blocks malicious bots using Arcjet.
  - **Helmet**: Secures HTTP headers.
- **📐 Layered Architecture**:
  - Clean separation of concerns (Routes, Controllers, Services, Models).
  - Scalable and easy to maintain codebase.
- **⚡ Developer Experience**:
  - Hot-reloading in Docker development mode.
  - Type-safe database interactions with Drizzle.
  - Comprehensive logging with Winston and Morgan.

---

## 📂 Project Structure

The project follows a modular "Service-Layer" architecture:

```
src/
├── config/         # Centralized configuration (DB, Logger, etc.)
├── controllers/    # Request handlers & input validation
├── middleware/     # Express middleware (Auth, Security, Logging)
├── models/         # Database schema definitions (Drizzle)
├── routes/         # API Route definitions
├── services/       # Business logic layer
└── utils/          # Utility functions
```

---

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v20+ recommended)
- **Docker & Docker Compose**
- **PostgreSQL** (or a Neon account)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SwapnilBhattacharya05/acquisitions-api-test.git
   cd acquisitions-api-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Configuration

The application relies on environment variables. Please refer to the linked example files to set up your environment:

1. **General Template**: [env.example](./env.example)
2. **Development**: [env.development.example](./env.development.example) - Copy this to `.env.development` for local development.
   ```bash
   cp env.development.example .env.development
   ```
3. **Production**: [env.production.example](./env.production.example) - Copy this to `.env.production` for production deployment.
   ```bash
   cp env.production.example .env.production
   ```

**Key Variables:**
- `DATABASE_URL`: Your PostgreSQL connection string.
- `JWT_SECRET`: Secret key for signing tokens.
- `ARCJET_KEY`: Key for Arcjet security services.

### Running with Docker (Recommended)

Provided optimized scripts for running via Docker.

**Development Mode** (Hot-reloading + Local DB Proxy):
```bash
npm run dev:docker
```
*Access API at `http://localhost:3000`*

**Production Mode**:
```bash
npm run prod:docker
```

### Running Locally

If you prefer running without Docker:

1. Ensure your `.env` file is set up and database is reachable.
2. Run migrations:
   ```bash
   npm run db:migrate
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

Here are the primary endpoints available:

### Auth
- `POST /api/auth/signup` - Register a new user.
- `POST /api/auth/login` - Authenticate a user and receive a token.
- `POST /api/auth/logout` - Clear user session.

*Refer to the code in `src/routes` for a complete list of endpoints.*

---