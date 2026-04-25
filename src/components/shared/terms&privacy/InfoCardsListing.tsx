import { FaLock, FaShareAlt, FaTruck, FaUserCheck } from "react-icons/fa";
import {
  FaArrowRotateLeft,
  FaClock,
  FaCookie,
  FaCreditCard,
  FaDatabase,
  FaHandshakeSimple,
  FaIdCard,
  FaScaleBalanced,
  FaUserShield,
} from "react-icons/fa6";
import InfoCards from "./InfoCards";
import { IoMail } from "react-icons/io5";

const privacyInfo = [
  {
    icon: <FaDatabase className="text-primary-600 group-hover:text-white" size={22} />,
    title: "Information We Collect",
    content: [
      "Personal Data: Name, email address, phone number, and shipping address.",
      "Payment Data: Credit card information processed securely through our payment providers.",
      "Technical Data: IP address, browser type, device information, and access times.",
      "Usage Data: Pages viewed, products browsed, and actions taken within our platform.",
    ],
  },
  {
    icon: <FaUserShield className="text-primary-600 group-hover:text-white" size={22} />,
    title: "How We Use Your Information",
    content: [
      "To process and fulfill your orders.",
      "To send order confirmations and shipping updates.",
      "To provide customer support and respond to inquiries.",
      "To improve our products, services, and user experience.",
      "To send promotional communications (with your consent).",
    ],
  },
  {
    icon: <FaLock className="text-primary-600 group-hover:text-white" size={22} />,
    title: "Data Protection",
    content: [
      "We implement industry-standard encryption (SSL/TLS) for all data transfers.",
      "Payment information is processed by PCI-compliant payment providers.",
      "We conduct regular security audits and vulnerability assessments.",
      "Access to personal data is restricted to authorized personnel only.",
    ],
  },
  {
    icon: <FaShareAlt className="text-primary-600 group-hover:text-white" size={22} />,
    title: "Information Sharing",
    content: [
      "We do not sell, trade, or rent your personal information to third parties.",
      "We may share data with trusted service providers who assist in our operations.",
      "We may disclose information when required by law or to protect our rights.",
    ],
  },
  {
    icon: <FaUserCheck className="text-primary-600 group-hover:text-white" size={22} />,
    title: "Your Rights",
    content: [
      "Access: Request a copy of your personal data.",
      "Rectification: Request correction of inaccurate data.",
      "Erasure: Request deletion of your personal data.",
      "Portability: Request your data in a portable format.",
      "Opt-out: Unsubscribe from marketing communications at any time.",
    ],
  },
  {
    icon: <FaCookie className="text-primary-600 group-hover:text-white" size={22} />,
    title: "Cookies",
    content: [
      "Disabling cookies may affect the functionality of certain features.",
      "You can control cookie settings through your browser preferences.",
      "Disabling cookies may affect the functionality of certain features.",
    ],
  },
  {
    icon: (
      <FaClock size={22} className="text-primary-600 group-hover:text-white" />
    ),
    title: "Data Retention",
    paragraph:
      "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request.",
  },
  {
    icon: (
      <IoMail size={22} className="text-primary-600 group-hover:text-white" />
    ),
    title: "Contact Us",
    paragraph:
      "For questions about this Privacy Policy or to exercise your rights, contact our Data Protection Officer at",
    email: "privacy@freshcart.com",
  },
];

const termsInfo = [
  {
    icon: (
      <FaHandshakeSimple
        size={22}
        className="text-primary-600 group-hover:text-white"
      />
    ),
    title: "Acceptance of Terms",
    content: [
      "By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.",
      "If you do not agree to these Terms, you must not access or use the Service.",
      "We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting.",
    ],
  },
  {
    icon: (
      <FaUserCheck
        size={22}
        className="text-primary-600 group-hover:text-white"
      />
    ),
    title: "User Eligibility",
    content: [
      "The Service is intended for users who are at least eighteen (18) years of age.",
      "By using the Service, you represent and warrant that you are of legal age to form a binding contract.",
      "If you are accessing the Service on behalf of a legal entity, you represent that you have the authority to bind such entity.",
    ],
  },
  {
    icon: (
      <FaIdCard size={22} className="text-primary-600 group-hover:text-white" />
    ),
    title: "Account Registration",
    content: [
      "You may be required to create an account to access certain features of the Service.",
      "You agree to provide accurate, current, and complete information during registration.",
      "You are solely responsible for maintaining the confidentiality of your account credentials.",
      "You agree to notify us immediately of any unauthorized use of your account.",
    ],
  },
  {
    icon: (
      <FaCreditCard
        size={22}
        className="text-primary-600 group-hover:text-white"
      />
    ),
    title: "Orders and Payments",
    content: [
      "All orders placed through the Service are subject to acceptance and availability.",
      "Prices are subject to change without notice prior to order confirmation.",
      "Payment must be made in full at the time of purchase through approved payment methods.",
      "We reserve the right to refuse or cancel any order at our sole discretion.",
    ],
  },
  {
    icon: (
      <FaTruck size={22} className="text-primary-600 group-hover:text-white" />
    ),
    title: "Shipping and Delivery",
    content: [
      "Shipping times are estimates only and are not guaranteed.",
      "Risk of loss and title for items purchased pass to you upon delivery to the carrier.",
      "We are not responsible for delays caused by carriers, customs, or other factors beyond our control.",
    ],
  },
  {
    icon: (
      <FaArrowRotateLeft
        size={22}
        className="text-primary-600 group-hover:text-white"
      />
    ),
    title: "Returns and Refunds",
    content: [
      "Our return policy allows returns within 14 days of delivery for most items.",
      "Products must be unused and in original packaging.",
      "Refunds will be processed within 5-7 business days after receiving the returned item.",
    ],
  },
  {
    icon: (
      <FaScaleBalanced
        size={22}
        className="text-primary-600 group-hover:text-white"
      />
    ),
    title: "Limitaion of Liability",
    paragraph:
      "To the maximum extent permitted by applicable law, FreshCart shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.",
  },
  {
    icon: (
      <IoMail size={22} className="text-primary-600 group-hover:text-white" />
    ),
    title: "Contact Us",
    paragraph:
      "If you have any questions about these Terms, please contact us at",
    email: "support@freshcart.com",
  },
];

export default function InfoCardsListing({
  isPrivacy,
}: {
  isPrivacy?: boolean;
}) {
  const list = isPrivacy ? privacyInfo : termsInfo;
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {list.map((item, index) => (
        <InfoCards data={item} num={index} key={index} />
      ))}
    </section>
  );
}
