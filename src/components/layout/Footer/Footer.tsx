import Links from "@/components/shared/Links/Links";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { FaCreditCard, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

const footerSubjects = [
  {
    title: "Shop",
    subTitles: [
      {
        subTitle: "All Products",
        url: "/products",
      },
      {
        subTitle: "Categories",
        url: "/categories",
      },
      {
        subTitle: "Brands",
        url: "/brands",
      },
      {
        subTitle: "Electronics",
        url: "/products?category=6439d2d167d9aa4ca970649f",
      },
      {
        subTitle: "Men's Fashion",
        url: "/products?category=6439d5b90049ad0b52b90048",
      },
      {
        subTitle: "Women's Fashion",
        url: "/products?category=6439d2d167d9aa4ca970649f",
      },
    ],
  },
  {
    title: "Account",
    subTitles: [
      {
        subTitle: "My Account",
        url: "/profile",
      },
      {
        subTitle: "Order History",
        url: "/allorders",
      },
      {
        subTitle: "Wishlist",
        url: "/wishlist",
      },
      {
        subTitle: "Shopping Cart",
        url: "/cart",
      },
      {
        subTitle: "Sign In",
        url: "/login",
      },
      {
        subTitle: "Create Account",
        url: "/register",
      },
    ],
  },
  {
    title: "Support",
    subTitles: [
      {
        subTitle: "Contact Us",
        url: "/contact",
      },
      {
        subTitle: "Help Center",
        url: "/help",
      },
      {
        subTitle: "Shipping Info",
        url: "/shipping",
      },
      {
        subTitle: "Returns & Refunds",
        url: "/returns",
      },
      {
        subTitle: "Track Order",
        url: "/track-order",
      },
    ],
  },
  {
    title: "Legal",
    subTitles: [
      {
        subTitle: "Privacy Policy",
        url: "/privacy",
      },
      {
        subTitle: "Terms of Service",
        url: "/terms",
      },
      {
        subTitle: "Cookie Policy",
        url: "/cookies",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1 bg-white mb-6 rounded-lg px-4 py-2"
            >
              <Image
                src="/freshcart-logo.svg"
                alt="Freshcart Logo"
                width={160}
                height={31}
                className="w-auto h-8"
              />
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>
            <div className="space-y-3 mb-6">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                <FaPhoneAlt className="text-primary-600" />
                <span>+1 (800) 123-4567</span>
              </a>
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                <IoMail className="text-primary-600" />
                <span>support@freshcart.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <FaLocationDot className="text-primary-600" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>
            <Links className="bg-gray-800 text-gray-400" />
          </div>
          {footerSubjects.map((subject, index) => (
            <div className="lg:col-span-2" key={index}>
              <h3 className="font-semibold text-lg mb-5">{subject.title}</h3>
              <ul className="space-y-3">
                {subject.subTitles.map((subTitle, index) => (
                  <li
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    key={index}
                  >
                    <Link href={subTitle.url}>{subTitle.subTitle}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Separator className="bg-gray-800" />
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center flex-col md:flex-row justify-between">
          <span className="text-gray-500 text-sm text-center md:text-left">
            © 2026 FreshCart. All rights reserved.
          </span>
          <div className="flex items-center gap-4 *:flex *:items-center *:gap-2 *:text-gray-500 *:text-sm">
            <div>
              <FaCreditCard />
              <span>Visa</span>
            </div>
            <div>
              <FaCreditCard />
              <span>Maastercard</span>
            </div>
            <div>
              <FaCreditCard />
              <span>PayPal</span>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
