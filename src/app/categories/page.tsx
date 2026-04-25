import CategoriesListing from "@/components/home/Categories/CategoriesListing";
import HeroSection from "@/components/shared/HeroSection/HeroSection";
import Loading from "@/components/shared/Loading/Loading";
import { Suspense } from "react";
import { FaLayerGroup } from "react-icons/fa";

export default function Categories() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Categories"
        text="All Categories"
        description="Browse our wide range of product categories"
        icon={<FaLayerGroup size={26} />}
      />

      {/* Categories */}
      <Suspense fallback={<Loading text="categories" />}>
        <CategoriesListing />
      </Suspense>
    </>
  );
}
