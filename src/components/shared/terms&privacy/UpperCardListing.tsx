import { FaFileContract } from "react-icons/fa6";
import UpperCard from "./UpperCard";
import { FaShieldAlt } from "react-icons/fa";

const privacyData = [
  {
    icon: <FaShieldAlt className="text-white" size={22} />,
    title: "Your Privacy Matters",
    paragraph:
      "This Privacy Policy describes how FreshCart collects, uses, and protects your personal information when you use our services. We are committed to ensuring that your privacy is protected.",
  },
];

const termsData = [
  {
    icon: <FaFileContract className="text-white" size={22} />,
    title: "Importance Notice",
    paragraph:
      "By accessing and using FreshCart, you accept and agree to be bound by the terms and provisions of this agreement. Please read these terms carefully before using our services.",
  },
];

export default function UpperCardListing({
  isPrivacy,
}: {
  isPrivacy?: boolean;
}) {
  const list = isPrivacy ? privacyData : termsData;
  return (
    <>
      {list.map((data, index) => (
        <UpperCard data={data} key={index} />
      ))}
    </>
  );
}
