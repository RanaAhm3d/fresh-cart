"use client";
import { Address, AddressesResponse } from "@/interfaces/addresses.interface";
import { ShippingAddressPayloadType } from "@/schema/shippingAdress.schema";
import { useState } from "react";
import { UseFormReset, UseFormSetValue } from "react-hook-form";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCheck, FaCity, FaLocationDot, FaPlus } from "react-icons/fa6";

export default function SavedAddressesListing({
  addresses,
  setValue,
  reset,
}: {
  addresses: AddressesResponse;
  setValue: UseFormSetValue<ShippingAddressPayloadType>;
  reset: UseFormReset<ShippingAddressPayloadType>;
}) {
  const [selectedId, setSelectedId] = useState<string | null>("new");

  const handleSelect = (address: Address) => {
    setSelectedId(address._id);
    setValue("city", address.city);
    setValue("details", address.details);
    setValue("phone", address.phone);
    setValue("postalCode", "");
  };

  const handleNewAddress = () => {
    setSelectedId("new");
    reset({
      city: "",
      details: "",
      phone: "",
      postalCode: "",
    });
  };
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-gray-600">
        Select a saved address or enter a new one below
      </p>

      {addresses.data.map((address) => (
        <button
          key={address._id}
          type="button"
          onClick={() => handleSelect(address)}
          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
            selectedId === address._id
              ? "border-primary-500 bg-primary-50 ring-2 ring-primary-500/20"
              : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${selectedId === address._id ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-500"}`}
            >
              {selectedId === address._id ? <FaCheck /> : <FaLocationDot />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900">{address.city}</p>
              <p className="text-sm text-gray-600 mt-0.5 line-clamp-1">
                {address.details}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <FaPhoneAlt />
                  {address.phone}
                </span>
                <span className="flex items-center gap-1">
                  <FaCity />
                  {address.city}
                </span>
              </div>
            </div>
          </div>
        </button>
      ))}
      <button
        type="button"
        onClick={handleNewAddress}
        className={`w-full p-4 rounded-xl border-2 border-dashed text-left transition-all ${
          selectedId === "new"
            ? " border-primary-500 bg-primary-50"
            : "border-gray-300 hover:border-primary-300 hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedId === "new" ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-500"} `}
          >
            <FaPlus />
          </div>
          <div>
            <p
              className={`font-semibold ${selectedId === "new" ? "text-primary-700" : "text-gray-700"}`}
            >
              Use a different address
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Enter a new shipping address manually
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
