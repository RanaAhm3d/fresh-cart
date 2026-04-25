import * as zod from "zod";

export const defaultValues = {
  name: "",
  email: "",
  phone: "",
};

export const userInfoSchema = zod.object({
  name: zod
    .string()
    .nonempty({ message: "Please enter your name" })
    .min(2, { message: "Name is too short" })
    .max(50, { message: "Name is too long" }),
  email: zod
    .string()
    .nonempty({ message: "Please enter your email" })
    .email({ message: "Invalid email" }),
  phone: zod
    .string()
    .nonempty({ message: "Please enter your phone number" })
    .min(11, { message: "Phone number must be at least 11 digits" }),
});

export type UserInfoPayloadType = zod.infer<typeof userInfoSchema>;
