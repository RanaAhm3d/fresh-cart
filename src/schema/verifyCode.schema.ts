import * as zod from "zod";

export const defaultValues = {
  resetCode: "",
};

export const verifyCodeSchema = zod.object({
  resetCode: zod.string().nonempty({ message: "Reset code is required" }).min(6 , { message: "Reset code must be 6 digits" }),
});

export type VerifyCodePayloadType = zod.infer<typeof verifyCodeSchema>;
