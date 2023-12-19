<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <SearchInputSection />
      <div class="d-flex">
        <Notification />
        <Avatar avatarUrl="/src/assets/avatar.png" />
      </div>
    </div>
    <div class="pt-5">
      <h3>Products Information</h3>
      <div class="d-md-flex d-block search-option">
        <DebounceInput label="Title" placeholder="Enter Title" v-model="title" />
        <DebounceInput label="Brand" placeholder="Enter Brand" v-model="brand" class="search-brand" />
      </div>
      <ProductsList :title="title" :brand="brand" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref
} from 'vue';
import SearchInputSection from '../components/SearchInput.vue';
import Avatar from '../components/Avatar.vue';
import Notification from '../components/Notification.vue';
import ProductsList from '../components/ProductsList.vue'
import DebounceInput from '../components/DebounceInput.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    SearchInputSection,
    Avatar,
    Notification,
    ProductsList,
    DebounceInput
  },
  setup() {
    const title = ref('');
    const brand = ref('');
    onMounted(() => {
      title.value = '';
      brand.value = '';
    });
    return { title, brand };
  }
})
</script>

<style scoped>
h3 {
  color: #000;
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
}

.search-option {
  margin: 30px 0;
}

.search-brand {
  margin-left: 22px
}

@media (max-width: 768px) {
  .search-brand {
    margin-top: 16px;
    margin-left: 0;
  }
}
</style>
