# 🐳 Docker Setup Guide: Acquisitions API

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Shell Script](https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white)

This document provides a comprehensive guide to the Docker-based development and production workflows for the Acquisitions API.

## 🏗️ Architecture Overview

The application utilizes a containerized architecture to ensure consistency across environments.

- **Development:** Uses a dual-container setup with the Node.js application and a **Neon Local** proxy for database operations.
- **Production:** Uses a single optimized Node.js container that connects directly to a cloud-hosted Neon PostgreSQL database.

## 📋 Prerequisites

- **Docker Desktop** (latest version recommended)
- **Node.js 20.x** (for local development tasks)
- **Neon Account** (for production database)

## ⚙️ Initial Setup

1. **Environment Variables:**
   - Copy `env.example` to `.env.development` for local work.
   - Create `.env.production` for production deployments.
2. **Neon Local Directory:**
   The development setup requires a `.neon_local` directory to store ephemeral database state. This is automatically handled by the startup scripts but can be created manually:
   ```bash
   mkdir -p .neon_local
   ```

## 🚀 Development Workflow

The development environment is optimized for productivity with hot-reloading and a local database proxy.

### Starting Development

Run the following command to start the development environment:

```bash
npm run dev:docker
```

This script:

1. Verifies prerequisites.
2. Applies Drizzle migrations to the database.
3. Starts the `acquisitions-neon-local` container (database proxy).
4. Starts the `acquisitions-app-dev` container with volume mounting for hot-reloading.

### Accessing the App

- **API:** `http://localhost:3000`
- **Database:** `postgres://neon:npg@localhost:5432/neondb` (via proxy)

## 🚢 Production Deployment

Production uses an optimized, secure image.

### Starting Production

Run the following command:

```bash
npm run prod:docker
```

This script:

1. Builds the production image using the `production` stage of the Dockerfile.
2. Starts the container in detached mode (`-d`).
3. Runs database migrations against the production Neon instance.

## 🗄️ Database Management

We use **Drizzle ORM** for database management and migrations.

- **Generate Migrations:** `npm run db:generate`
- **Apply Migrations:** `npm run db:migrate`
- **Studio (GUI):** `npm run db:studio`

In development, migrations are applied to the local Neon proxy. In production, they are applied to the live cloud database.

## 🌐 Network Configuration

- **Development Network:** `acquisitions-dev` (bridge)
- **Production Network:** `acquisitions-prod` (bridge)

The application and database containers communicate within these isolated networks.

## 🔒 Security Considerations

1. **Non-Root User:** The Node.js application runs as a `nodejs` user (UID 1001) in both environments to minimize security risks.
2. **Multi-Stage Builds:** The Dockerfile uses multi-stage builds to keep the production image small and free of development dependencies.
3. **Environment Isolation:** Separate `.env` files for development and production prevent accidental configuration leaks.

## 🔍 Troubleshooting

- **Container won't start:** Check if the port (default 3000) is already in use.
- **Database connection failure:** Ensure `.env` files have the correct `DATABASE_URL`.
- **Permission issues:** If volume mounting fails on Linux, ensure the `logs` directory has appropriate permissions.

## 🧹 Cleanup Commands

- **Stop all containers:** `docker compose down`
- **Stop and remove volumes:** `docker compose down -v`
- **Remove dangling images:** `docker image prune`

## 📂 File Structure

```text
.
├── Dockerfile              # Multi-stage Docker build file
├── docker-compose.dev.yml  # Dev setup with Neon Local
├── docker-compose.prod.yml # Prod setup
├── scripts/
│   ├── dev.sh              # Startup script for development
│   └── prod.sh             # Startup script for production
├── .env.development        # Dev environment variables (ignored)
└── .env.production         # Prod environment variables (ignored)
```

## ✨ Best Practices

1. **Use Scripts:** Always use `npm run dev:docker` or `npm run prod:docker` instead of calling docker-compose directly to ensure migrations are applied.
2. **Environment Variables:** Never commit `.env.development` or `.env.production` to version control.
3. **Volume Mounting:** Only use volume mounting in development for hot-reloading. Production should use the baked-in code.

## ✅ Quick Start Checklist

- [ ] Docker is running.
- [ ] `.env.development` exists and is configured.
- [ ] Port 3000 is available.
- [ ] Execute `npm run dev:docker`.
- [ ] Verify health at `http://localhost:3000/health`.
