import { AddressesResponse } from "@/interfaces/addresses.interface";
import { Suspense } from "react";
import { FaBookmark } from "react-icons/fa6";
import SavedAddressesLoading from "./SavedAddressesLoading";
import SavedAddressesListing from "./SavedAddressesListing";
import { ShippingAddressPayloadType } from "@/schema/shippingAdress.schema";
import { UseFormReset, UseFormSetValue } from "react-hook-form";

export default function SavedAddresses({
  addresses,
  setValue,
  reset
}: {
  addresses: AddressesResponse;
    setValue: UseFormSetValue<ShippingAddressPayloadType>;
  reset: UseFormReset<ShippingAddressPayloadType>;
}) {
  return (
    <div className="pb-5 border-b border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <FaBookmark className="text-primary-500" size={18} />
        <span className="font-semibold text-gray-800">Saved Addresses</span>
      </div>
      <Suspense fallback={<SavedAddressesLoading />}>
        <SavedAddressesListing addresses={addresses} setValue={setValue} reset={reset} />
      </Suspense>
    </div>
  );
}
