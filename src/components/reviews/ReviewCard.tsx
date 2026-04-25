"use client";
import { Review } from "@/interfaces/reviews.interface";
import RatingStars from "../shared/RatingStars/RatingStars";
import { useSession } from "next-auth/react";
import ReviewDialog from "./ReviewDialog";
import { FaPen, FaTrash } from "react-icons/fa6";
import RemoveDialog from "../shared/Dialog/RemoveDialog";
import { useState, useTransition } from "react";
import { removeReview } from "@/actions/reviews.action";
import notify from "@/hooks/useNotification";
import { useRouter } from "next/navigation";

export default function ReviewCard({ review }: { review: Review }) {
  const { data: user, status } = useSession();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleRemoveReview() {
    startTransition(async () => {
      const response = await removeReview(review._id);
      if (response.message === "success") {
        notify("Review deleted successfully", "success");
        setOpen(false);
        router.refresh();
      } else {
        notify(response.message, "error");
      }
    });
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-start gap-3 w-full">
      <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary-600 to-primary-500 flex items-center justify-center text-white font-semibold text-lg">
        {review.user.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between w-full">
          <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
          <div className="flex items-center gap-2">
            {status === "authenticated" && review.user._id === user.user.id && (
              <div className="flex items-center gap-2">
                <ReviewDialog
                  productId={""}
                  text={
                    <FaPen
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                      title="Edit Review"
                    />
                  }
                  review={review}
                />
                <RemoveDialog
                  icon={
                    <FaTrash
                      className="text-red-500 hover:text-red-600"
                      title="Remove Review"
                    />
                  }
                  title=""
                  contentIcon={<FaTrash className="size-6 text-red-500" />}
                  content={`Do you want to remove this review?`}
                  action={handleRemoveReview}
                  isPending={isPending}
                  open={open}
                  setOpen={setOpen}
                />
              </div>
            )}
            <span className="text-sm text-gray-500 ">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <RatingStars rating={review.rating} />
        <p className="text-gray-600">{review.review}</p>
      </div>
    </div>
  );
}
