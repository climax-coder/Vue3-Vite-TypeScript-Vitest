<template>
  <div class="notification bg-white">
    <img :src="NotificationIcon" alt="Notification Icon" />
    <div class="notification-badge"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Notification',
  setup() {
    const NotificationIcon = '/src/assets/notification-bing.svg';
    return { NotificationIcon };
  }
})
</script>

<style scoped>
.notification {
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 3px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.notification img {
  width: 24px;
  height: 24px;
}

.notification-badge {
  position: absolute;
  right: -5px;
  top: -3px;
  width: 10px;
  height: 10px;
  background-color: #FFBC0F;
  border-radius: 50%;
}
</style>
