import ContactCardsListing from "@/components/contact/ContactCardsListing";
import ContactForm from "@/components/contact/ContactForm";
import HeroSection from "@/components/shared/HeroSection/HeroSection";
import { Headset } from "lucide-react";

export default function Contact() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Contact Us"
        text="Contact Us"
        description="We'd love to hear from you. Get in touch with our team"
        icon={<Headset size={34} />}
      />
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Information Cards  */}
          <ContactCardsListing />
          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
