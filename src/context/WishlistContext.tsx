"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserWishlist } from "@/actions/wishlist.action";

const WishlistContext = createContext({
  numOfWishlistItems: 0,
  wishlistIds: [] as string[],
  updateNumOfWishlistItems: (count: number) => {},
  setWishlistIds: (ids: string[]) => {},
});

export default function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchWishlist() {
      const response = await getUserWishlist();
      if (response?.status === "success") {
        setNumOfWishlistItems(response.data.length);
        setWishlistIds(response.data.map((item: { _id: string }) => item._id));
      }
    }
    fetchWishlist();
  }, []);

  function updateNumOfWishlistItems(count: number) {
    setNumOfWishlistItems(count);
  }

  return (
    <WishlistContext.Provider
      value={{
        numOfWishlistItems,
        wishlistIds,
        updateNumOfWishlistItems,
        setWishlistIds,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
