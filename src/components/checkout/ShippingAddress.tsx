import House from "../shared/icons/House";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import {
  Control,
  Controller,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { ShippingAddressPayloadType } from "@/schema/shippingAdress.schema";
import { FaCity, FaLocationDot, FaPhone } from "react-icons/fa6";
import { PiMailboxBold } from "react-icons/pi";
import { AddressesResponse } from "@/interfaces/addresses.interface";
import SavedAddresses from "../profile/addresses/savedAddresses/SavedAddresses";
import { Input } from "../ui/input";

type ShippingAddressProps = {
  control: Control<ShippingAddressPayloadType>;
  addresses: AddressesResponse;
  setValue: UseFormSetValue<ShippingAddressPayloadType>; 
  reset: UseFormReset<ShippingAddressPayloadType>;
};

export default function ShippingAddress({
  control,
  addresses,
  setValue,
  reset,
}: ShippingAddressProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <House />
          Shipping Address
        </h2>
        <p className="text-primary-100 text-sm mt-1">
          Where should we deliver your order?
        </p>
      </div>
      <div className="p-6 space-y-5">
        {addresses?.results > 0 && (
          <SavedAddresses
            addresses={addresses}
            setValue={setValue}
            reset={reset}
          />
        )}
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <BsFillInfoCircleFill className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-blue-800 font-medium">
              Delivery Information
            </p>
            <p className="text-xs text-blue-600 mt-0.5">
              Please ensure your address is accurate for smooth delivery
            </p>
          </div>
        </div>
        <FieldGroup>
          {/* City */}
          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full ">
                <FieldLabel htmlFor={field.name}>
                  City <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="e.g. Cairo, Alexandria, Giza"
                    autoComplete="off"
                    className="px-4 h-12 pl-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-3 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <FaCity className="text-gray-500" />
                  </div>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Details */}
          <Controller
            name="details"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full ">
                <FieldLabel htmlFor={field.name}>
                  Street Adress <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="Street name, building number, floor, apartment..."
                    autoComplete="off"
                    className="px-4 h-12 pl-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />

                  <div className="absolute top-1/2 -translate-y-1/2 left-3 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <FaLocationDot className="text-gray-500" />
                  </div>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Phone Number */}
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full ">
                <FieldLabel htmlFor={field.name}>
                  Phone Number <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="01xxxxxxxxx"
                    autoComplete="off"
                    className="px-4 h-12 pl-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />

                  <div className="absolute top-1/2 -translate-y-1/2 left-3 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <FaPhone className="text-gray-500" />
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-3 text-sm text-gray-400">
                    Egyptian numbers only
                  </div>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Postal Code */}
          <Controller
            name="postalCode"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full ">
                <FieldLabel htmlFor={field.name}>
                  Postal Code <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="e.g. 12345"
                    autoComplete="off"
                    className="px-4 h-12 pl-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />

                  <div className=" absolute top-1/2 -translate-y-1/2 left-3 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <PiMailboxBold className="text-gray-500" />
                  </div>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
    </div>
  );
}
