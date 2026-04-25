"use client";
import { Category } from "@/interfaces/category.interface";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategories = searchParams.getAll("category");

  const handleCheckboxChange = (categoryId: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params) {
      const page = params.get("page");
      if (page) {
        params.delete("page");
      }
    }

    if (checked) {
      params.append("category", categoryId);
    } else {
      const allSelected = params
        .getAll("category")
        .filter((id) => id !== categoryId);
      params.delete("category");
      allSelected.forEach((id) => params.append("category", id));
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-2 max-h-52 overflow-y-auto p-1">
      {categories?.map((category) => (
        <div key={category?._id} className="flex items-center gap-3 group">
          <Checkbox
            id={category?._id}
            className="w-4 h-4"
            checked={selectedCategories.includes(category?._id)}
            onCheckedChange={(checked: boolean) =>
              handleCheckboxChange(category?._id, checked)
            }
          />
          <Label
            htmlFor={category?._id}
            className="text-sm text-gray-800 group-hover:text-gray-900 transition-colors"
          >
            {category?.name}
          </Label>
        </div>
      ))}
    </div>
  );
}
