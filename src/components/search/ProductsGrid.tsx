"use client";
import { getProducts } from "@/actions/product.action";
import { SearchParams } from "@/app/search/page";
import { Product } from "@/interfaces/product.interface";
import { useEffect, useState } from "react";
import ProductsCard from "../home/Products/ProductsCard";
import SearchLoading from "./SearchLoading";
import EmptySearch from "./EmptySearch";
import { SearchPagination } from "../pagination/Pagination";
import { Products } from "@/types/ApiResponse.type";
import { MetaData } from "@/interfaces/apiResponse.interface";
import { ViewMode } from "./ProductToolbar";

interface ProductsGridProps {
  params: SearchParams;
  viewMode: ViewMode;
}

export default function ProductsGrid({ params, viewMode }: ProductsGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState<MetaData | undefined>(undefined);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const hasParams = Object.values(params || {}).some(Boolean);
      const payload: Products = await getProducts(
        hasParams ? { ...params, limit: 12 } : { limit: 12 },
      );
      setProducts(payload.data);
      setMetadata(payload.metadata);
      setLoading(false);
    }

    fetchProducts();
  }, [params]);

  if (loading) return <SearchLoading />;

  return (
    <>
      {products?.length === 0 ? (
        <EmptySearch />
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              : "grid grid-cols-1 gap-4"
          }
        >
          {products?.map((product) => (
            <ProductsCard product={product} key={product._id} />
          ))}
        </div>
      )}
      {metadata && (
        <SearchPagination
          totalPages={metadata.numberOfPages}
          currentPage={metadata.currentPage}
        />
      )}
    </>
  );
}
