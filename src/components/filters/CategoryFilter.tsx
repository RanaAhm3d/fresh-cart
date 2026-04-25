import CategoryList from "./CategoryList";
import { Category } from "@/interfaces/category.interface";

export default async function CategoryFilter({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Categories</h3>
      </div>
      <CategoryList categories={categories} />
    </div>
  );
}
