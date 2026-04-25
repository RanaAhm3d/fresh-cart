"use client";
import TopLinks from "@/components/shared/TopLinks/TopLinks";
import { FaCartShopping } from "react-icons/fa6";

export default function CartHeader({ cartCount }: { cartCount: number }) {
  return (
    <div className="mb-8">
      <TopLinks text="Shopping Cart" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="bg-primary-600 text-white w-12 h-12 rounded-xl flex items-center justify-center">
              <FaCartShopping />
            </span>
            Shopping Cart
          </h1>
          <p className="text-gray-500 mt-2">
            You have{" "}
            <span className="font-semibold text-primary-600">
              {cartCount} item
            </span>{" "}
            in your cart
          </p>
        </div>
      </div>
    </div>
  );
}
