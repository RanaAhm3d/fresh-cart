import { formatPrice } from "@/lib/helpers/formatter";
import Link from "next/link";
import { FaShieldAlt, FaTruck } from "react-icons/fa";
import { FaBagShopping, FaLock, FaTag } from "react-icons/fa6";
import ShippingProgress from "./ShippingProgress";
import Box from "../shared/icons/Box";
import { CartResponse } from "@/interfaces/cart.interface";
import CheckoutItems from "../checkout/CheckoutItems";
import Spinner from "../shared/Loading/Spinner";

export default function OrderSummary({
  cart,
  isCheckout,
  isPending,
}: {
  cart: CartResponse;
  isCheckout?: boolean;
  isPending?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 overflow-hidden sticky ${isCheckout ? "top-4" : "top-24"} shadow-sm`}
    >
      <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FaBagShopping />
          Order Summary
        </h2>
        <p className="text-primary-100 text-sm mt-1">
          {cart?.numOfCartItems} items in your cart
        </p>
      </div>
      <div className="p-6 space-y-5">
        {isCheckout ? (
          cart?.data?.products?.map((product) => (
            <CheckoutItems
              key={product?.product?._id}
              count={product?.count}
              price={product?.price}
              product={product?.product}
            />
          ))
        ) : (
          <ShippingProgress total={cart?.data?.totalCartPrice} />
        )}
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">
              {formatPrice(cart?.data?.totalCartPrice)}
            </span>
          </div>
          <div className="flex justify-between text-gray-600">
            <div className="flex items-center gap-2">
              {isCheckout && <FaTruck className="text-gray-400" />}
              <span>Shipping</span>
            </div>
            <span
              className={`font-medium ${cart?.data?.totalCartPrice < 500 ? "text-gray-900" : "text-primary-600"}`}
            >
              {cart?.data?.totalCartPrice < 500 ? "50 EGP" : "FREE"}
            </span>
          </div>
          <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-baseline">
              <span className="text-gray-900 font-semibold">Total</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">
                  {cart?.data?.totalCartPrice < 500
                    ? cart?.data?.totalCartPrice + 50
                    : cart?.data?.totalCartPrice}
                </span>
                <span className="text-sm text-gray-500 ml-1">EGP</span>
              </div>
            </div>
          </div>
        </div>
        {!isCheckout && (
          <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all">
            <FaTag />
            <span className="text-sm font-medium">Apply Promo Code</span>
          </button>
        )}
        {isCheckout ? (
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-6 bg-linear-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
          >
            {isPending ? (
              <>
                <Spinner className="size-5" />
                Processing...
              </>
            ) : (
              <>
                <Box className="size-5" />
                Place Order
              </>
            )}
          </button>
        ) : (
          <Link
            className="w-full bg-linear-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
            href="/checkout"
          >
            <FaLock />
            <span>Secure Checkout</span>
          </Link>
        )}
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaShieldAlt className="text-green-500" />
            <span>Secure Payment</span>
          </div>
          <div className="w-px h-4 bg-gray-200"></div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaTruck className="text-blue-500" />
            <span>Fast Delivery</span>
          </div>
          {isCheckout && (
            <>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Box className="size-3 text-orange-500" />
                <span>Easy Returns</span>
              </div>
            </>
          )}
        </div>
        {!isCheckout && (
          <Link
            className="block text-center text-primary-600 hover:text-primary-700 text-sm font-medium py-2"
            href="/"
          >
            ← Continue Shopping
          </Link>
        )}
      </div>
    </div>
  );
}
