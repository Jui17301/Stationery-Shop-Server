import { z } from 'zod';

export const productValidationSchema = z.object({
  _id: z.string().optional(),

  name: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Product Name must start with a capital letter',
    }),

  brand: z.string().refine((value) => /^[A-Z]/.test(value), {
    message: 'Brand Name must start with a capital letter',
  }),

  price: z
    .number()
    .positive({ message: 'Product price must be a positive number' })
    .refine((val) => val > 0, { message: 'Please enter product price' }),

  category: z.enum(
    ['Writing', 'Office Supplies', 'Educational', 'Technology'],
    {
      message:
        'Category is incorrect. Valid categories are Writing, Office Supplies, Educational, Technology.',
    },
  ),

  description: z.string(),

  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer' })
    .positive({ message: 'Product quantity must be a positive number' }),

  inStock: z.boolean(),
});
