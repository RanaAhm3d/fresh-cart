export default function SavedAddressesLoading() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          className="p-4 rounded-xl border-2 border-gray-100 animate-pulse"
          key={index}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
            <div className="flex-1">
              <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-full bg-gray-100 rounded mb-1"></div>
              <div className="h-3 w-32 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
