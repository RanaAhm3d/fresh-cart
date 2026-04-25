import { ApiResponse } from "@/interfaces/apiResponse.interface";
import { Brand } from "@/interfaces/brand.interface";
import { Category } from "@/interfaces/category.interface";
import { Product } from "@/interfaces/product.interface";

export type Categories = ApiResponse<Category>;
export type Products = ApiResponse<Product>;
export type Brands = ApiResponse<Brand>;
