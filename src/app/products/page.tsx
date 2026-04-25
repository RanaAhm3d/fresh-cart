import ProductsListing from "@/components/home/Products/ProductsListing";
import HeroSection from "@/components/shared/HeroSection/HeroSection";
import BoxOpen from "@/components/shared/icons/BoxOpen";
import Loading from "@/components/shared/Loading/Loading";
import { Brand } from "@/interfaces/brand.interface";
import { Category } from "@/interfaces/category.interface";
import { getSingleBrand } from "@/services/brands.service";
import { getSingleCategory } from "@/services/categories.service";
import { Suspense } from "react";

interface ProductsProps {
  searchParams: Promise<{ brand: string; category: string }>;
}

export default async function Products({ searchParams }: ProductsProps) {
  const { brand, category } = await searchParams;
  const { data: brandInfo }: { data: Brand } = await getSingleBrand(brand);
  const { data: categoryInfo }: { data: Category } =
    await getSingleCategory(category);
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={brand ? "Brands" : category ? "Categories" : "All Products"}
        text={
          brand
            ? `${brandInfo?.name}`
            : category
              ? `${categoryInfo?.name}`
              : "All Products"
        }
        description={
          brand
            ? `Shop ${brandInfo?.name} products`
            : category
              ? `Shop ${categoryInfo?.name} products`
              : "Explore our complete product collection"
        }
        icon={<BoxOpen className="size-10" />}
        brand={brandInfo}
        category={categoryInfo}
      />
      <Suspense fallback={<Loading text={"products"} />}>
        <ProductsListing
          isProducts={true}
          brand={brand}
          category={category}
          brandName={brandInfo?.name}
          categoryName={categoryInfo?.name}
        />
      </Suspense>
    </>
  );
}
