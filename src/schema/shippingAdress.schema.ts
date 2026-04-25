import * as zod from "zod";

enum PaymentMethod {
  CASH = "cash",
  CARD = "card",
}

export const defaultValues = {
  details: "",
  phone: "",
  city: "",
  postalCode: "",
  paymentMethod: PaymentMethod.CASH,
};

export const shippingAddressSchema = zod.object({
  details: zod
    .string()
    .nonempty({ message: "*Address details must be at least 10 characters" })
    .min(10, { message: "*Address details must be at least 10 characters" })
    .max(200, { message: "*Address is too long" }),
  city: zod
    .string()
    .nonempty({ message: "*City name must be at least 2 characters" })
    .min(2, { message: "*City name must be at least 2 characters" }),
  phone: zod
    .string()
    .nonempty({ message: "*Please enter a valid Egyptian phone number" })
    .refine(
      (value) => {
        const egyptianPhoneRegex = /^(010|011|012|015)[0-9]{8}$/;
        return egyptianPhoneRegex.test(value);
      },
      { message: "*Please enter a valid Egyptian phone number" },
    ),
  postalCode: zod
    .string()
    .nonempty({ message: "*Postal code must be 5 digits" })
    .refine((value) => /^\d{5}$/.test(value), {
      message: "*Postal code must be 5 digits",
    }),
  paymentMethod: zod.enum(["cash", "card"]),
});

export type ShippingAddressPayloadType = zod.infer<
  typeof shippingAddressSchema
>;
