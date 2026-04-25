import HeroSection from "@/components/shared/HeroSection/HeroSection";
import InfoCardsListing from "@/components/shared/terms&privacy/InfoCardsListing";
import LinkedButton from "@/components/shared/terms&privacy/LinkedButton";
import UpperCardListing from "@/components/shared/terms&privacy/UpperCardListing";
import { Separator } from "@/components/ui/separator";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaFileContract,
} from "react-icons/fa6";

export default function Terms() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Terms of Service"
        text="Terms of Service"
        description="Last updated: Feburary 2026"
        icon={<FaFileContract size={30} />}
      />
      <section className="container mx-auto px-4 py-12">
        <UpperCardListing />
        <InfoCardsListing />
        <Separator className="my-12" />
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <LinkedButton
            icon={<FaArrowLeftLong />}
            url="/"
            text="Back to Home"
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          />
          <LinkedButton
            icon={<FaArrowRightLong />}
            url="/privacy"
            text="View Privacy Policy"
            className="bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/25"
          />
        </div>
      </section>
    </>
  );
}
