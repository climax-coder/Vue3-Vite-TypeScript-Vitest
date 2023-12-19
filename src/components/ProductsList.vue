<template>
  <div class="product-list table-responsive" ref="productList">
    <table class="table table-hover">
      <thead class="thead-light sticky-top">
        <tr>
          <th scope="col"><input type="checkbox" /></th>
          <sortable-table-header ref="titleHeader" title="Title" field="title" @sort="sortTitle" :sortField="sortField"
            :sortOrder="sortOrder" />
          <th scope="col">Category</th>
          <sortable-table-header ref="brandHeader" title="Brand" field="brand" @sort="sortBrand" :sortField="sortField"
            :sortOrder="sortOrder" />
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Rating</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td><input type="checkbox" /></td>
          <td class="product-title"><router-link :to="`/product/${product.id}`">{{ product.title }}</router-link></td>
          <td>{{ product.category }}</td>
          <td>{{ product.brand }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.rating }}</td>
        </tr>
        <tr v-show="loading">
          <td colspan="7" class="text-center">
            <div class="spinner-border text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </td>
        </tr>
        <tr v-show="error">
          <td colspan="7" class="text-center">
            <span class="text-danger fw-bold">{{ error }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="7" class="text-center">
            <v3-infinite-loading ref="infiniteLoading" :key="title" @infinite="infiniteHandler"></v3-infinite-loading>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch, nextTick, computed } from 'vue';
import { useProductsStore } from '../stores/products'
import V3InfiniteLoading from 'v3-infinite-loading';
import { debounce } from 'lodash';
import { Product } from '../types';
import SortableTableHeader from './SortableTableHeader.vue';

export default defineComponent({
  name: 'ProductsList',
  components: {
    SortableTableHeader,
    V3InfiniteLoading
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    brand: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const store = useProductsStore();
    const pageNumber = ref(0);
    const infiniteLoading = ref<any>(null);
    const fetching = ref(false);
    const sortField = ref('');
    const sortOrder = ref('asc');

    onMounted(() => {
      infiniteLoading.value = ref('infiniteLoading');
      nextTick();
      store.initialize();
    });

    const fetchProducts = async () => {
      fetching.value = true;
      await store.getProducts(pageNumber.value);
      pageNumber.value++;
      fetching.value = false;
    };

    const fetchProductsByTitle = async () => {
      fetching.value = true;
      await store.getProductsByTitle(props.title, pageNumber.value);
      pageNumber.value++;
      fetching.value = false;
    };

    const infiniteHandler = async ($state: { loaded: () => void; complete: () => void; }) => {
      if (fetching.value) {
        return;
      }
      if (props.title) {
        await fetchProductsByTitle();
      } else {
        await fetchProducts();
      }
      if (store.$state.products.length < store.$state.total) {
        $state.loaded();
      } else if (store.$state.products.length === store.$state.total) {
        $state.complete();
      }
    };

    watch(() => props.title, debounce(async (newVal: any, oldVal: any) => {
      if (newVal !== oldVal) {
        nextTick();
        pageNumber.value = 0;
        store.initialize();
        fetching.value = false;
      }
    }, 0));

    // To avoid anonymous functions in templates.
    const sortTitle = () => sortHandler('title');
    const sortBrand = () => sortHandler('brand');

    const sortHandler = (field: string) => {
      if (sortField.value === field) {
        if (sortOrder.value === 'asc') {
          sortOrder.value = 'desc';
        } else if (sortOrder.value === 'desc') {
          sortOrder.value = '';
          sortField.value = '';
        } else {
          sortOrder.value = 'asc';
        }
      } else {
        sortField.value = field;
        sortOrder.value = 'asc';
      }
    };

    const filteredProducts = computed(() => {
      let products: Product[] = [...store.$state.products];
      // No search rest api with brand in the backend
      if (props.brand) {
        products = products.filter(product => product.brand.toLowerCase().includes(props.brand.toLowerCase()));
      }
      if (sortField.value !== '') {
        products = products.sort((a: any, b: any) => {
          if (sortOrder.value === 'asc') {
            return a[sortField.value].localeCompare(b[sortField.value]);
          } else {
            return b[sortField.value].localeCompare(a[sortField.value]);
          }
        });
      }
      return products;
    });

    return { ...toRefs(store.$state), filteredProducts, infiniteHandler, infiniteLoading, sortTitle, sortBrand, sortField, sortOrder };
  }
});
</script>


<style scoped>
.product-list {
  position: sticky -webkit-sticky;
  height: calc(100vh - 350px);
  overflow: scroll;
  -ms-overflow-style: none;
}

/* hide ::-webkit-scrollbar */
.product-list::-webkit-scrollbar {
  display: none;
}

.product-list table th {
  color: #000;
  font-family: "Lato";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  padding: 15px;
}

.product-list table td {
  color: #000;
  font-family: "Poppins";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 15px;
}

.product-list .product-title a {
  color: var(--main-color);
  text-decoration: none;
}


@media (max-width: 768px) {
  .product-list {
    height: calc(100vh - 450px);
  }
}
</style>
