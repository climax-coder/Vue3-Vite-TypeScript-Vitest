export interface Product {
  id: number;
  title: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  rating: number;
}

export interface ProductDetail {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
