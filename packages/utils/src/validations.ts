import * as z from 'zod';

/**
 * Validate Contact Form Schema
 */
export const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name must have at least 1 character'),
  email: z.email('Must be a valid email address'),
  subject: z.string().min(1, 'Subject must have at least 1 character'),
  message: z
    .string()
    .min(20, 'Message must have at least 20 characters')
    .max(3000, 'Message cannot exceeds 3000 characters'),
});
/**
 * Validate Contact Form Input Values
 */
export type InputContactFormSchema = z.input<typeof ContactFormSchema>;
/**
 * Validate Contact Form Output Values
 */
export type OutputContactFormSchema = z.output<typeof ContactFormSchema>;
