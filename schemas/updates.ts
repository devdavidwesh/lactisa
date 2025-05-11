import { z } from 'zod';

export const UpdateFormSchema = z.object({
  content: z.string().min(1, 'Content is required').max(1000, 'Content is too long'),
  isImage: z.boolean().default(false),
}).refine(data => {
  if (data.isImage) {
    try {
      new URL(data.content);
      return true;
    } catch {
      return false;
    }
  }
  return true;
}, {
  message: 'Please provide a valid image URL',
  path: ['content'],
});