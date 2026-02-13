# Acquisitions API

![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Arcjet](https://img.shields.io/badge/Arcjet-5C2D91?style=for-the-badge&logo=arcjet&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

A secure RESTful API for User Management and Authentication, built with Node.js, Express, and Drizzle ORM.

## Features

- **Authentication:** Secure signup, sign-in, and sign-out with JWT.
- **Security:** Bot protection and rate limiting via Arcjet, secure headers with Helmet.
- **Validation:** Strict input validation using Zod.
- **Database:** Type-safe database operations with Drizzle ORM and PostgreSQL (Neon).

## Getting Started

### Prerequisites

- Docker Desktop
- Node.js 20.x

### Local Development (with Neon Local)

To start the application locally with a local database proxy:

1.  **Configure Environment:**
    ```bash
    cp env.example .env.development
    # Edit .env.development with your configuration
    ```

2.  **Start with Docker:**
    ```bash
    npm run dev:docker
    ```
    This will start the Node.js application (with hot-reload) and a Neon Local database proxy.

3.  **Access:**
    - API: `http://localhost:3000`
    - Health Check: `http://localhost:3000/health`

### Production Deployment

In production, the app connects directly to a cloud-hosted Neon database.

1.  **Configure Environment:**
    ```bash
    cp env.example .env.production
    # Edit .env.production with your production Neon credentials
    ```

2.  **Deploy with Docker:**
    ```bash
    npm run prod:docker
    ```

## Documentation

For detailed information, please refer to:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Deep dive into the system design.
- [DOCKER_SETUP.md](./DOCKER_SETUP.md) - Comprehensive guide on Docker workflows, database management, and troubleshooting.
