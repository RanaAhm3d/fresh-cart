import Spinner from "./Spinner";

export default function CartLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center">
          <Spinner className="size-7.5 text-primary-600" />
        </div>
      </div>
      <p className="text-gray-600 mt-6 font-medium">Loading your cart...</p>
      <p className="text-gray-400 text-sm mt-1">Just a moment</p>
    </div>
  );
}
