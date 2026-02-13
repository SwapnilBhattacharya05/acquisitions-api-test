import jwt from 'jsonwebtoken';
import logger from "#config/logger.js";

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

const JWT_EXPIRES_IN = '1d'; // Token expires in 1 day

// JWT consisting methods for verifying tokens
export const jwttoken = {
    // Sign a payload and return the token
    sign: (payload) => {
        try {
            return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
        } catch (e) {
            logger.error("Failed to authenticate token: ", e);
            throw new Error("Failed to authenticate token", { cause: e });
        }
    },
    // Verify the token and return the decoded payload if valid, otherwise throw an error
    verify: (token) => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (e) {
            logger.error("Failed to authenticate token: ", e);
            throw new Error("Failed to authenticate token", { cause: e });
        }
    },
}