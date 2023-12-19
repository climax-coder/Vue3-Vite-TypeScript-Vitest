<template>
  <div class="search-container">
    <input type="text" placeholder="Search" class="form-control">
    <img :src="SearchIcon" alt="Search Icon" class="search-icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchInputSection',
  setup() {
    const SearchIcon = '/src/assets/search-icon.svg';
    return { SearchIcon };
  }
})
</script>

<style scoped>
.search-container {
  width: 50%;
  min-width: 150px;
  position: relative;
}

.search-container .form-control {
  height: 52px;
  padding-left: 40px;
}

.search-icon {
  position: absolute;
  height: 24px;
  width: 24px;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
