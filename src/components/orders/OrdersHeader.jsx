import TopLinks from "@/components/shared/TopLinks/TopLinks";
import Box from "@/components/shared/icons/Box";
import Link from "next/link";
import { FaBagShopping } from "react-icons/fa6";

export default function OrdersHeader({ ordersCount } ) {
  return (
    <div className="mb-8">
      <TopLinks text="My Orders" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-linear-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
            <Box className="size-5 " />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-500 text-sm">
              Track and manage your {ordersCount} orders
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Link
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all cursor-pointer"
            href="/"
          >
            <FaBagShopping />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
