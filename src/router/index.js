import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import DemandeDetails from '@/components/DemandeDetails.vue';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    path: '/demande/:id',
    name: 'DemandeDetails',
    component: DemandeDetails,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
