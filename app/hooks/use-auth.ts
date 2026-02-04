import { postData } from "@/lib/fetch-utils";
import { SignUpSchema } from "@/lib/schema";
import type { ForgetPasswordFormData } from "@/routes/auth/forgot-password";
import type { SigninFormData } from "@/routes/auth/sign-in";
import type { payload, SignupFormValue } from "@/routes/auth/sign-up";

import { useMutation } from "@tanstack/react-query";
import { data } from "react-router";
import { da } from "zod/v4/locales";

SignUpSchema.transform(({ confirmPassword, ...rest }) => rest);
export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (data: payload) => postData("/user/create-user", data),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: SigninFormData) => postData("/auth/login", data),
  });
};

export const useResetMutation = () => {
  return useMutation({
    mutationFn: (data) => postData("/user/reset-password", data),
  });
};

export const useForgetMutation = () => {
  return useMutation({
    mutationFn: (data: ForgetPasswordFormData) =>
      postData("/user/forget-password", data), //
  });
};

export const useVerifyMutation = () => {
  return useMutation({
    mutationFn: (data: string) => postData("/user/verify-email", data),
  });
};
