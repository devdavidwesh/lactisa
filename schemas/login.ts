import z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email("Please provide a valid email address"),
    password: z.string(),
  });