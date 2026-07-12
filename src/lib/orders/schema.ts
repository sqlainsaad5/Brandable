import { z } from "zod";
import { PAKISTAN_CITIES } from "./types";

/** Pakistani mobile: 03XXXXXXXXX (11 digits) or +923XXXXXXXXX */
const phoneRegex = /^(03\d{9}|\+923\d{9})$/;

export const checkoutSchema = z.object({
  customer_name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Name is too long."),
  customer_phone: z
    .string()
    .trim()
    .regex(
      phoneRegex,
      "Enter a valid Pakistani number (e.g. 03XXXXXXXXX)."
    ),
  customer_address: z
    .string()
    .trim()
    .min(8, "Please enter a complete address.")
    .max(500, "Address is too long."),
  customer_city: z
    .string()
    .trim()
    .min(2, "Please select or enter your city.")
    .max(80, "City name is too long."),
  notes: z
    .string()
    .trim()
    .max(500, "Notes are too long.")
    .optional()
    .or(z.literal("")),
  /** Honeypot — must stay empty. Bots that fill every field get rejected. */
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export const orderItemSchema = z.object({
  product_id: z.string().trim().min(1).max(80),
  name: z.string().trim().min(1).max(200),
  price: z.number().finite().nonnegative().max(1_000_000),
  quantity: z.number().int().min(1).max(20),
  size: z.string().trim().max(40).optional(),
  color: z.string().trim().max(40).optional(),
  image: z.string().trim().max(2000).optional(),
});

export const placeOrderPayloadSchema = checkoutSchema.extend({
  items: z.array(orderItemSchema).min(1).max(50),
  subtotal: z.number().finite().nonnegative().max(50_000_000),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export { PAKISTAN_CITIES };
