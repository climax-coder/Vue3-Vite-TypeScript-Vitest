<template>
  <div class="nav-bar bg-white vh-100 pt-5">
    <h3 class="ms-md-4 ms-2 mb-5">Sales.</h3>
    <ul class="nav flex-column">
      <li class="nav-item" v-for="item in menuItems" :key="item.path">
        <router-link :to="item.path" class="nav-link" :class="{ active: $route.path === item.path }">
          <component :is="item.icon" />
          <span class="ms-3 d-md-block d-none">{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClipboardIcon from '../assets/clipboard-tick.svg'
import DashboardIcon from '../assets/dashboard-tick.svg'
import CalendarIcon from '../assets/calendar-tick.svg'
import BagIcon from '../assets/bag-tick.svg'
import MessageIcon from '../assets/message-icon.svg'
import WalletIcon from '../assets/wallet-icon.svg'
import SettingIcon from '../assets/setting-icon.svg'
import QuestionIcon from '../assets/question-icon.svg'

const menuItems = [
  { path: '/', name: 'Dashboard', icon: DashboardIcon },
  { path: '/lab-test', name: 'Lab Test', icon: ClipboardIcon },
  { path: '/appointment', name: 'Appointment', icon: CalendarIcon },
  { path: '/medicine-order', name: 'Medicine Order', icon: BagIcon },
  { path: '/message', name: 'Message', icon: MessageIcon },
  { path: '/payment', name: 'Payment', icon: WalletIcon },
  { path: '/setting', name: 'Settings', icon: SettingIcon },
  { path: '/help', name: 'Help', icon: QuestionIcon }
]

export default defineComponent({
  name: 'LeftNavBar',
  setup() {
    return {
      menuItems
    }
  }
})
</script>

<style scoped>
.nav-bar {
  position: fixed;
  min-width: 230px;
}

.nav-bar h3 {
  font-family: "Poppins";
  color: var(--main-color);
}

.nav-item {
  padding: 10px 0;
}

.nav-link {
  display: flex;
  padding-left: 41px;
}

.nav-link span {
  font-size: 16px;
  font-family: "Poppins";
  color: var(--secondary-color);
}

.nav-link.active {
  color: var(--main-color);
  border-left: 3px solid var(--main-color);
  padding-left: 38px;
}

.nav-link.active span {
  color: var(--main-color);
}

.nav-link.active svg {
  stroke: var(--main-color);
  fill: var(--main-color);
}

ul.nav>li.nav-item:last-child {
  position: absolute;
  bottom: 0;
}

@media (max-width: 768px) {
  .nav-bar {
    min-width: 64px;
  }

  .nav-link {
    padding-left: 20px;
  }

  .nav-link.active {
    padding-left: 17px;
  }

  h3 {
    font-size: 20px;
  }
}
</style>
