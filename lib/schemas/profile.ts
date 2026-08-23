import z from "zod";

export const nameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(255, "Name must be at most 255 characters"),
});

export type NameSchema = z.infer<typeof nameSchema>;

export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .max(255, "Username must be at most 255 characters"),
});

export type UsernameSchema = z.infer<typeof usernameSchema>;
