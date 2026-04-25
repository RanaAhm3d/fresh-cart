import CardListing from "@/components/home/Cards/CardListing";
import CategoriesListing from "@/components/home/Categories/CategoriesListing";
import GetUpdates from "@/components/home/GetUpdates/GetUpdates";
import HomeSlider from "@/components/home/HomeSlider/HomeSlider";
import OfferCardsListing from "@/components/home/OfferCards/OfferCardsListing";
import ProductsListing from "@/components/home/Products/ProductsListing";

export default function Home() {
  return (
    <section>
      {/* Slider */}
      <HomeSlider />
      {/* Cards */}
      <CardListing />
      {/* <Categories /> */}
      <CategoriesListing isHome />
      {/* Offer cards */}
      <OfferCardsListing />
      {/* <Products /> */}
      <ProductsListing brand={""} category={""} isHome={true} />
      {/* Get Updates */}
      <GetUpdates />
    </section>
  );
}
