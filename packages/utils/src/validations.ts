import * as z from 'zod';
import { ALLOWED_IMAGE_TYPES } from './types.js';

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

/**
 * Validate Tech Stack Form Schema
 */
export const TechStackFormSchema = z.object({
  name: z.string().min(1, 'Name must have at least 1 character'),
  slug: z.string().min(1, 'Slug must have at least 1 character'),
  iconText: z.string().min(1, 'Tech Stack slug must have at least 1 character'),
  type: z.enum([
    'frontend',
    'backend',
    'ai',
    'tooling',
    'devops',
    'badge',
    'cloud-and-infrastructure',
  ]),
});
/**
 * Validate Tech Stack Form Input Schema
 */
export type TechStackFormInputSchema = z.input<typeof TechStackFormSchema>;
/**
 * Validate Tech Stack Form Output Schema
 */
export type TechstackFormOutputSchema = z.output<typeof TechStackFormSchema>;

/**
 * Validate Hero Form Schema
 */
export const HeroFormSchema = z.object({
  name: z.string().min(1, 'Name must have at least 1 character'),
  slug: z.string().min(1, 'Slug must have at least 1 character'),
  positions: z
    .array(
      z.object({
        value: z.string().min(1, 'Position must have at least 1 character'),
      }),
    )
    .min(1, 'At least 1 position is required'),
  title: z.string().min(1, 'Title must have at least 1 character'),
  body: z.array(z.any()),
  imageAssetId: z.string(),
  imageAlt: z.string().min(1, 'Image alternative text is required'),
  callToActions: z.array(
    z.object({
      _key: z.string().min(1, 'Required to genearate a page on the website'),
      href: z.string().min(1, 'Required to redirect to a page on the website'),
      label: z.string().min(1, 'Label must have at least 1 character'),
    }),
  ),
});
/**
 * Validate Hero Form Input Schema
 */
export type HeroFormInputSchema = z.input<typeof HeroFormSchema>;
/**
 * Validate Hero Form output Schema
 */
export type HeroFormOutputSchema = z.output<typeof HeroFormSchema>;

/**
 * Validate Sign Up Form Schema
 */
export const SignUpFormSchema = z.object({
  name: z.string().min(1, 'Name must have at least 1 character'),
  email: z.email('Must be a valid email address'),
  password: z
    .string()
    .min(8, 'Password must have at least 8 characters')
    .max(128, 'Password cannot exceeds 128 characters'),
  confirmPassword: z
    .string()
    .min(8, 'Password must have at least 8 characters')
    .max(128, 'Password cannot exceeds 128 characters')
    .optional(),
});
/**
 * Validate Sign Up Form Input Schema
 */
export type SignUpFormInputSchema = z.input<typeof SignUpFormSchema>;
/**
 * Validate Sign Up Form Output Schema
 */
export type SignUpFormOutputSchema = z.output<typeof SignUpFormSchema>;

/**
 * Validate Sign In Form Schema
 */
export const SignInFormSchema = z.object({
  email: z.email('Must be a valid email address'),
  password: z.string().min(8).max(128),
});
/**
 * Validate Sign In Form Input
 */
export type SignInFormInputSchema = z.input<typeof SignInFormSchema>;
/**
 * Validate Sign In Form Output
 */
export type SignInFormOutputSchema = z.output<typeof SignInFormSchema>;
