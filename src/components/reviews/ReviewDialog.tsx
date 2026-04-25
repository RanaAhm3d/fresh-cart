"use client";
import Spinner from "@/components/shared/Loading/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import notify from "@/hooks/useNotification";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Star } from "lucide-react";
import { ReviewPayloadType, reviewSchema } from "@/schema/review.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddReview, updateReview } from "@/actions/reviews.action";
import { useRouter } from "next/navigation";
import { Review } from "@/interfaces/reviews.interface";

export default function ReviewDialog({
  text,
  productId,
  review,
}: {
  text: React.ReactNode;
  productId: string;
  review?: Review;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [hover, setHover] = useState(0);
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<ReviewPayloadType>({
    defaultValues: {
      rating: 0,
      review: "",
    },
    resolver: zodResolver(reviewSchema),
    mode: "onSubmit",
  });

  function onSubmit(formValues: ReviewPayloadType) {
    startTransition(async () => {
      if (review) {
        const response = await updateReview(review._id, formValues);
        if (response && response.data) {
          notify("Review updated successfully", "success");
          reset();
          setOpen(false);
          router.refresh();
        } else {
          notify(response.errors || "Failed to update review", "error");
        }
      } else {
        const response = await AddReview(productId, formValues);
        if (response && response.data) {
          notify("Review added successfully", "success");
          reset();
          setOpen(false);
          router.refresh();
        } else {
          notify("Failed to add review", "error");
        }
      }
    });
  }

  useEffect(() => {
    if (review) {
      reset({
        rating: review.rating,
        review: review.review,
      });
    }
  }, [review, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{text}</DialogTrigger>
      <DialogContent
        style={{ width: "100%", maxWidth: "448px" }}
        className="p-6"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            {review ? "Update your review" : "Add your review"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
          <FieldGroup>
            {/* Stars */}
            <Controller
              name="rating"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="w-full mx-auto"
                >
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        onClick={() => field.onChange(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className={`size-6 cursor-pointer transition-colors ${
                          star <= (hover || field.value)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/*Review */}
            <Controller
              name="review"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full ">
                  <Textarea
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="Write your review here..."
                    className="px-4 h-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <div className="flex items-center gap-3 pt-4">
            <DialogClose
              asChild
              className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
            >
              <Button type="button" variant={"ghost"} className="h-12">
                Cancel
              </Button>
            </DialogClose>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-3 px-6 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg shadow-primary-600/25"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner className="size-5 text-white" />
                  {review ? "Updating..." : "Sending..."}
                </div>
              ) : review ? (
                "Update Review"
              ) : (
                "Send Review"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
