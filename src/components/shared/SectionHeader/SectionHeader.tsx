import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

interface SectionHeaderProps {
  isCategories?: boolean;
  title: string;
  subTitle: string;
}

export default function SectionHeader({
  isCategories,
  title,
  subTitle,
}: SectionHeaderProps) {
  return (
    <section className="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div className="relative flex items-center gap-3 mb-8">
        <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {title} <span className="text-emerald-600">{subTitle}</span>
        </h2>
      </div>
      {isCategories && (
        <Link
          href="/categories"
          className="cursor-pointer self-end md:self-auto text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
        >
          View All Categories
          <FaArrowRightLong />
        </Link>
      )}
    </section>
  );
}
