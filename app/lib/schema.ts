import { email, z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("invalid email address"),
  password: z.string().min(6, "password  is required"),
});

export const SignUpSchema = z
  .object({
    email: z.string().email("invalid email address"),
    password: z.string().min(6, "password is required"),
    name: z.string().min(3, "Name must be atleast  3 characters"),
    confirmPassword: z
      .string()
      .min(6, "password  must be atleas six character"),
  })
  .refine((val) => val.password === val.confirmPassword, {
    path: ["confirmPassword"],
    message: "password does not match",
  });

export const ResetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "password is required"),
    confirmPassword: z
      .string()
      .min(6, "password must be atleast six characters"),
  })
  .refine((val) => val.confirmPassword === val.newPassword, {
    path: ["confirmPassword"],
    message: "password must be the same",
  });

export const ForgetPasswordSchema = z.object({
  email: z.string().email("invalid email address"),
});

export const WorkspaceSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters"),
  color: z.string().min(3, "color must be atleast 3 characters"),
  description: z.string().optional(),
});
