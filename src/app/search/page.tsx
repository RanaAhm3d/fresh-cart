import FilterSidebar from "@/components/filters/FilterSidebar";
import SearchHeader from "@/components/search/SearchHeader";
import SearchProductsView from "@/components/search/SearchProductsView";
import { getBrands } from "@/services/brands.service";
import { getCategories } from "@/services/categories.service";
import { Brands, Categories } from "@/types/ApiResponse.type";

export interface SearchParams {
  brand?: string;
  category?: string;
  keyword?: string;
  priceLte?: number;
  sort?: string;
}

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const { data: categories }: Categories = await getCategories();
  const { data: brands }: Brands = await getBrands();

  return (
    <section className="min-h-screen bg-gray-50">
      <SearchHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <FilterSidebar categories={categories} brands={brands} />
          <SearchProductsView
            categories={categories}
            brands={brands}
            params={params}
          />
        </div>
      </main>
    </section>
  );
}
