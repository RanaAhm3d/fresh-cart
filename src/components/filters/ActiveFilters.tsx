"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { X, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Category } from "@/interfaces/category.interface";
import { Brand } from "@/interfaces/brand.interface";

interface ActiveFiltersProps {
  categories: Category[];
  brands: Brand[];
}

export default function ActiveFilters({
  categories,
  brands,
}: ActiveFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategoryIds = searchParams.getAll("category");
  const activeKeyword = searchParams.get("keyword");
  const activeBrandIds = searchParams.getAll("brand");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const removeFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === "price") {
      params.delete("minPrice");
      params.delete("maxPrice");
    } else if (key === "keyword") {
      params.delete("keyword");
    } else {
      const remaining = params.getAll(key).filter((v) => v !== value);
      params.delete(key);
      remaining.forEach((v) => params.append(key, v));
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const hasFilters =
    activeCategoryIds.length > 0 ||
    activeBrandIds.length > 0 ||
    minPrice ||
    activeKeyword ||
    maxPrice;
  if (!hasFilters) return null;

  return (
    <div className="mb-6 flex items-center gap-2 flex-wrap animate-in fade-in duration-300">
      <span className="text-sm text-gray-500 flex items-center gap-1">
        <Filter className="w-3 h-3 fill-gray-500" />
        Active:
      </span>

      {activeCategoryIds.map((id) => {
        const name = categories.find((c) => c._id === id)?.name || "Category";
        return (
          <Badge
            key={id}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary-100 text-primary-700 text-xs"
          >
            {name}
            <button
              onClick={() => removeFilter("category", id)}
              className="ml-1 hover:text-red-500 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        );
      })}

      {activeKeyword && (
        <Badge className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
          {activeKeyword}
          <button
            onClick={() => removeFilter("keyword")}
            className="ml-1 hover:text-red-500 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      )}

      {activeBrandIds.map((id) => {
        const name = brands.find((b) => b._id === id)?.name || "Brand";
        return (
          <Badge
            key={id}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-violet-100 text-violet-700 text-xs"
          >
            {name}
            <button
              onClick={() => removeFilter("brand", id)}
              className="ml-1 hover:text-red-500 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        );
      })}

      {(minPrice || maxPrice) && (
        <Badge className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs">
          {minPrice || "0"} - {maxPrice || "Any"} EGP
          <button
            onClick={() => removeFilter("price", "")}
            className="ml-1 hover:text-red-500 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      )}

      <button
        onClick={() => router.push(pathname, { scroll: false })}
        className="text-xs text-gray-500 hover:text-gray-700 underline ml-2"
      >
        Clear all
      </button>
    </div>
  );
}
