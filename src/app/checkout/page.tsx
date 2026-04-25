import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import { getUserCart } from "@/actions/cart.actions";
import { CartResponse } from "@/interfaces/cart.interface";
import EmptyCheckout from "@/components/checkout/EmptyCheckout";
import { getUserAddresses } from "@/actions/address.action";
import { AddressesResponse } from "@/interfaces/addresses.interface";

export default async function checkout() {
  const cart: CartResponse = await getUserCart();
  const addresses: AddressesResponse = await getUserAddresses();
  if (!cart || cart?.data?.products?.length === 0) {
    return <EmptyCheckout />;
  }
  return (
    <section className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <CheckoutHeader />
        <CheckoutForm cart={cart} addresses={addresses} />
      </div>
    </section>
  );
}
