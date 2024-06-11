<template>
  <div id="app">
    <AppHeader />
<!--    <CategoryList />-->
<!--    <CategoryTree />-->
    <ProductList />
    <Profile v-if="isLoggedIn" />
  </div>
  <router-view></router-view>

</template>

<script>
import AppHeader from './components/AppHeader.vue';
// import CategoryList from './components/CategoryList.vue';
// import CategoryTree from './views/CategoryTree.vue';
import ProductList from './components/ProductList.vue';
import Profile from './components/Profile.vue';

export default {
  components: {
    AppHeader,
    // CategoryList,
    // CategoryTree,
    ProductList,
    Profile,
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
