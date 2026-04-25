import { Product } from "@/interfaces/product.interface";
import { formatPrice } from "@/lib/helpers/formatter";
import Image from "next/image";

export default function CheckoutItems({
  product,
  count,
  price,
}: {
  product: Product;
  count: number;
  price: number;
}) {
  return (
    <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
      <div
        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
        key={product._id}
      >
        <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
          <Image
            width={100}
            height={100}
            alt={product.title}
            className="w-full h-full object-contain"
            src={product.imageCover}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {product.title}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {count} × {formatPrice(price)}
          </p>
        </div>
        <p className="text-sm font-bold text-gray-900 shrink-0">
          {price * count}
        </p>
      </div>
    </div>
  );
}
