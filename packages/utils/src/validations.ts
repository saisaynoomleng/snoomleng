import * as z from 'zod';
import { maximumImageSize } from './formatter';
import { ALLOWED_IMAGE_TYPES } from './types';

/**
 * Validate ID Params
 */
export const ParamsIDSchema = z.object({
  id: z.string(),
});

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

/**
 * Validate Branding Form Schema
 */
export const BrandingFormSchema = z.object({
  siteName: z.string().min(1, 'Site Name must have at least 1 character'),
  primaryLogoUrl: z.union([
    z
      .instanceof(File)
      .refine(
        (file) => file.size <= 1024 * 1024,
        'Image size cannot exceeds 1 MB',
      )
      .refine(
        (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
        'Only accept image file type',
      ),
    z.url(),
  ]),
  primaryLogoAlt: z
    .string()
    .min(1, 'Primary Logo Alternative text is required'),
  secondaryLogoUrl: z.union([
    z
      .instanceof(File)
      .refine(
        (file) => file.size <= 1024 * 1024,
        'Image size cannot exceeds 1 MB',
      )
      .refine(
        (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
        'Only accept image file type',
      ),
    z.url(),
  ]),
  secondaryLogoAlt: z
    .string()
    .min(1, 'Secondary Logo Alternative text is required'),
  socialLinks: z.array(
    z.object({
      _key: z.string().min(1, 'Key must have at least 1 character'),
      icon: z.string(),
      platform: z.string().min(1, 'Platform must have at least 1 character'),
      url: z.url('Must be a valid URL'),
    }),
  ),
  city: z.string().min(1, 'City must have at least 1 character'),
  email: z.email('Must be a valid email address'),
  gitHubURL: z.url('Must be a valid URL'),
  leetCodeURL: z.url('Must be a valid URL').optional(),
  linkedInUrl: z.url('Must be a valid URL'),
  state: z.string().min(1, 'State must have at least 1 character'),
  mode: z.array(z.string()),
  isAvailable: z.boolean().default(true),
});
/**
 * Validate Branding Form Input Schema
 */
export type BrandingFormInputSchema = z.input<typeof BrandingFormSchema>;
/**
 * Validate Branding Form Output Schema
 */
export const BrandingFormOutputSchema = BrandingFormSchema.omit({
  primaryLogoUrl: true,
  secondaryLogoUrl: true,
}).extend({
  primaryLogoUrl: z.url(),
  secondaryLogoUrl: z.url(),
});
export type BrandingFormOutputSchema = z.infer<typeof BrandingFormOutputSchema>;
