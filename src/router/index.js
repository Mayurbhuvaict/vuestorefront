import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/components/Register.vue';

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
