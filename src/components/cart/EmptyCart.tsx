import BoxOpen from "../shared/icons/BoxOpen";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const categories = [
  {
    title: "Electronics",
    href: "/categories",
  },
  {
    title: "Fashion",
    href: "/categories",
  },
  {
    title: "Home",
    href: "/categories",
  },
  {
    title: "Beauty",
    href: "/categories",
  },
];

export default function EmptyCart() {
  return (
    <>
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-8">
        <div className="max-w-md text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto">
              <BoxOpen className="size-20 text-gray-400" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-100 rounded-full blur-md"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Looks like you haven&apos;t added anything to your cart yet. Start
            exploring our products!
          </p>
          <Link
            className="inline-flex items-center gap-2 bg-linear-to-r from-primary-600 to-primary-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98]"
            href="/"
          >
            Start Shopping <FaArrowRightLong />
          </Link>
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-400 mb-4">Popular Categories</p>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Link
                  key={category.title}
                  className="px-4 py-2 bg-gray-50 hover:bg-primary-50 hover:text-primary-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
                  href={category.href}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
