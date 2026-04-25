import { FaHeart } from "react-icons/fa";
import TopLinks from "../shared/TopLinks/TopLinks";

export default function WishlistHeader({
  wishlistCount,
}: {
  wishlistCount: number;
}) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-8">
        <TopLinks text="Wishlist" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
              <FaHeart className="size-5 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-500 text-sm">
                {wishlistCount} items saved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
