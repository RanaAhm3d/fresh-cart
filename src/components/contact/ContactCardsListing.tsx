import { FaPhoneAlt } from "react-icons/fa";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import ContactInfoCards from "./ContactInfoCards";
import Links from "../shared/Links/Links";

const contactInfo = [
  {
    icon: <FaPhoneAlt className="text-primary-600" />,
    title: "Phone",
    description: "Mon-Fri from 8am to 6pm",
    link: "+1 (800) 123-4567",
    href: "+180001234567",
  },
  {
    icon: <IoMail className="text-primary-600" />,
    title: "Email",
    description: "We'll respond within 24 hours",
    link: "support@freshcart.com",
    href: "support@freshcart.com",
  },
  {
    icon: <FaLocationDot className="text-primary-600" />,
    title: "Office",
    description: `123 Commerce Street New York, NY 10001 United States`,
  },
  {
    icon: <FaClock className="text-primary-600" />,
    title: "Business Hours",
    description:
      "Monday - Friday: 8am - 6pm Saturday: 9am - 4pm Sunday: Closed",
  },
];

export default function ContactCardsListing() {
  return (
    <section className="lg:col-span-1 space-y-6">
      {contactInfo?.map((contact, index) => (
        <ContactInfoCards contactInfo={contact} key={index} />
      ))}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
        <Links className="bg-gray-100 text-gray-500" />
      </div>
    </section>
  );
}
