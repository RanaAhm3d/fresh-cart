import { getUserCart } from "@/actions/cart.actions";
import CartFooter from "@/components/cart/CartFooter";
import CartHeader from "@/components/cart/CartHeader";
import CartItems from "@/components/cart/CartItems";
import EmptyCart from "@/components/cart/EmptyCart";
import OrderSummary from "@/components/cart/OrderSummary";
import CartLoading from "@/components/shared/Loading/CartLoading";
import { CartResponse } from "@/interfaces/cart.interface";
import { Suspense } from "react";

export default async function Cart() {
  const cart: CartResponse = await getUserCart();
  if (!cart?.numOfCartItems) return <EmptyCart />;

  return (
    <section className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Suspense fallback={<CartLoading />}>
          <CartHeader cartCount={cart?.numOfCartItems} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart?.data?.products.map((product) => (
                  <CartItems key={product?._id} product={product} />
                ))}
                <CartFooter />
              </div>
            </div>
            <div className="lg:col-span-1">
              <OrderSummary cart={cart} />
            </div>
          </div>
        </Suspense>
      </div>
    </section>
  );
}
