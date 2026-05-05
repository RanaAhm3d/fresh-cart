"use client";
import notify from "@/hooks/useNotification";
import { FaArrowsRotate } from "react-icons/fa6";

export default function ShareProdcutBtn({ productId }: { productId: string }) {
  async function copyProductsUrl(prodId: string) {
    const text = `${window.location.origin}/products/${prodId}`;
    await navigator.clipboard.writeText(text);
    notify("Copied to clipboard", "success");
  }
  return (
    <>
      <div
        onClick={() => copyProductsUrl(productId)}
        className="text-gray-600 cursor-pointer hover:text-primary-600 transition-all duration-200"
      >
        <FaArrowsRotate />
      </div>
    </>
  );
}
