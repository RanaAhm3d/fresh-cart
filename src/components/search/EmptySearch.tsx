import { IoSearch } from "react-icons/io5";
import ClearFiltersButton from "../filters/ClearFiltersButton";

export default function EmptySearch() {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
        <IoSearch className="size-7.5 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        No Products Found
      </h3>
      <p className="text-gray-500 mb-6">
        Try adjusting your search or filters to find what you&apos;re looking
        for.
      </p>
      <ClearFiltersButton
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700"
        text="Clear Filters"
      />
    </div>
  );
}
