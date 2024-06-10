<template>
  <div id="app">
    <AppHeader />
    <CategoryList />
    <ProductList />
    <Profile v-if="isLoggedIn" />
  </div>
  <router-view></router-view>
<ChangePassword />
</template>

<script>
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
};
</script>
