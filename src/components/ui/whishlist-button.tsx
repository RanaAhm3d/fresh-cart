"use client";
import {
  addProductToWishlist,
  deleteProductFromWishlist,
} from "@/actions/wishlist.action";
import { useWishlist } from "@/context/WishlistContext";
import notify from "@/hooks/useNotification";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";

export default function WishlistButton({
  isDetails,
  productId,
}: {
  isDetails?: boolean;
  productId: string;
}) {
  const { wishlistIds, setWishlistIds, updateNumOfWishlistItems } =
    useWishlist();
  const { status } = useSession();
  const isWishlist = wishlistIds.includes(productId);
  async function addToWishlist() {
    const response = await addProductToWishlist(productId);
    if (response.status === "success") {
      notify(response.message, "success");
      setWishlistIds(response.data);
      updateNumOfWishlistItems(response.data.length);
    } else if (status === "unauthenticated") {
      notify("Please Login First", "warn");
    } else {
      notify(response.message, "error");
    }
  }
  async function removeFromWishlist() {
    const response = await deleteProductFromWishlist(productId);
    if (response.status === "success") {
      notify(response.message, "success");
      setWishlistIds(response.data);
      updateNumOfWishlistItems(response.data.length);
    } else {
      notify(response.message, "error");
    }
  }
  return (
    <button
      onClick={isWishlist ? removeFromWishlist : addToWishlist}
      title={
        !isDetails
          ? isWishlist
            ? "Remove from wishlist"
            : "Add to wishlist"
          : undefined
      }
      className={`transition group ${isDetails && `flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 ${isWishlist ? "border-red-200 text-red-600 bg-red-50 " : "  border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600"}`}`}
    >
      <Heart
        size={18}
        className={`${isDetails && !isWishlist && `group-hover:text-primary-600`} ${isWishlist ? `text-red-500 fill-red-500 ${!isDetails && "hover:text-red-600 hover:fill-red-600"} ` : `text-gray-600 ${!isDetails && "hover:text-red-500"}`}`}
      />
      {isDetails && `${isWishlist ? "In Wishlist" : "Add to Wishlist"}`}
    </button>
  );
}
