<template>
  <div id="app">
    <AppHeader  />
    <CategoryList v-if="route.path === '/'" />
    <ProductList v-if="route.path === '/'" />
    <Profile v-if="route.path === '/'" />
    <router-view></router-view>
    <ChangePassword v-if="route.path === '/'" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import CategoryList from './components/CategoryList.vue';
import ProductList from './components/ProductList.vue';
import Profile from './components/Profile.vue';
import ChangePassword from './components/ChangePassword.vue';
export default {
  components: {
    AppHeader,
    CategoryList,
    ProductList,
    Profile,
    ChangePassword
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true;
    },
  },
  setup() {
    const route = useRoute();
    const isRegisterRoute = computed(() => route.path === '/register');
    return {
      isRegisterRoute,
      route
    };
  }
};
</script>
