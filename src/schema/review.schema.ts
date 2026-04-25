import * as zod from "zod";

export const reviewSchema = zod.object({
  review: zod
    .string()
    .nonempty({ message: "Please enter your review" })
    .min(2, { message: "Review is too short" })
    .max(500, { message: "Review is too long" }),
  rating: zod.number().min(1).max(5),
});

export type ReviewPayloadType = zod.infer<typeof reviewSchema>;
