"use client";
import Link from "next/link";
import {
  FaArrowLeftLong,
  FaCartShopping,
  FaTrash,
} from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/interfaces/product.interface";
import Image from "next/image";
import { formatPrice } from "@/lib/helpers/formatter";
import AddToCartButton from "../ui/add-to-cart-button";
import { deleteProductFromWishlist } from "@/actions/wishlist.action";
import { useWishlist } from "@/context/WishlistContext";
import notify from "@/hooks/useNotification";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function WishlistContent({
  wishlists,
}: {
  wishlists: Product[];
}) {
  const { updateNumOfWishlistItems } = useWishlist();
  const { cartItemsIds } = useCart();
  const router = useRouter();

  const itemStatus = (productId: string) => cartItemsIds.includes(productId);

  async function removeFromWishlist(itemId: string) {
      const response = await deleteProductFromWishlist(itemId);
      if (response.status === "success") {
        notify(response.message, "success");
        updateNumOfWishlistItems(response.count);
        router.refresh();
      } else {
        notify(response.message, "error");
      }
  }
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Table className="bg-white rounded-2xl border border-gray-100  overflow-hidden">
          <TableHeader>
            <TableRow className="hidden md:table-row px-6 h-14 bg-gray-50 border-b border-gray-100 text-sm font-medium *:text-gray-500">
              <TableHead>Product</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wishlists?.map((product) => (
              <TableRow key={product?._id}>
                <TableCell className=" font-medium">
                  <div className="flex items-center gap-4">
                    <Link
                      className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
                      href={`/products/${product?._id}`}
                    >
                      <Image
                        width={100}
                        height={100}
                        alt={product?.title}
                        className="w-full h-full object-contain p-2"
                        src={product?.imageCover}
                      />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
                        href={`/products/${product?._id}`}
                      >
                        {product?.title}
                      </Link>
                      <p className="text-sm text-gray-400 mt-1">
                        {product?.category?.name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center font-semibold text-gray-900">
                  {formatPrice(product?.price)}
                </TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                    {itemStatus(product?._id) ? (
                      <>
                        <FaCartShopping />
                        In Cart
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        In Stock
                      </>
                    )}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className=" flex items-center gap-2 md:justify-center">
                    <AddToCartButton
                      productId={product?._id}
                      className="flex-1 md:flex-none inline-flex gap-2 px-4 py-2.5 rounded-lg text-sm font-medium "
                      isDetails
                      isWishlist
                    />
                    <button
                      className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
                      title="Remove"
                      onClick={() => removeFromWishlist(product?._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-8 flex items-center justify-between">
          <Link
            className="flex items-center gap-1 text-gray-500 hover:text-primary-600 text-sm font-medium transition-colors"
            href="/products"
          >
            <FaArrowLeftLong />
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
