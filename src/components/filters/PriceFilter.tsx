"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PriceFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlMin = searchParams.get("minPrice") || "";
  const urlMax = searchParams.get("maxPrice") || "";

  const updatePrice = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params) {
      const page = params.get("page");
      if (page) {
        params.delete("page");
      }
    }
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const Filters = [
    { label: "Under 500", value: "500" },
    { label: "Under 1K", value: "1000" },
    { label: "Under 5K", value: "5000" },
    { label: "Under 10K", value: "10000" },
  ];

  return (
    <div>
      <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Min (EGP)</label>
          <Input
            type="number"
            placeholder="0"
            value={urlMin}
            onChange={(e) => updatePrice("minPrice", e.target.value)}
            className="h-9"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Max (EGP)</label>
          <Input
            type="number"
            placeholder="No limit"
            value={urlMax}
            onChange={(e) => updatePrice("maxPrice", e.target.value)}
            className="h-9"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {Filters.map((range) => (
          <Button
            key={range.value}
            variant="outline"
            className={cn(
              "h-7 px-3 rounded-full text-xs font-medium transition-all",
              urlMax === range.value && urlMin === ""
                ? "bg-green-600 text-white border-green-600"
                : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200",
            )}
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("maxPrice", range.value);
              params.delete("minPrice");
              router.push(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            }}
          >
            {range.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
