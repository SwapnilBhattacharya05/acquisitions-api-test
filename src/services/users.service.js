import logger from '#config/logger.js';
import { db } from '#config/database.js';
import { users } from '#models/user.model.js';
import { eq } from 'drizzle-orm';

export const getAllUsers = async () => {
  try {
    return await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        created_at: users.createdAt,
        updated_at: users.updatedAt,
      })
      .from(users);
  } catch (e) {
    logger.error('Error getting users', e);
    throw new Error('Error getting users', { cause: e });
  }
};

export const getUserById = async id => {
  try {
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        created_at: users.createdAt,
        updated_at: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!user) {
      return null;
    }

    return user;
  } catch (e) {
    logger.error(`Error getting user by id: ${id}`, e);
    throw new Error('Error getting user', { cause: e });
  }
};

export const updateUser = async (id, updates) => {
  try {
    // Ensure user exists
    const existing = await getUserById(id);
    if (!existing) {
      throw new Error('User not found');
    }
    if (updates.email && updates.email !== existing.email) {
      const [emailExists] = await db
        .select()
        .from(users)
        .where(eq(users.email, updates.email))
        .limit(1);

      if (emailExists) {
        throw new Error('Email already exist');
      }
    }
    // Add updated_at timestamp
    const payload = {
      ...updates,
      updatedAt: new Date(),
    };

    const [updated] = await db
      .update(users)
      .set(payload)
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        created_at: users.createdAt,
        updated_at: users.updatedAt,
      });

    return updated;
  } catch (e) {
    logger.error('Error updating user', e);
    if (e.message === 'User not found' || e.message === 'Email already exist')
      throw e;
    throw new Error('Error updating user', { cause: e });
  }
};

export const deleteUser = async id => {
  try {
    // Ensure user exists first
    const existing = await getUserById(id);
    if (!existing) {
      throw new Error('User not found');
    }

    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
      });
    if (deletedUser) {
      return true;
    }
    return false;
  } catch (e) {
    logger.error('Error deleting user', e);
    if (e.message === 'User not found') throw e;
    throw new Error('Error deleting user', { cause: e });
  }
};
