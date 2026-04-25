import { API_BASE_URL } from "@/services/api";

export async function getProducts(params: {
  brand?: string | string[];
  category?: string | string[];
  keyword?: string;
  priceLte?: number;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const query = new URLSearchParams();

    const appendParam = (key: string, value: string | string[]) => {
      if (!value) return;

      const values = typeof value === "string" ? value.split(",") : value;

      values.forEach((v) => {
        if (v) query.append(key, v);
      });
    };
    const limit = params.limit || 40;
    query.append("limit", limit.toString());
    if (params.brand) appendParam("brand", params.brand);
    if (params.category) appendParam("category[in]", params.category);

    if (params.keyword) query.append("keyword", params.keyword);
    if (params.priceLte) query.append("price[lte]", params.priceLte.toString());
    if (params.sort) query.append("sort", params.sort);
    if (params.page) query.append("page", params.page.toString());

    const url = `${API_BASE_URL}/products?${query.toString()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
}
