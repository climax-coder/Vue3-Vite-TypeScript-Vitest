import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import LabTest from './views/LabTest.vue'
import Appointment from './views/Appointment.vue'
import MedicineOrder from './views/MedicineOrder.vue'
import Message from './views/Message.vue'
import Payment from './views/Payment.vue'
import SettingsPage from './views/SettingsPage.vue'
import Help from './views/Help.vue'
import ProductDetail from './views/ProductDetail.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Dashboard },
  { path: '/lab-test', component: LabTest },
  { path: '/appointment', component: Appointment },
  { path: '/medicine-order', component: MedicineOrder },
  { path: '/message', component: Message },
  { path: '/payment', component: Payment },
  { path: '/setting', component: SettingsPage },
  { path: '/help', component: Help },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductDetail,
    meta: { layout: 'FullWidthLayout' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
