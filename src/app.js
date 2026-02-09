import express from 'express';
import logger from "#config/logger.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "#routes/auth.route.js";

const app = express();

app.use(helmet()); // For setting various HTTP headers to enhance security
app.use(cors());

app.use(express.json()); // For parsing json objects that are sent in the body of requests
app.use(express.urlencoded({extended: true})); // For parsing urlencoded data that is sent in the body of requests
app.use(cookieParser()); // For parsing cookies that are sent in the headers of requests

/**
 * For logging both in development and production environments
 * In development, morgan will log to the console, and in production, it will log to the file using our custom logger
 */
app.use(morgan("combined", {stream: {write: (message) => logger.info(message.trim())}}));

// Test Endpoint
app.get('/', (req, res) => {
    logger.info("Hello from Acquisitions API!"); // Log a message to indicate that the endpoint was hit
    res.status(200).send('Hello from Acquisitions!');
});

/**
 * Health and Readiness Checks
 * These endpoints later can be used by Kubernetes or any other orchestration tool to check the health and readiness of the application.
 */

// Health Check Endpoint
app.get('/health', (req, res) => res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
}))

// Readiness Check Endpoint
app.get("/api", (req, res) => res.status(200).json({status: "ok"}));


// Routes
app.use("/api/auth", authRoute); // /api/auth/sign-up, /api/auth/sign-in, etc.
export default app;
