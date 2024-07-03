<template>
  <div id="app">
    <AppHeader  />
    <Banner v-if="route.path === '/'" />
    <Circularimageslider v-if="route.path === '/'" />
    <OfferForYou v-if="route.path === '/'" />
    <SmallBanner v-if="route.path === '/'" />
    <!-- <CategoryList v-if="route.path === '/'" /> -->
    <ProductList v-if="route.path === '/'" />
    <ContentImage v-if="route.path === '/'" />

    <!-- <Profile v-if="route.path === '/'" /> -->
    <router-view v-if="route.path !== '/'"></router-view>
    <!-- <ChangePassword v-if="route.path === '/'" /> -->
    <Footer />
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
    // Profile,
    // ChangePassword
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
