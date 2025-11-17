import { z } from 'zod';

export const productSchema = z.object({
  name_id: z.string().min(1, 'Product name (ID) is required'),
  name_en: z.string().min(1, 'Product name (EN) is required'),
  description_id: z.string().optional(),
  description_en: z.string().optional(),
  price_range: z.string().optional(),
  image: z.string().optional(),
});

export const contactSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
  whatsapp: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
});

export const locationSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  kawasan_id: z.string().optional(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
});

export const socialMediaSchema = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export const operatingHoursSchema = z.object({
  open_time: z.string(),
  close_time: z.string(),
  days: z.array(z.string()),
});

export const umkmFormSchema = z.object({
  business_name: z.string().min(1, 'Business name is required'),
  owner_name: z.string().min(1, 'Owner name is required'),
  category: z.enum(['Kerajinan', 'Kuliner', 'Fashion', 'Jasa', 'Lainnya']),
  description_id: z.string().min(10, 'Description (ID) must be at least 10 characters'),
  description_en: z.string().min(10, 'Description (EN) must be at least 10 characters'),
  products: z.array(productSchema).min(1, 'At least one product is required'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  featured_image: z.string().min(1, 'Featured image is required'),
  contact: contactSchema,
  location: locationSchema,
  social_media: socialMediaSchema,
  operating_hours: operatingHoursSchema.optional(),
  status: z.enum(['draft', 'published', 'archived']),
  featured: z.boolean().default(false),
  verified: z.boolean().default(false),
});

export type UMKMFormData = z.infer<typeof umkmFormSchema>;
