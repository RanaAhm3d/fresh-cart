"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Field } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SortProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentSort = searchParams.get("sort") || "relevance";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "relevance") {
      params.delete("sort"); 
    } else {
      params.set("sort", value);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2 min-w-50">
      <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
      <Field className="w-full">
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="-price">Price: High to Low</SelectItem>
              <SelectItem value="-ratingsAverage">
                Rating: High to Low
              </SelectItem>
              <SelectItem value="title">Name: A to Z</SelectItem>
              <SelectItem value="-title">Name: Z to A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}
