import { API_BASE_URL } from "./api";

export async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(response.statusText + "Failed to fetch categories");
    }
    return response.json();
  } catch (error) {
    return error;
  }
}

export async function getSingleCategory(categoryId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`);
    if (!response.ok) {
      throw new Error(response.statusText + "Failed to fetch categories");
    }
    return response.json();
  } catch (error) {
    return error;
  }
}
