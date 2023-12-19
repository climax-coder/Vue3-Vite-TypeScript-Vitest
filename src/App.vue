<template>
  <component :is="layout"></component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import FullWidthLayout from './layouts/FullWidthLayout.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'

export default defineComponent({
  name: 'App',
  components: {
    FullWidthLayout,
    DefaultLayout
  },
  setup() {
    const route = useRoute()
    const layout = computed(() => {
      return route.meta.layout || 'DefaultLayout'
    })
    return { layout }
  }
})
</script>
