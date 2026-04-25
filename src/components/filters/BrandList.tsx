"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Brand } from "@/interfaces/brand.interface";

export default function BrandList({ brands }: { brands: Brand[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedBrands = searchParams.getAll("brand");

  const handleCheckboxChange = (brandId: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params) {
      const page = params.get("page");
      if (page) {
        params.delete("page");
      }
    }

    if (checked) {
      params.append("brand", brandId);
    } else {
      const allSelected = params.getAll("brand").filter((id) => id !== brandId);
      params.delete("brand");
      allSelected.forEach((id) => params.append("brand", id));
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-2 max-h-52 overflow-y-auto p-1">
      {brands?.map((brand) => (
        <div key={brand?._id} className="flex items-center gap-3 group">
          <Checkbox
            id={brand?._id}
            className="w-4 h-4"
            checked={selectedBrands.includes(brand?._id)}
            onCheckedChange={(checked: boolean) =>
              handleCheckboxChange(brand?._id, checked)
            }
          />
          <Label
            htmlFor={brand?._id}
            className="text-sm text-gray-800 group-hover:text-gray-900 transition-colors"
          >
            {brand?.name}
          </Label>
        </div>
      ))}
    </div>
  );
}
