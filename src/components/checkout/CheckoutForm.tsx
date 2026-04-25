"use client";
import { CartResponse } from "@/interfaces/cart.interface";
import OrderSummary from "../cart/OrderSummary";
import ShippingAddress from "./ShippingAddress";
import { useForm } from "react-hook-form";
import {
  ShippingAddressPayloadType,
  shippingAddressSchema,
  defaultValues,
} from "@/schema/shippingAdress.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import PaymentMethod from "./PaymentMethod";
import { createCashOrder } from "@/actions/order.action";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import notify from "@/hooks/useNotification";
import { AddressesResponse } from "@/interfaces/addresses.interface";

export default function CheckoutForm({
  cart,
  addresses,
}: {
  cart: CartResponse;
  addresses: AddressesResponse;
}) {
  const { updateNumOfCartItems } = useCart();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<ShippingAddressPayloadType>({
    defaultValues,
    resolver: zodResolver(shippingAddressSchema),
    mode: "onSubmit",
  });
  async function onSubmit(formValues: ShippingAddressPayloadType) {
    const response = await createCashOrder(cart.cartId, formValues);
    if (response.status === "success") {
      if (getValues("paymentMethod") === "cash") {
        notify(response.message, "success");
        updateNumOfCartItems(0);
        router.push("/allorders");
      } else {
        open(response.session.url, "_self");
      }
    } else {
      notify(response.message, "error");
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ShippingAddress
            control={control}
            addresses={addresses}
            reset={reset}
            setValue={setValue}
          />
          <PaymentMethod control={control} />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary cart={cart} isCheckout isPending={isSubmitting} />
        </div>
      </div>
    </form>
  );
}
