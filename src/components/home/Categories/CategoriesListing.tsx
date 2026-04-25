import { getCategories } from "@/services/categories.service";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import { Categories } from "@/types/ApiResponse.type";
import CategoriesCard from "./CategoriesCard";

export default async function CategoriesListing({
  isHome,
}: {
  isHome?: boolean;
}) {
  const { data: categories }: Categories = await getCategories();

  return (
    <section className="container mx-auto px-4 py-10">
      {isHome && (
        <SectionHeader isCategories title="Shop By" subTitle="Categories" />
      )}
      <div
        className={`grid grid-cols-2 gap-4 ${isHome ? "md:grid-cols-3 lg:grid-cols-6" : "md:grid-cols-4 lg:grid-cols-5 sm:gap-6"}`}
      >
        {categories?.map((category) =>
          isHome ? (
            <CategoriesCard isHome key={category._id} category={category} />
          ) : (
            <CategoriesCard key={category._id} category={category} />
          ),
        )}
      </div>
    </section>
  );
}
