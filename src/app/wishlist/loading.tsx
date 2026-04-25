import Spinner from "@/components/shared/Loading/Spinner";

export default function loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="flex items-center flex-col space-y-2">
        <Spinner className="size-7 text-primary-600" />
        <p className="text-gray-500">Loading wishlist...</p>
      </div>
    </div>
  );
}
