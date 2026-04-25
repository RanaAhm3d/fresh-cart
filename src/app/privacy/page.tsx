import HeroSection from "@/components/shared/HeroSection/HeroSection";
import InfoCardsListing from "@/components/shared/terms&privacy/InfoCardsListing";
import LinkedButton from "@/components/shared/terms&privacy/LinkedButton";
import UpperCardListing from "@/components/shared/terms&privacy/UpperCardListing";
import { Separator } from "@/components/ui/separator";
import { FaShieldAlt } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export default function Privacy() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Privacy Policy"
        text="Privacy Policy"
        description="Last updated: Feburary 2026"
        icon={<FaShieldAlt size={30} />}
      />
      <section className="container mx-auto px-4 py-12">
        <UpperCardListing isPrivacy />
        <InfoCardsListing isPrivacy />
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
            url="/terms"
            text="View Terms of Service"
            className="bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/25"
          />
        </div>
      </section>
    </>
  );
}
