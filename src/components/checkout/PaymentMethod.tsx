import { FaMoneyBill, FaShieldAlt } from "react-icons/fa";
import { FaCreditCard, FaWallet } from "react-icons/fa6";
import { Field, FieldContent, FieldGroup, FieldLabel } from "../ui/field";
import { Control, Controller } from "react-hook-form";
import { ShippingAddressPayloadType } from "@/schema/shippingAdress.schema";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Image from "next/image";

interface PaymentMethodProps {
  control: Control<ShippingAddressPayloadType>;
}

export default function PaymentMethod({ control }: PaymentMethodProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FaWallet />
          Payment Method
        </h2>
        <p className="text-primary-100 text-sm mt-1">
          Choose how you&apos;d like to pay
        </p>
      </div>
      <div className="p-6 space-y-4">
        <FieldGroup>
          {/* Cash */}
          <Controller
            name="paymentMethod"
            control={control}
            render={({ field, fieldState }) => (
              <RadioGroup
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key={"cash"}
                  htmlFor={`form-rhf-radiogroup-${"cash"}`}
                  className=" has-data-checked:border-green-600 has-data-checked:bg-green-50"
                >
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent className="flex flex-row items-start gap-4 group">
                      <div
                        className={`
                w-14 h-14 rounded-xl flex items-center justify-center transition-all
                ${
                  field.value === "cash"
                    ? "bg-linear-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                    : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                }
              `}
                      >
                        <FaMoneyBill className="size-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-bold text-gray-900">
                          Cash on Delivery
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Pay when your order arrives at your doorstep
                        </p>
                      </div>
                    </FieldContent>
                    <RadioGroupItem
                      value={"cash"}
                      id={`form-rhf-radiogroup-${"cash"}`}
                      aria-invalid={fieldState.invalid}
                      className="border-gray-300 text-primary-600 data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600"
                    />
                  </Field>
                </FieldLabel>
              </RadioGroup>
            )}
          />
          {/* Card */}
          <Controller
            name="paymentMethod"
            control={control}
            render={({ field, fieldState }) => (
              <RadioGroup
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <FieldLabel
                  key="card"
                  htmlFor={`form-rhf-radiogroup-card`}
                  className="has-data-checked:border-green-600 has-data-checked:bg-green-50"
                >
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent className="flex flex-row items-start gap-4 group">
                      <div
                        className={`
                w-14 h-14 rounded-xl flex items-center justify-center transition-all
                ${
                  field.value === "card"
                    ? "bg-linear-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                    : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                }
              `}
                      >
                        <FaCreditCard className="size-6" />
                      </div>

                      <div className="flex-1 text-left">
                        <h3 className="font-bold text-gray-900">Pay Online</h3>

                        <p className="text-sm text-gray-500 mt-0.5">
                          Secure payment with Credit/Debit Card via Stripe
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <Image
                            width={20}
                            height={20}
                            alt="Visa"
                            className="h-5"
                            src="https://img.icons8.com/color/48/visa.png"
                          />
                          <Image
                            width={20}
                            height={20}
                            alt="Mastercard"
                            className="h-5"
                            src="https://img.icons8.com/color/48/mastercard.png"
                          />
                          <Image
                            width={20}
                            height={20}
                            alt="Amex"
                            className="h-5"
                            src="https://img.icons8.com/color/48/amex.png"
                          />
                        </div>
                      </div>
                    </FieldContent>

                    <RadioGroupItem
                      value="card"
                      id="form-rhf-radiogroup-card"
                      aria-invalid={fieldState.invalid}
                      className="border-gray-300 text-primary-600 data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600"
                    />
                  </Field>
                </FieldLabel>
              </RadioGroup>
            )}
          />
        </FieldGroup>
        <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <FaShieldAlt className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">
              Secure &amp; Encrypted
            </p>
            <p className="text-xs text-green-600 mt-0.5">
              Your payment info is protected with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
