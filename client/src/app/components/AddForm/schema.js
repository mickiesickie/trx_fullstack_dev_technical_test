import { z } from "zod";
const regexLetters = new RegExp("^[a-zA-Z]*$");
const regexNumbers = new RegExp("^[0-9]+$");
const invalid_type_error = "Invalid type provided for this field";
const required_error = "This field cannot be blank";
const schema = z.object({
  brand: z
    .string()
    .regex(regexLetters, `${invalid_type_error}`)
    .min(3, "Brand must be  at least 3 characters long"),
  color: z
    .string(required_error)
    .min(3, "Color must be  at least 3 characters long")
    .regex(regexLetters, `${invalid_type_error}`),
  model: z
    .string(required_error)
    .regex(regexLetters, `${invalid_type_error}`)
    .min(3, "Model must be  at least 3 characters long"),
  plate: z
    .string(required_error)
    .min(4, "Plate must be  at least 4 characters long"),
  year: z
    .string(required_error)
    .min(4)
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
      "We cant support yet"
    ),
  vim: z
    .string(required_error)
    .min(10, "Vim must be  at least 10 characters long")
    .regex(regexNumbers, " Vim only can contains numbers"),
  seats: z
    .string(required_error)
    .min(1, "Vim must be  at least 1 characters long")
    .max(2),
  insurance_company: z
    .string(required_error)
    .regex(regexLetters, `${invalid_type_error}`)
    .min(3, "Insurance company must be  at least 3 characters long"),
  economic_number: z
    .string(required_error)
    .regex(regexNumbers, `${invalid_type_error}`)
    .min(3, "Econocmic number must be  at least 3 characters long"),
  insurance_id: z
    .string(required_error)
    .regex(regexNumbers, `${invalid_type_error}`)
    .min(3, "Insurance id must be  at least 3 characters long")
});

export default schema;
