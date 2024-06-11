<template>
  <header>
    <link href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@600;800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">
    <!-- Navbar start -->
    <div class="container-fluid fixed-top">
      <div class="container px-0">
        <nav class="navbar navbar-light bg-dark navbar-expand-xl">
          <a href="index.html" class="navbar-brand"><img class="text-primary display-6" src="#" alt="Shopware + PWA"></a>

          <div class="collapse navbar-collapse dark" id="navbarCollapse">
            <CategoryTree />
            <div class="d-flex m-3 me-0">
              <a href="#" class="position-relative me-4 my-auto">
                <a href="#" @click.prevent="toggleCartPopup"><i class="fa fa-shopping-bag fa-2x"></i></a>
<!--                <span class="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style="top: -5px; left: 15px; height: 20px; min-width: 20px;">3</span>-->
              </a>
              <a href="#" @click="toggleLogin" class="my-auto">
                <i class="fas fa-user fa-2x"></i>
              </a>
              <li><a href="#" @click.prevent="showProfile">Profile</a></li>
              <div v-if="showLogin">
                <Login @login-success="handleLoginSuccess" />
                <div v-if="successMessage" class="success-message">
                  {{ successMessage }}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <CartPopup v-if="isCartOpen" :userData="userData" />
    <Profile v-if="showProfileComponent" :accessToken="accessToken" />
  </header>
</template>

<script>
import { ref } from 'vue';
import CartPopup from '@/components/CartPopup';
import Login from '@/components/Login';
import Profile from '@/components/Profile';
// import CategoryItem from "@/components/CategoryItem.vue";
import CategoryTree from "@/views/CategoryTree.vue";

export default {
  components: {
    // CategoryItem,
    CategoryTree,
    CartPopup,
    Login,
    Profile
  },
  setup() {
    const isCartOpen = ref(false);
    const showLogin = ref(false);
    const showProfileComponent = ref(false);
    const successMessage = ref('');
    const accessToken = ref('');
    const userData = ref(null);

    const toggleLogin = () => {
      showLogin.value = !showLogin.value;
    };

    const toggleCartPopup = () => {
      isCartOpen.value = !isCartOpen.value;
    };

    const handleLoginSuccess = (token) => {
      accessToken.value = token;
      successMessage.value = 'Login successful!';
      showLogin.value = false; // Hide login form on success
    };

    const showProfile = () => {
      if (accessToken.value) {
        showProfileComponent.value = true;
      } else {
        console.log(accessToken);
        alert('Please log in to view your profile.');
      }
    };

    return { isCartOpen, toggleCartPopup, showLogin, toggleLogin, successMessage, handleLoginSuccess, accessToken, showProfileComponent, showProfile,userData };
  },
};
</script>

<style scoped src="../assets/css/demo.css" />
