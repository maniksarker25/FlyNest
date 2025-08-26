import { z } from "zod";
const createClassValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Class name is required",
      invalid_type_error: "Class name must be a string",
    }),
    section: z.string({
      required_error: "Section is required",
      invalid_type_error: "Section must be a string",
    }),
  }),
});
const updateClassValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Class name is required",
      invalid_type_error: "Class name must be a string",
    }),
    section: z.string({
      required_error: "Section is required",
      invalid_type_error: "Section must be a string",
    }),
  }),
});

export const classValidation = {
  createClassValidationSchema,
  updateClassValidationSchema,
};
