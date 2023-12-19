import { defineStore } from "pinia";
import { Product } from "../types";
import { fetchProducts, fetchProductsByTitle } from "./fetchHelper";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null,
    total: 0,
  }),

  actions: {
    initialize() {
      this.products = [];
      this.loading = false;
      this.error = null;
      this.total = 0;
    },

    async getProducts(pageNumber: number) {
      this.loading = true;
      try {
        const data = await fetchProducts(pageNumber, 20);
        this.products = [...this.products, ...data.products];
        this.total = data.total;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async getProductsByTitle(title: string, pageNumber: number) {
      this.loading = true;
      try {
        const data = await fetchProductsByTitle(title, pageNumber, 20);
        this.products = [...this.products, ...data.products];
        this.total = data.total;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
