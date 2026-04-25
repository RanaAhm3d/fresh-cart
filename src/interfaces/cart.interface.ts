import { Product } from "./product.interface";

export interface CartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartDetails;
}

export interface CartDetails {
  _id: string;
  cartOwner: string;
  products: ProductCart[];
  createdAt: string;
  updatedAt: string;
  totalCartPrice: number;
}

export interface ProductCart {
  count: number;
  _id: string;
  product: Product;
  price: number;
}
