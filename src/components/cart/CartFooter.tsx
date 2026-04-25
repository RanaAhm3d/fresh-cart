"use client";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import RemoveDialog from "../shared/Dialog/RemoveDialog";
import { FaTrash } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { clearUserCart } from "@/actions/cart.actions";
import { useCart } from "@/context/CartContext";
import notify from "@/hooks/useNotification";
import { useRouter } from "next/navigation";

export default function CartFooter() {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { updateNumOfCartItems } = useCart();
  const router = useRouter();

  function clearCart() {
    startTransition(async () => {
      const response = await clearUserCart();
      if (response.status === "success") {
        notify(response.message, "success");
        updateNumOfCartItems(0);
        router.refresh();
      } else {
        notify(response.message, "error");
      }
    });
  }
  return (
    <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
      <Link
        className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2"
        href="/"
      >
        <span>←</span> Continue Shopping
      </Link>
      <div className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50">
        <RemoveDialog
          icon={
            <FaTrash className="group-hover:scale-110 transition-transform mb-0.5" />
          }
          text="Clear all items"
          action={clearCart}
          contentIcon={<LuShoppingCart className="size-8 text-red-500" />}
          title="Clear Your Cart"
          content="All items will be removed from your cart. This action cannot be undone."
          isPending={isPending}
          open={open}
          setOpen={setOpen}
          cancelButton="Keep Shopping"
          confirmButton="Yes, Clear All"
        />
      </div>
    </div>
  );
}
