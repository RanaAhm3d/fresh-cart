import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import { Products } from "@/types/ApiResponse.type";
import ProductsCard from "./ProductsCard";
import { FaFilter, FaTags } from "react-icons/fa";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import EmptyProducts from "./EmptyProducts";
import { getProducts } from "@/actions/product.action";

interface ProductsListingProps {
  isProducts?: boolean;
  isHome?: boolean;
  brand: string;
  brandName?: string;
  category: string;
  categoryName?: string;
}

export default async function ProductsListing({
  isProducts = false,
  isHome = false,
  brand,
  categoryName,
  brandName,
  category,
}: ProductsListingProps) {
  const { data: products }: Products = await getProducts({ brand, category });
  return (
    <section className="container mx-auto px-4 py-10">
      {isHome && <SectionHeader title="Featured" subTitle="Products" />}
      {brand && (
        <div className="mb-6 flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-2 text-sm text-gray-600">
            <FaFilter />
            Active Filters:
          </span>
          <Link
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium hover:bg-violet-200 transition-colors"
            href="/products"
          >
            <FaTags />
            {brandName}
            <FaXmark />
          </Link>
          <Link
            className="text-sm text-gray-500 hover:text-gray-700 underline"
            href="/products"
          >
            Clear all
          </Link>
        </div>
      )}
      {category && (
        <div className="mb-6 flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-2 text-sm text-gray-600">
            <FaFilter />
            Active Filters:
          </span>
          <Link
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium hover:bg-green-200 transition-colors"
            href="/products"
          >
            <FaTags />
            {categoryName}
            <FaXmark />
          </Link>
          <Link
            className="text-sm text-gray-500 hover:text-gray-700 underline"
            href="/products"
          >
            Clear all
          </Link>
        </div>
      )}
      {isProducts && (
        <div className="mb-6 text-sm text-gray-500">
          Showing {products?.length} products
        </div>
      )}
      {products?.length === 0 && <EmptyProducts />}
      <div
        className={
          isProducts
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        }
      >
        {products?.map((product) => (
          <ProductsCard key={product?._id} product={product} />
        ))}
      </div>
    </section>
  );
}
