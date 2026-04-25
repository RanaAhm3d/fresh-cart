export default function AddressesLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-gray-200"></div>
          <div className="flex-1">
            <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-100 rounded mb-3"></div>
            <div className="h-3 w-24 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-gray-200"></div>
          <div className="flex-1">
            <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-100 rounded mb-3"></div>
            <div className="h-3 w-24 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
