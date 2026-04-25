import * as zod from "zod";

export const defaultValues = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  phone: "",
  checkbox: false,
};

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty({ message: "Please enter your name" })
      .min(2, { message: "Name is too short" })
      .max(50, { message: "Name is too long" }),
    email: zod
      .string()
      .nonempty({ message: "Please enter your email" })
      .email({ message: "Invalid email" }),
    password: zod
      .string()
      .nonempty({ message: "Please enter your password" })
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(
        /[!@#$%^&*]/,
        "Password must contain at least one special character",
      ),
    rePassword: zod
      .string()
      .nonempty({ message: "Please confirm your password" }),
    phone: zod
      .string()
      .nonempty({ message: "Please enter your phone number" })
      .regex(/^\+201[0125][0-9]{8}$/, {
        message:
          "Phone number must be a valid Egyptian number starting with +20",
      }),
    checkbox: zod.boolean().refine((val) => val === true, {
      message: "*You must accept to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegisterPayloadType = zod.infer<typeof registerSchema>;
