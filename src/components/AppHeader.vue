<template>
  <header>
    <nav>
      <ul>
        <li><a href="#" @click.prevent="toggleCartPopup">Add to Cart</a></li>
        <li><button @click="toggleLogin">Login</button></li>
        <li><a href="#" @click.prevent="showProfile">Profile</a></li>
      </ul>
    </nav>
    <CartPopup v-if="isCartOpen" :userData="userData" />
    <div v-if="showLogin">
      <Login @login-success="handleLoginSuccess" />
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
    <Profile v-if="showProfileComponent" :accessToken="accessToken" />
  </header>
</template>

<script>
import { ref } from 'vue';
import CartPopup from '@/components/CartPopup';
import Login from '@/components/Login';
import Profile from '@/components/Profile'; 

export default {
  components: {
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
