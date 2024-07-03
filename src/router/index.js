import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/components/Register.vue';
import Profile from '@/components/Profile.vue';
import ProductDetail from '@/components/ProductDetail.vue';
import Login from '@/components/Login.vue';
import ForgotPassword from '@/components/ForgotPassword.vue';
import Cart from '@/components/CartPopup.vue';
import App from '@/App.vue';
import wishlist from '@/components/AddToWishlist.vue';
import CategoryProductList from '@/components/CategoryProductList.vue';

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/profile',
    name: 'Profile',
    components: {
      default: Profile,
      additional: Register, // Load Register component as additional view
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    components: {
      default: ProductDetail,
      additional: Cart // Load Cart component as additional view
    },
    props: { default: true, additional: false }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: wishlist
  },
  {
    path: '/category/:categoryId',
    name: 'CategoryProductList',
    component: CategoryProductList,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
