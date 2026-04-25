"use client";
import { ProductCart } from "@/interfaces/cart.interface";
import { formatPrice } from "@/lib/helpers/formatter";
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { removeCartItem, updateProductQty } from "@/actions/cart.actions";
import { useState, useTransition } from "react";
import Spinner from "../shared/Loading/Spinner";
import RemoveDialog from "../shared/Dialog/RemoveDialog";
import { useCart } from "@/context/CartContext";
import notify from "@/hooks/useNotification";
import { useRouter } from "next/navigation";

export default function CartItems({ product }: { product: ProductCart }) {
  const [isPending, startTransition] = useTransition();
  const { updateNumOfCartItems } = useCart();
  const [open, setOpen] = useState(false);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const router = useRouter();

  async function handleUpdateQuantity(
    id: string,
    count: number,
    action: "plus" | "minus",
  ) {
    const key = `${id}-${action}`;

    setLoadingKey(key);

    const response = await updateProductQty(id, count);

    if (response.status === "success") {
      notify(response.message, "success");
      router.refresh();
    } else {
      notify(response.message, "error");
    }

    setLoadingKey(null);
  }

  function handleRemoveCartItem() {
    startTransition(async () => {
      const response = await removeCartItem(product.product._id);
      if (response.status === "success") {
        notify(response.message, "success");
        updateNumOfCartItems(response.numOfCartItems);
        setOpen(false);
        router.refresh();
      } else {
        notify(response.message, "error");
      }
    });
  }

  return (
    <>
      <div
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5"
        key={product?.product?._id}
      >
        <div className="flex gap-4 sm:gap-6">
          <Link
            className="relative shrink-0 group"
            href={`products/${product?.product?._id}`}
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden">
              <Image
                width={100}
                height={100}
                alt={product?.product?.title}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                src={product?.product?.imageCover}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <FaCheck />
              In Stock
            </div>
          </Link>
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="mb-3">
              <Link
                className="group/title"
                href={`products/${product?.product?._id}`}
              >
                <h3 className="font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-relaxed text-base sm:text-lg">
                  {product?.product?.title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-2.5 py-1 bg-linear-to-r from-primary-50 to-emerald-50 text-primary-700 text-xs font-medium rounded-full">
                  {product?.product?.category?.name}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">SKU: 5CA0AD</span>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-primary-600 font-bold text-lg">
                  {formatPrice(product?.price)}
                </span>
                <span className="text-xs text-gray-400">per unit</span>
              </div>
            </div>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                <button
                  disabled={loadingKey === `${product?.product?._id}-minus`}
                  onClick={() =>
                    handleUpdateQuantity(
                      product?.product?._id,
                      product?.count - 1,
                      "minus",
                    )
                  }
                  className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-40 transition-all"
                >
                  {loadingKey === `${product?.product?._id}-minus` ? (
                    <Spinner className="size-3" />
                  ) : (
                    <FaMinus />
                  )}
                </button>
                <span className="w-12 text-center font-bold text-gray-900">
                  {product?.count}
                </span>
                <button
                  disabled={loadingKey === `${product?.product?._id}-plus`}
                  onClick={() =>
                    handleUpdateQuantity(
                      product?.product?._id,
                      product?.count + 1,
                      "plus",
                    )
                  }
                  className="h-8 w-8 rounded-lg bg-primary-600 shadow-sm flex items-center justify-center text-white hover:bg-primary-700 transition-all"
                >
                  {loadingKey === `${product?.product?._id}-plus` ? (
                    <Spinner className="size-3" />
                  ) : (
                    <FaPlus />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-0.5">Total</p>
                  <p className="text-xl font-bold text-gray-900">
                    {product?.price * product?.count}{" "}
                    <span className="text-sm font-medium text-gray-400">
                      EGP
                    </span>
                  </p>
                </div>
                <div
                  className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all duration-200"
                  title="Remove item"
                >
                  <RemoveDialog
                    icon={<FaTrash />}
                    title="Remove Item?"
                    contentIcon={<FaTrash className="size-6 text-red-500" />}
                    content={`Remove ${product?.product?.title} from your cart?`}
                    action={handleRemoveCartItem}
                    isPending={isPending}
                    open={open}
                    setOpen={setOpen}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
