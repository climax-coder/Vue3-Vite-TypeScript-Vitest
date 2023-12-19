<template>
  <div class="avatar">
    <img :src="avatarUrl" :alt="altText">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Avatar',
  props: {
    avatarUrl: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      default: 'User Avatar'
    }
  }
})
</script>

<style scoped>
.avatar {
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background-color: lightgray;
}
</style>
