import { Category } from "@/interfaces/category.interface";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";

interface CategoriesCardProps {
  category: Category;
  isHome?: boolean;
}

export default function CategoriesCard({
  category,
  isHome,
}: CategoriesCardProps) {
  return (
    <Link
      href={`/products?category=${category?._id}`}
      className={`bg-white p-4 text-center shadow-sm ${isHome ? "rounded-lg hover:shadow-md" : "rounded-2xl border border-gray-100 sm:p-6 hover:shadow-xl hover:border-primary-200 duration-300 hover:-translate-y-1"} transition-all group cursor-pointer`}
    >
      <div
        className={`overflow-hidden ${isHome ? "h-20 w-20  bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition" : "aspect-square rounded-xl bg-gray-50 mb-4"}`}
      >
        <Image
          src={category?.image}
          alt={category?.name}
          width={300}
          height={300}
          className={`w-full h-full object-cover ${!isHome && "group-hover:scale-110 transition-transform duration-500"}`}
        />
      </div>
      <h3
        className={`${isHome ? "font-medium" : "font-bold text-gray-900 text-center group-hover:text-primary-600 transition-colors"}`}
      >
        {category?.name}
      </h3>
      {!isHome && (
        <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-primary-600 flex items-center gap-1">
            View Subcategories
            <IoIosArrowRoundForward />
          </span>
        </div>
      )}
    </Link>
  );
}
