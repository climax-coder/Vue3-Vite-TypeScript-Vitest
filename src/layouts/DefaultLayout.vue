<template>
  <div class="d-flex">
    <LeftNavBar />
    <div class="content bg-light pt-5">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LeftNavBar from '../components/LeftNavBar.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    LeftNavBar
  }
})
</script>

<style scoped>
.content {
  width: calc(100vw - 230px);
  padding: 0 40px;
  margin-left: 230px;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .content {
    width: calc(100vw - 64px);
    padding: 0 16px;
    margin-left: 64px;
  }
}
</style>
