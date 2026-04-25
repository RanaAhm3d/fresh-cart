import { API_BASE_URL } from "./api";

export async function getBrands() {
  try {
    const response = await fetch(`${API_BASE_URL}/brands`);
    if (!response.ok) {
      throw new Error(response.statusText + "failed to fetch brands");
    }
    return response.json();
  } catch (error) {
    return error;
  }
}

export async function getSingleBrand(brandId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/brands/${brandId}`);
    if (!response.ok) {
      throw new Error(response.statusText + "failed to fetch brands");
    }
    return response.json();
  } catch (error) {
    return error;
  }
}
