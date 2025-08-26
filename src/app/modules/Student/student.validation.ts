import { z } from "zod";
const createStudentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Class name is required",
      invalid_type_error: "Class name must be a string",
    }),
    age: z.number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
