import { jwttoken } from '#utils/jwt.js';
import { cookies } from '#utils/cookies.js';
import logger from '#config/logger.js';

export const authenticateToken = (req, res, next) => {
  try {
    const token = cookies.get(req, 'token');
    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication token missing',
      });
    }

    req.user = jwttoken.verify(token);
    next();
  } catch (e) {
    logger.error('Authentication error', e);
    return res
      .status(401)
      .json({ error: 'Unauthorized', message: 'Invalid or expired token' });
  }
};

export const requireRole = roles => {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: 'Unauthorized', message: 'Authentication required' });
    }

    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `Requires one of the following roles: ${allowedRoles.join(', ')}`,
      });
    }

    next();
  };
};
