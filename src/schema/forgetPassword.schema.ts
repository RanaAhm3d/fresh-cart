import * as zod from "zod";

export const defaultValues = {
  email: "",
};

export const forgetPasswordSchema = zod.object({
  email: zod
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email" }),
});

export type ForgetPasswordPayloadType = zod.infer<typeof forgetPasswordSchema>;
