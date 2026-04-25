"use client";
import { Brand } from "@/interfaces/brand.interface";
import { Category } from "@/interfaces/category.interface";
import ProductToolbar from "./ProductToolbar";
import ActiveFilters from "../filters/ActiveFilters";
import ProductsGrid from "./ProductsGrid";
import { SearchParams } from "@/app/search/page";
import { useState } from "react";

export default function SearchProductsView({
  categories,
  brands,
  params,
}: {
  categories: Category[];
  brands: Brand[];
  params: SearchParams;
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  return (
    <div className="flex-1">
      <ProductToolbar viewMode={viewMode} setViewMode={setViewMode} />
      <ActiveFilters categories={categories} brands={brands} />
      <ProductsGrid viewMode={viewMode} params={params} />
    </div>
  );
}
