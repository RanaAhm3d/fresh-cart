import { getUserCart } from "@/actions/cart.actions";
import { CartResponse } from "@/interfaces/cart.interface";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext({
  numOfCartItems: 0,
  cartItemsIds: [] as string[],
  updateNumOfCartItems: (count: number) => {},
  setCartItemsIds: (ids: string[]) => {},
  cart: null as CartResponse | null,
  setCart: (cart: CartResponse | null) => {},
});

export default function CartProvider({ children }: { children: ReactNode }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartItemsIds, setCartItemsIds] = useState<string[]>([]);
  const [cart, setCart] = useState<CartResponse | null>(null);

  useEffect(() => {
    async function fetchCart() {
      const response = await getUserCart();
      if (response?.status === "success") {
        setNumOfCartItems(response.data.numOfCartItems);
        setCart(response.data);
        setCartItemsIds(
          response.data.products.map(
            (item: { product: { _id: string } }) => item.product._id,
          ),
        );
      }
    }
    fetchCart();
  }, []);

  function updateNumOfCartItems(count: number) {
    setNumOfCartItems(count);
  }

  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        updateNumOfCartItems,
        cartItemsIds,
        setCartItemsIds,
        cart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
