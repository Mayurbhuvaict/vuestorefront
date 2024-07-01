<template>
  <header>
    <nav>
      <ul>
        <li><a href="#" @click.prevent="toggleCartPopup">Add to Cart</a></li>
        <li><a href="#" @click.prevent="navigateTo('/login')">Login</a></li>
        <li><a href="#" @click.prevent="navigateTo('/register')">Sign Up</a></li>
        <!-- <li><button @click="toggleLogin">Login</button></li> -->
        <li><a href="#" @click.prevent="navigateTo('/profile')">Profile</a></li>
        <li v-if="accessToken"><a href="#" @click.prevent="showEditProfile">Edit Profile</a></li>
        <li><Logout v-if="accessToken" /></li>
        <li v-if="accessToken"><a href="#" @click.prevent="toggleWishlist">Wishlist</a></li>
      </ul>
    </nav>
    <CartPopup v-if="isCartOpen" :userData="userData" />
    <div v-if="showLogin">
      <Login @login-success="handleLoginSuccess" />
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
    <!-- <updateProfile :userData="userData" /> -->
    <Profile v-if="showProfileComponent" :accessToken="accessToken" />
    <AddToWishlist v-if="showWishlist" />
  </header>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import CartPopup from '@/components/CartPopup';
import Login from '@/components/Login';
import Profile from '@/components/Profile'; 
// import updateProfile from '@/components/updateProfile';
import Logout from '@/components/Logout';
import AddToWishlist from '@/components/AddToWishlist'; // Import the AddToWishlist component

export default {
  components: {
    CartPopup,
    Login,
    Profile,
    // updateProfile,
    Logout,
    AddToWishlist // Register the AddToWishlist component
  },
  setup() {
    const router = useRouter(); // Initialize router
    const isCartOpen = ref(false);
    const showLogin = ref(false);
    const showProfileComponent = ref(false);
    const showWishlist = ref(false); // Add state for showing the wishlist
    const accessToken = ref(localStorage.getItem('accessToken') || '');
    const successMessage = ref('');
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
        alert('Please log in to view your profile.');
      }
    };

    const toggleWishlist = () => {
      if (accessToken.value) {
        showWishlist.value = !showWishlist.value;
      } else {
        alert('Please log in to view your wishlist.');
      }
    };

    const navigateTo = (path) => {
      router.push(path); // Use router.push to navigate without refreshing
    };

    return {
      isCartOpen,
      toggleCartPopup,
      showLogin,
      toggleLogin,
      successMessage,
      handleLoginSuccess,
      accessToken,
      showProfileComponent,
      showProfile,
      userData,
      showWishlist,
      toggleWishlist,
      navigateTo // Return navigateTo function
    };
  },
};
</script>

<style scoped>
header {
  background-color: #333;
  color: white;
  padding: 1em;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 1em;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

.success-message {
  color: green;
  margin-top: 20px;
}
</style>
