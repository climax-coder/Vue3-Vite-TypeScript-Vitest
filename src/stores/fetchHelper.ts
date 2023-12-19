// fetchHelper.ts
import { ProductResponse, ProductDetail } from "../types";

type FetchParams = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: HeadersInit;
};

async function fetchHelper<T>(params: FetchParams): Promise<T> {
  const { url, method = "GET", body, headers } = params;
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  };
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    throw error;
  }
}

export async function fetchProducts(
  pageNumber: number,
  limit: number
): Promise<ProductResponse> {
  return fetchHelper<ProductResponse>({
    url: `https://dummyjson.com/products?limit=${limit}&skip=${
      limit * pageNumber
    }&select=title,category,price,brand,stock,rating`,
  });
}

export async function fetchProductsByTitle(
  title: string,
  pageNumber: number,
  limit: number
): Promise<ProductResponse> {
  return fetchHelper<ProductResponse>({
    url: `https://dummyjson.com/products/search?q=${title}&limit=${limit}&skip=${
      limit * pageNumber
    }&select=title,category,price,brand,stock,rating`,
  });
}

export async function fetchProductDetail(id: number): Promise<ProductDetail> {
  return fetchHelper<ProductDetail>({
    url: `https://dummyjson.com/products/${id}`,
  });
}
