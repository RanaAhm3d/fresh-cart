import { getUserWishlist } from "@/actions/wishlist.action";
import EmptyWishlist from "@/components/wishlist/EmptyWishlist";
import WishlistContent from "@/components/wishlist/WishlistContent";
import WishlistHeader from "@/components/wishlist/WishlistHeader";
import { WishlistResponse } from "@/interfaces/wishlist.interface";

export default async function Wishlist() {
  const wishlists: WishlistResponse = await getUserWishlist();
  if (wishlists.data.length === 0) return <EmptyWishlist />;
  return (
    <div className="min-h-screen bg-gray-50/50">
      <WishlistHeader wishlistCount={wishlists?.count} />
      <WishlistContent wishlists={wishlists?.data} />
    </div>
  );
}
