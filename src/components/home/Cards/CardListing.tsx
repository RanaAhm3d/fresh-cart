import Headset from "@/components/shared/icons/Headset";
import { FaShieldAlt } from "react-icons/fa";
import { FaArrowRotateLeft, FaTruck } from "react-icons/fa6";
import Card from "./Card";
import { ReactNode } from "react";

export type ColorType = "blue" | "emerald" | "orange" | "purple";

export interface CardItem {
  title: string;
  description: string;
  color: ColorType;
  icon: ReactNode;
}

const data: CardItem[] = [
  {
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    color: "blue",
    icon: <FaTruck size={20} />,
  },
  {
    title: "Secure Payment",
    description: "100% secure transactions",
    color: "emerald",
    icon: <FaShieldAlt size={20} />,
  },
  {
    title: "Easy Returns",
    description: "14-day return policy",
    color: "orange",
    icon: <FaArrowRotateLeft size={20} />,
  },
  {
    title: "24/7 Support",
    description: "Dedicated support team",
    color: "purple",
    icon: <Headset className="size-5" />,
  },
];

export default function CardListing() {
  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <Card {...item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
