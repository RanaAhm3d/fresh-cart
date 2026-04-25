import * as zod from "zod";

export const defaultValues = {
  currentPassword: "",
  password: "",
  rePassword: "",
};

export const userPasswordSchema = zod
  .object({
    currentPassword: zod
      .string()
      .nonempty({ message: "Please enter your password" }),
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
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type UserPasswordPayloadType = zod.infer<typeof userPasswordSchema>;
