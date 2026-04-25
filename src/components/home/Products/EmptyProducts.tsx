import BoxOpen from "@/components/shared/icons/BoxOpen";

export default function EmptyProducts() {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
        <BoxOpen className="size-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        No Products Found
      </h3>
    </div>
  );
}
