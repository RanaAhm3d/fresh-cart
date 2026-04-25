import { Brand } from "@/interfaces/brand.interface";
import BrandList from "./BrandList";

export default async function BrandFilter({ brands }: { brands: Brand[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Brands</h3>
      </div>
      <BrandList brands={brands} />
    </div>
  );
}
