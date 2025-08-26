import { z } from "zod";
const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    age: z.number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    }),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  }),
});

export const userValidation = {
  registerUserValidationSchema,
};
