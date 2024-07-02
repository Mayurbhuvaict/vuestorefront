<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/cart">Add to Cart</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Sign Up</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <li v-if="accessToken"><router-link to="/edit-profile">Edit Profile</router-link></li>
        <li v-if="accessToken"><router-link to="/wishlist">Wishlist</router-link></li>
      </ul>
    </nav>
    <!-- <router-view></router-view> -->
  </header>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const showLogin = ref(false);
    const showProfileComponent = ref(false);
    const showWishlist = ref(false); // Add state for showing the wishlist
    const accessToken = ref(localStorage.getItem('accessToken') || '');
    const successMessage = ref('');
    const userData = ref(null);

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

    return {
      showLogin,
      successMessage,
      handleLoginSuccess,
      accessToken,
      showProfileComponent,
      showProfile,
      userData,
      showWishlist,
      toggleWishlist
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
