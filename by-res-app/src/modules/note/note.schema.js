import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional(),
});

export const updateNoteSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});
