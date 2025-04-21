import { z } from "zod";

// REUSABLE FIELDS

const firstNameField = z
  .string({
    required_error: "First name is required",
  })
  .min(1, "First name is required")
  .max(100, "First name must be 100 characters or less");

const lastNameField = z.string().max(100, "Last name must be 100 characters or less").optional();

const emailField = z
  .string({
    required_error: "Email is required",
  })
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(320, "Email must be 320 characters or less");

const basicPasswordField = z
  .string({
    required_error: "Password is required",
  })
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password must be 64 characters or less");

const passwordField = basicPasswordField
  .refine((pwd) => /[a-z]/.test(pwd), {
    message: "Password must contain a lowercase letter.",
  })
  .refine((pwd) => /[A-Z]/.test(pwd), {
    message: "Password must contain an uppercase letter.",
  })
  .refine((pwd) => /\d/.test(pwd), {
    message: "Password must contain a number.",
  });

const confirmPasswordField = z.string({
  required_error: "Confirmation password is required",
});

// SCHEMASSS
export const signUpSchema = z
  .object({
    firstName: firstNameField,
    lastName: lastNameField,
    email: emailField,
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Confirmation password must match the password.",
  });

export const emailAndPasswordSchema = z.object({
  email: emailField,
  password: basicPasswordField,
});

export const emailSchema = z.object({
  email: emailField,
});

export const updatePasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Confirmation password must match the password.",
  });
