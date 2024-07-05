<template>
  <div id="app">
    <Loading :loading="isLoading" />
    <AppHeader />
    <Banner v-if="route.path === '/'" />
    <div class="main-contain">
      <Circularimageslider v-if="route.path === '/'" />
      <OfferForYou v-if="route.path === '/'" />
      <SmallBanner v-if="route.path === '/'" />
      <!-- <CategoryList v-if="route.path === '/'" /> -->
      <ProductList v-if="route.path === '/'" />
      <ContentImage v-if="route.path === '/'" />

      <!-- <Profile v-if="route.path === '/'" /> -->
      <router-view v-if="route.path !== '/'" />
      <!-- <ChangePassword v-if="route.path === '/'" /> -->
      <Footer />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
// import CategoryList from './components/CategoryList.vue';
import ProductList from './components/ProductList.vue';
// import Profile from './components/Profile.vue';
// import ChangePassword from './components/ChangePassword.vue';
import Footer from './components/AppFooter.vue';
import Banner from './components/BannerImageSlider.vue'
import Circularimageslider from './components/Circularimageslider.vue'
import OfferForYou from './components/OfferForYou.vue'
import SmallBanner from './components/SmallBanner.vue'
import ContentImage from './components/ContentImage.vue'
import Loading from './components/Loading.vue';
export default {
  components: {
    AppHeader,
    // CategoryList,
    ProductList,
    Banner,
    Circularimageslider,
    OfferForYou,
    SmallBanner,
    ContentImage,
    Footer,
    Loading,
    // Profile,
    // ChangePassword
  },
  setup() {
    const route = useRoute();
    const isRegisterRoute = computed(() => route.path === '/register');
    return {
      isRegisterRoute,
      route
    };
  },
  data() {
    return {
      isLoggedIn: false,
      isLoading: false,
    };
  },
  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true;
    },
    fetchData() {
      this.isLoading = true;
      // Simulate an API call
      setTimeout(() => {
        this.isLoading = false;
        // Handle your data here
      }, 2000);
    },
  }
};
</script>
