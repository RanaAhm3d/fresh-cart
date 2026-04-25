"use client";

import { addToCart } from "@/actions/cart.actions";
import { useCart } from "@/context/CartContext";
import { CartResponse } from "@/interfaces/cart.interface";
import { FaCartShopping, FaCheck, FaPlus } from "react-icons/fa6";
import { useTransition } from "react";
import Spinner from "../shared/Loading/Spinner";
import notify from "@/hooks/useNotification";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AddToCartButton({
  className,
  isDetails,
  productId,
  isWishlist,
}: {
  className: string;
  isDetails?: boolean;
  productId: string;
  isWishlist?: boolean;
}) {
  const { updateNumOfCartItems, cartItemsIds, setCartItemsIds } = useCart();
  const { status } = useSession();
  const isInCart = cartItemsIds.includes(productId);

  const [isPending, startTransition] = useTransition();

  function handleAddToCart() {
    startTransition(async () => {
      if (status === "unauthenticated") {
        notify("please login first", "warn");
      } else {
        try {
          const response: CartResponse = await addToCart(productId);
          if (response.statusMsg === "fail") {
            notify(response.message, "warn");
          } else {
            notify(response.message, "success");
            updateNumOfCartItems(response.numOfCartItems);
            setCartItemsIds(
              response.data.products.map((item) => item.product._id),
            );
          }
        } catch (error) {
          notify((error as Error).message, "error");
        }
      }
    });
  }

  return isInCart && isWishlist ? (
    <Link
      href="/cart"
      className={`flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200  transition ${className}  `}
    >
      <FaCheck className="text-primary-600" />
      View Cart
    </Link>
  ) : (
    <button
      onClick={handleAddToCart}
      disabled={isPending}
      className={`flex items-center justify-center  bg-primary-600 text-white hover:bg-primary-700 transition  disabled:opacity-70 ${className}`}
    >
      {isPending ? (
        <Spinner className="size-5" />
      ) : isDetails ? (
        <>
          <FaCartShopping />
          Add to cart
        </>
      ) : (
        <FaPlus />
      )}
    </button>
  );
}
