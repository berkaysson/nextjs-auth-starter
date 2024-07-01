import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(6, "Password too short"),
});

export const RegisterSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(6, "Password too short"),
  name: z.string().min(1, "Name is required"),
});

export const ResetSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, "Password too short"),
});
