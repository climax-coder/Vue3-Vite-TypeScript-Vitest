import { describe, it, expect, beforeEach, vi } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import ProductsList from "../components/ProductsList.vue";
import { useProductsStore } from "../stores/products";
import { Store } from "pinia";
import { Product } from "../types";

const mockData = {
  products: [
    {
      id: 1,
      title: "iPhone 9",
      category: "smartphones",
      price: 549,
      brand: "Apple",
      stock: 94,
      rating: 4.69,
    },
    {
      id: 2,
      title: "iPhone X",
      category: "smartphones",
      price: 899,
      brand: "Apple",
      stock: 34,
      rating: 4.44,
    },
    {
      id: 3,
      title: "Samsung Universe 9",
      category: "smartphones",
      price: 1249,
      brand: "Samsung",
      stock: 36,
      rating: 4.09,
    },
    {
      id: 4,
      title: "OPPOF19",
      category: "smartphones",
      price: 280,
      brand: "OPPO",
      stock: 123,
      rating: 4.3,
    },
    {
      id: 5,
      title: "Huawei P30",
      category: "smartphones",
      price: 499,
      brand: "Huawei",
      stock: 32,
      rating: 4.09,
    },
  ],
  total: 100,
  loading: false,
  error: null,
};

describe("ProductsList.vue", () => {
  let wrapper: VueWrapper<any, any>;
  let productsStore: Store<
    "products",
    {
      products: Product[];
      loading: boolean;
      error: string | null;
      total: number;
    },
    {},
    {
      initialize(): void;
      getProducts(pageNumber: number): Promise<void>;
      getProductsByTitle(title: string, pageNumber: number): Promise<void>;
    }
  >;

  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
    });

    wrapper = mount(ProductsList, {
      global: {
        plugins: [pinia],
      },
      props: {
        title: "",
        brand: "",
      },
    });

    productsStore = useProductsStore();
    productsStore.$state = mockData;
  });

  it("renders a list of products", () => {
    // Check that the component rendered without errors
    expect(wrapper.element).toBeTruthy();

    const productItems = wrapper.findAll(".product-title");
    expect(productItems.length).toBe(mockData.products.length);

    // Check that table rows rendered correctly
    const tableRows = wrapper.findAll("tbody > tr");
    for (let i = 0; i < mockData.products.length; i++) {
      const row = tableRows[i];
      const product = mockData.products[i];
      expect(row.find("td:nth-child(2)").text()).toBe(product.title);
      expect(row.find("td:nth-child(3)").text()).toBe(product.category);
      expect(row.find("td:nth-child(4)").text()).toBe(product.brand);
      expect(row.find("td:nth-child(5)").text()).toBe(String(product.price));
      expect(row.find("td:nth-child(6)").text()).toBe(String(product.stock));
      expect(row.find("td:nth-child(7)").text()).toBe(String(product.rating));
    }

    // Check loading row
    expect(tableRows[mockData.products.length].isVisible()).toBe(
      mockData.loading
    );
    // Check error row
    if (mockData.error) {
      expect(tableRows[mockData.products.length + 1].isVisible()).toBe(true);
      expect(tableRows[mockData.products.length + 1].text()).toBe(
        mockData.error
      );
    } else {
      expect(tableRows[mockData.products.length + 1].isVisible()).toBe(false);
    }
    // Check infinite loading
    expect(tableRows[mockData.products.length + 2].isVisible()).toBe(true);
  });

  it("changes sort order when title header is clicked", async () => {
    const titleHeader = wrapper.findComponent({ ref: "titleHeader" });

    await titleHeader.trigger("click");

    expect(wrapper.vm.sortField).toBe("title");
    expect(wrapper.vm.sortOrder).toBe("asc");

    await titleHeader.trigger("click");

    expect(wrapper.vm.sortField).toBe("title");
    expect(wrapper.vm.sortOrder).toBe("desc");

    await titleHeader.trigger("click");

    expect(wrapper.vm.sortField).toBe("");
    expect(wrapper.vm.sortOrder).toBe("");
  });

  it("changes sort order when brand header is clicked", async () => {
    const brandHeader = wrapper.findComponent({ ref: "brandHeader" });

    await brandHeader.trigger("click");

    expect(wrapper.vm.sortField).toBe("brand");
    expect(wrapper.vm.sortOrder).toBe("asc");

    await brandHeader.trigger("click");

    expect(wrapper.vm.sortField).toBe("brand");
    expect(wrapper.vm.sortOrder).toBe("desc");

    await brandHeader.trigger("click");

    expect(wrapper.vm.sortField).toBe("");
    expect(wrapper.vm.sortOrder).toBe("");
  });
});
