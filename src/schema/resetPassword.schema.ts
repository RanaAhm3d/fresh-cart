import * as zod from "zod";

export const defaultValues = {
  newPassword: "",
  confirmPassword: "",
};

export const resetPasswordSchema = zod
  .object({
    newPassword: zod
      .string()
      .nonempty({ message: "Please enter your new password" })
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(
        /[!@#$%^&*]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: zod
      .string()
      .nonempty({ message: "Please confirm your password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordPayloadType = zod.infer<typeof resetPasswordSchema>;
