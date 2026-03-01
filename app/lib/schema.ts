import { MemberRole, ProjectStatus, Taskpriority, TaskStatus } from "@/types";
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

export const ProjectSchema = z.object({
  title: z.string().min(3, "title must be atleast 3 characters"),
  description: z.string().optional(),
  status: z.enum(ProjectStatus).optional(),
  startDate: z.string().min(10, "start date is required"),
  dueDate: z.string().min(10, "due date is required"),
  tags: z.string().optional(),
  projectMembers: z
    .array(
      z.object({
        userId: z.string(),
        role: z.enum(MemberRole),
      }),
    )
    .optional(),
});

export const CreateTaskSchema = z.object({
  name: z.string().min(3, "must be atleast character"),
  description: z.string().optional(),
  taskPriority: z.enum(Taskpriority),
  assignee: z.array(z.string()),
  status: z.enum(TaskStatus).optional(),
  dueDate: z.string().min(10, "due date  is required"),
  assigneeId: z.string(),
});
