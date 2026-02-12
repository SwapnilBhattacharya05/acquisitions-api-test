import { z } from 'zod';

export const userIdSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: 'id must be a positive integer string' })
    .transform(val => parseInt(val, 10)),
});

export const updateUserSchema = z
  .object({
    name: z.string().min(1, 'name cannot be empty').optional(),
    email: z.email('invalid email').optional(),
    role: z.enum(['user', 'admin']).optional(),
  })
  .refine(data => Object.keys(data).length > 0, {
    message: 'At least one field (name, email, role) must be provided',
  });
