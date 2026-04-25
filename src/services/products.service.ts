import { API_BASE_URL } from "./api";

export async function getSingleProduct(productId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!response.ok) {
      throw new Error(response.statusText + "Failed to fetch product details");
    }
    return response.json();
  } catch (error) {
    return error;
  }
}
