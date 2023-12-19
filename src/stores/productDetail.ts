import { defineStore } from "pinia";
import { ProductDetail } from "../types";
import { fetchProductDetail } from "./fetchHelper";

export const useProductStore = defineStore("product", {
  state: (): {
    product: ProductDetail | null;
    loading: boolean;
    error: string | null;
  } => ({
    product: null,
    loading: false,
    error: null,
  }),

  actions: {
    async getProduct(id: number) {
      this.loading = true;
      try {
        this.product = await fetchProductDetail(id);
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
