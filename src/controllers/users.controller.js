import logger from '#config/logger.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '#services/users.service.js';
import {
  userIdSchema,
  updateUserSchema,
} from '#validations/users.validation.js';
import { formatValidationError } from '#utils/format.js';

export const fetchAllUsers = async (req, res, next) => {
  try {
    logger.info('Getting all users...');
    const allUsers = await getAllUsers();
    res.status(200).json({
      message: 'Successfully retrieved all Users',
      users: allUsers,
      count: allUsers.length,
    });
  } catch (e) {
    logger.error('Error fetching users', e);
    next(e);
  }
};

export const fetchUserById = async (req, res, next) => {
  try {
    logger.info(`Getting user by id: ${req.params.id}`);

    const validated = userIdSchema.safeParse({ id: req.params.id });
    if (!validated.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validated.error),
      });
    }

    const { id } = validated.data;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    logger.info(`User ${user.email} retrieved successfully`);
    res.status(200).json({ message: 'Successfully retrieved user', user });
  } catch (e) {
    logger.error(`Error fetching user by id: ${e.message}`);
    next(e);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    // Validate params id
    const idResult = userIdSchema.safeParse(req.params);
    if (!idResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(idResult.error),
      });
    }
    const { id } = idResult.data;

    // Validate body
    const bodyResult = updateUserSchema.safeParse(req.body);
    if (!bodyResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(bodyResult.error),
      });
    }

    const requester = req.user;

    // Only allow self-updates unless admin
    if (requester.role !== 'admin' && requester.id !== id) {
      return res
        .status(403)
        .json({
          error: 'Forbidden',
          message: 'You can only update your own profile',
        });
    }

    const updates = { ...bodyResult.data };

    // Only admin can change role
    if (updates.role && requester.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Forbidden', message: 'Only admin can change role' });
    }

    // Proceed with update
    const updated = await updateUser(id, updates);

    res
      .status(200)
      .json({ message: 'User updated successfully', user: updated });
  } catch (e) {
    logger.error('Error updating user', e);
    if (e.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }
    next(e);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    // Validate params id
    const idResult = userIdSchema.safeParse(req.params);
    if (!idResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(idResult.error),
      });
    }
    const { id } = idResult.data;
    await deleteUser(id);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (e) {
    logger.error('Error deleting user', e);
    if (e.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }
    next(e);
  }
};
