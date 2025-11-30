/**
 * Form validation schemas using Zod
 */

import { z } from 'zod';

// Login schema
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Signup schema
export const signupSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password must be less than 100 characters'),
});

export type SignupFormData = z.infer<typeof signupSchema>;

// Todo schema
export const todoSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .max(200, 'Title must be less than 200 characters'),
    description: z
        .string()
        .max(1000, 'Description must be less than 1000 characters')
        .optional(),
    category: z.enum(['work', 'personal', 'study', 'shopping', 'other']),
    priority: z.enum(['low', 'medium', 'high']),
    dueDate: z.string().optional(),
});

export type TodoFormData = z.infer<typeof todoSchema>;

// Profile update schema
export const profileSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
