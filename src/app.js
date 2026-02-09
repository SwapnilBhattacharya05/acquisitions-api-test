import express from 'express';
import logger from "#config/logger.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

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


app.get('/', (req, res) => {
    logger.info("Hello from Acquisitions API!"); // Log a message to indicate that the endpoint was hit
    res.status(200).send('Hello from Acquisitions!');
});

export default app;
