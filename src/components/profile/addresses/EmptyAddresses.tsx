import { FaLocationDot, FaPlus } from "react-icons/fa6";

export default function EmptyAddresses() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
        <FaLocationDot className="size-7.5 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">No Addresses Yet</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        Add your first delivery address to make checkout faster and easier.
      </p>
      <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25">
        <FaPlus />
        Add Your First Address
      </button>
    </div>
  );
}
