import { getBrands } from "@/services/brands.service";
import BrandsCard from "./BrandsCard";
import { Brands } from "@/types/ApiResponse.type";

export default async function BrandsListing() {
      const { data: brands }: Brands = await getBrands();
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
        {brands?.map((brand) => (
          <BrandsCard brand={brand} key={brand?._id} />
        ))}
      </div>
    </section>
  );
}
