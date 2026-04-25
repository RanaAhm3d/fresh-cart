import CategoryFilter from "./CategoryFilter";
import { Separator } from "../ui/separator";
import BrandFilter from "./BrandFilter";
import PriceFilter from "./PriceFilter";
import ClearFiltersButton from "./ClearFiltersButton";
import { Category } from "@/interfaces/category.interface";
import { Brand } from "@/interfaces/brand.interface";

export default function FilterSidebar({categories , brands} : {categories: Category[], brands: Brand[]}) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 space-y-6">
        <CategoryFilter categories={categories} />
        <Separator className="my-5 bg-gray-100" />
        <PriceFilter />
        <Separator className="my-5 bg-gray-100" />
        <BrandFilter brands={brands} />
        <Separator className="my-5 bg-gray-100" />
        <ClearFiltersButton className="w-full py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-300" text="Clear All Filters" />
      </div>
    </aside>
  );
}
