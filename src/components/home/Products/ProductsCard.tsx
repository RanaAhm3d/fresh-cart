"use client";
import { Product } from "@/interfaces/product.interface";
import { formatPrice } from "@/lib/helpers/formatter";
import Image from "next/image";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa6";
import RatingStars from "../../shared/RatingStars/RatingStars";
import { calculateDiscount } from "@/lib/helpers/discount";
import AddToCartButton from "@/components/ui/add-to-cart-button";
import WishlistButton from "@/components/ui/whishlist-button";
import ShareProdcutBtn from "@/components/ui/share-product-button";

interface ProductsCardProps {
  product: Product;
}

export default function ProductsCard({ product }: ProductsCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:-translate-y-1.5 hover:shadow-md transition-all">
      <div className="relative">
        <Image
          src={product?.imageCover}
          alt={product?.title}
          width={300}
          height={300}
          className="w-full h-60 object-contain bg-white"
        />
        {product?.priceAfterDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{calculateDiscount(product.price, product.priceAfterDiscount)}%
          </div>
        )}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 *:bg-white *:h-8 *:w-8 *:flex *:items-center *:justify-center *:rounded-full *:shadow-sm *:cursor-pointer ">
          <WishlistButton productId={product?._id} />
          <ShareProdcutBtn productId={product?._id} />
          <Link
            href={`/products/${product?._id}`}
            title="View product"
            className=" text-gray-600 hover:text-primary-600"
          >
            <FaRegEye />
          </Link>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product?.category?.name}</p>
        <Link
          href={`/products/${product?._id}`}
          className="text-lg font-medium mb-1 cursor-pointer truncate line-clamp-1"
          title={product?.title}
        >
          {product?.title}
        </Link>
        <div className="flex items-center gap-3">
          <RatingStars rating={product?.ratingsAverage} />
          <div className="flex items-center gap-1 *:text-xs *:text-gray-500">
            <span>{product?.ratingsAverage}</span>
            <span>({product?.ratingsQuantity})</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product?.priceAfterDiscount ? (
              <>
                <span
                  className={`text-lg font-bold ${product?.priceAfterDiscount ? "text-primary-600" : "text-gray-800"} `}
                >
                  {formatPrice(product?.priceAfterDiscount)}
                </span>
                <span className="text-sm text-gray-500 line-through ">
                  {formatPrice(product?.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-800">
                {formatPrice(product?.price)}
              </span>
            )}
          </div>
          <AddToCartButton
            productId={product?._id}
            className="h-10 w-10 rounded-full disabled:opacity-70 "
          />
        </div>
      </div>
    </div>
  );
}
