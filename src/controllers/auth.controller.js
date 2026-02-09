import logger from "#config/logger.js";
import {signInSchema, signupSchema} from "#validations/auth.validation.js";
import {formatValidationError} from "#utils/format.js";
import {authenticateUser, createUser} from "#services/auth.service.js";
import {jwttoken} from "#utils/jwt.js";
import {cookies} from "#utils/cookies.js";

export const signup = async (req, res, next) => {
    try {
        const validationResult = signupSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                error: 'Validation failed',
                details: formatValidationError(validationResult.error),
            });
        }

        const {name, email, password, role} = validationResult.data;

        const user = await createUser({name, email, password, role});

        const token = jwttoken.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        cookies.set(res, 'token', token);

        logger.info(`User registered successfully: ${email}`);
        res.status(201).json({
            message: 'User registered',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (e) {
        logger.error('Signup error', e);

        if (e.message === 'User with this email already exists') {
            return res.status(409).json({error: 'Email already exist'});
        }

        next(e);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const validatedResult = signInSchema.safeParse(req.body);

        if (!validatedResult.success) {
            return res.status(400).json({
                error: 'Validation failed',
                details: formatValidationError(validatedResult.error),
            });
        }
        const {email, password} = validatedResult.data;

        const user = await authenticateUser(email, password);

        const token = jwttoken.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        cookies.set(res, 'token', token);

        logger.info(`User signed in successfully: ${email}`);
        res.status(200).json({
            message: 'User signed in',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (e) {
        logger.error('Sign-in error', e);

        if (e.message === 'User not found' || e.message === 'Invalid password') {
            return res.status(401).json({error: 'Invalid credentials'});
        }
        next(e);
    }
};

export const signOut = (req, res, next) => {
    try {
        cookies.clear(res, 'token');
        logger.info('User signed out successfully');
        res.status(200).json({message: 'User signed out'});
    } catch (e) {
        logger.error('Sign-out error', e);
        next(e);
    }
};