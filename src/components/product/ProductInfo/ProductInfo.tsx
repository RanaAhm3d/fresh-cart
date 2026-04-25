"use client";
import RatingStars from "@/components/shared/RatingStars/RatingStars";
import AddToCartButton from "@/components/ui/add-to-cart-button";
import { Separator } from "@/components/ui/separator";
import WishlistButton from "@/components/ui/whishlist-button";
import { Product } from "@/interfaces/product.interface";
import { calculateDiscount } from "@/lib/helpers/discount";
import { formatPrice } from "@/lib/helpers/formatter";
import Link from "next/link";
import { useState } from "react";
import { FaBolt, FaMinus, FaPlus, FaShareNodes } from "react-icons/fa6";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [count, setCount] = useState(1);
  return (
    <section className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-wrap gap-2 mb-4">
        <Link
          href={`/categories/${product?.category?._id}`}
          className="bg-primary-50 text-primary-700 text-xs px-3 py-1.5 rounded-full hover:bg-primary-100 transition"
        >
          {product?.category?.name}
        </Link>
        <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
          {product?.brand?.name}
        </span>
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
        {product?.title}
      </h1>
      <div className="flex items-center gap-3 mb-4">
        <RatingStars rating={product?.ratingsAverage} />
        <span className="text-sm text-gray-600">
          {product?.ratingsAverage} ({product?.ratingsQuantity} reviews)
        </span>
      </div>
      <div className="flex items-center flex-wrap gap-3 mb-6">
        {product?.priceAfterDiscount ? (
          <>
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product?.priceAfterDiscount)}
            </span>
            <span className="text-lg text-gray-400 line-through">
              {formatPrice(product?.price)}
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(product?.price)}
          </span>
        )}
        {product?.priceAfterDiscount && (
          <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
            Save {calculateDiscount(product?.price, product?.priceAfterDiscount)}%
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 mb-6">
        <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>In Stock
        </span>
      </div>
      <Separator className="my-5" />
      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-6">
        {product?.description}
      </p>
      {/* Quantity */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
            <button
              disabled={count === 1}
              onClick={() => setCount((count) => count - 1)}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
            >
              <FaMinus />
            </button>
            <span className="px-2">{count}</span>
            <button
              onClick={() => setCount((count) => count + 1)}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
            >
              <FaPlus />
            </button>
          </div>
          <span className="text-sm text-gray-500">
            {product?.quantity} available
          </span>
        </div>
      </div>
      {/* Price */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Price:</span>
          <span className="text-2xl font-bold text-primary-600">
            {product?.priceAfterDiscount
              ? formatPrice(count * product?.priceAfterDiscount)
              : formatPrice(count * product?.price)}
          </span>
        </div>
      </div>
      {/* Actions */}
      {/* Add to Cart Button */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <AddToCartButton
          productId={product?._id}
          isDetails
          className="flex-1 text-white py-3.5 px-6 rounded-xl font-medium gap-2 shadow-lg shadow-primary-600/25"
        />
        <button className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
          <FaBolt />
          Buy Now
        </button>
      </div>
      {/* Wishlist Button and Share Button */}
      <div className="flex gap-3 mb-6">
        <WishlistButton productId={product?._id} isDetails />
        <button className="border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-primary-300 hover:text-primary-600 transition">
          <FaShareNodes />
        </button>
      </div>
      <Separator className="my-5" />
    </section>
  );
}
