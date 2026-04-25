import * as zod from "zod";

export const defaultValues = {
  email: "",
  password: "",
};

export const loginSchema = zod.object({
  email: zod
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: zod.string().nonempty({ message: "Password is required" }),
});

export type LoginPayloadType = zod.infer<typeof loginSchema>;
