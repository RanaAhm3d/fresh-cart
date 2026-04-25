"use client";

import { FaTruck } from "react-icons/fa";

const FREE_SHIPPING_THRESHOLD = 500;

export default function ShippingProgress({ total }: { total: number }) {
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - total, 0);

  const progress = Math.min(
    (total / FREE_SHIPPING_THRESHOLD) * 100,
    100
  );

  const isFreeShipping = total >= FREE_SHIPPING_THRESHOLD;

  if (isFreeShipping) {
    return (
      <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <FaTruck className="text-green-600" />
        </div>

        <div>
          <p className="font-semibold text-green-700">
            Free Shipping!
          </p>

          <p className="text-sm text-green-600">
            You qualify for free delivery
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <FaTruck className="text-orange-500" />

        <span className="text-sm font-medium text-gray-700">
          Add {remaining} EGP for free shipping
        </span>
      </div>

      <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}