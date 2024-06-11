import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/components/Register.vue';
import Profile from '@/components/Profile.vue';
import ProductDetail from '@/components/ProductDetail.vue';

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
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
