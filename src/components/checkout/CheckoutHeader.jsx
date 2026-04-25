import TopLinks from "@/components/shared/TopLinks/TopLinks";
import { FaArrowLeftLong, FaReceipt } from "react-icons/fa6";

export default function CheckoutHeader() {
  return (
    <div className="mb-8">
      <TopLinks text="Cart" isCheckout />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="bg-linear-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
              <FaReceipt />
            </span>
            Complete Your Order
          </h1>
          <p className="text-gray-500 mt-2">
            Review your items and complete your purchase
          </p>
        </div>
        <a
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all"
          href="/cart"
        >
          <FaArrowLeftLong />
          Back to Cart
        </a>
      </div>
    </div>
  );
}
