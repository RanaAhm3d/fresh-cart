import * as zod from "zod";

export const defaultValues = {
  name: "",
  details: "",
  phone: "",
  city: "",
};

export const addressesSchema = zod.object({
  name: zod
    .string()
    .nonempty({ message: "Please enter home name" })
    .min(2, { message: "Name is too short" })
    .max(50, { message: "Name is too long" }),
  details: zod
    .string()
    .nonempty({ message: "Please enter your full address" })
    .min(10, { message: "Address is too short" })
    .max(200, { message: "Address is too long" }),
  city: zod.string().nonempty({ message: "Please enter your city" }),
  phone: zod
    .string()
    .nonempty({ message: "Please enter your phone number" })
    .min(11, { message: "Phone number must be at least 11 digits" }),
});

export type AddressesPayloadType = zod.infer<typeof addressesSchema>;
