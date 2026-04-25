import BrandsListing from "@/components/brands/BrandsListing";
import HeroSection from "@/components/shared/HeroSection/HeroSection";
import Loading from "@/components/shared/Loading/Loading";
import { Suspense } from "react";
import { FaTags } from "react-icons/fa6";

export default function BrandsPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Brands"
        text="Top Brands"
        description="Shop from your favorite brands"
        isBrands={true}
        icon={<FaTags size={26} />}
      />
      {/* Brands */}
      <Suspense fallback={<Loading text="brands" />}>
        <BrandsListing />
      </Suspense>
    </>
  );
}
