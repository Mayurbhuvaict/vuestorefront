import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/components/Register.vue';
import Profile from '@/components/Profile.vue';

const routes = [
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
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
