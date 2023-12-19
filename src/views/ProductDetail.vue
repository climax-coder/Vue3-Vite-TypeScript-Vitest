<template>
  <div class="d-flex">
    <div class="w-100 min-vh-100">
      <div v-if="loading" class="d-flex align-items-center h-100">
        <div class="spinner-border text-secondary m-auto" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else-if="error" class="text-danger fw-bold">{{ error }}</div>
      <div v-else-if="product" class="container pt-5">
        <h1 class="text-center mt-3">{{ product.title }}</h1>
        <h3 class="my-3">{{ product.description }}</h3>
        <div class="d-md-flex d-block justify-content-between mb-5">
          <h4>Price: {{ product.price }}$</h4>
          <h4>Rating: {{ product.rating }} </h4>
          <h4>Stock: {{ product.stock }}</h4>
        </div>
        <CustomCarousel :images="product?.images" />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, toRefs } from "vue";
import { useProductStore } from "../stores/productDetail";
import { useRoute } from "vue-router";
import CustomCarousel from "../components/CustomCarousel.vue";

export default defineComponent({
  name: 'ProductDetail',
  components: {
    CustomCarousel,
  },
  setup() {
    const store = useProductStore();
    const route = useRoute();

    onMounted(() => {
      const id = Number(route.params.id);
      store.getProduct(id);
    });

    return { ...toRefs(store.$state) };
  },
});
</script>

<style scoped>
h1,
h3,
h4 {
  font-family: Poppins;
  font-weight: 500;
  line-height: normal;
}

.spinner-border {
  width: 5rem;
  height: 5rem;
}
</style>