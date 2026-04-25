import Headset from "@/components/shared/icons/Headset";
import { FaShieldAlt, FaTruck } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";

const footerContent = [
  {
    icon: <FaTruck size={20} />,
    title: "Free Shipping",
    description: "On orders over 500 EGP",
  },
  {
    icon: <FaArrowRotateLeft size={20} />,
    title: "Easy Returns",
    description: "14-day return policy",
  },
  {
    icon: <FaShieldAlt size={20} />,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: <Headset className="size-5" />,
    title: "24/7 Support",
    description: "Contact us anytime",
  },
];

export default function UpperFooter() {
  return (
    <section className="bg-primary-50 border-y border-primary-100">
      <div className="container mx-auto px-4 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {footerContent.map((content, index) => (
            <div className="flex items-center gap-3" key={index}>
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
                {content.icon}
              </div>
              <div className="flex flex-col">
                <h4 className="font-semibold text-gray-900 text-sm">
                  {content.title}
                </h4>
                <p className="text-xs text-gray-500">{content.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
