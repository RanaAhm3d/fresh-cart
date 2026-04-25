import { Address } from "./addresses.interface";

export interface UserResponse {
  active: boolean;
  addresses: Address[];
  createdAt: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  resetCodeVerified: boolean;
  role: string;
  updatedAt: string;
  wishlist: string[];
  _id: string;
}
