<template>
  <header>
    <div class="header-content">
      <div class="logo">
        <router-link to="/">
          <img src="/banner/logo_small.webp" alt="Ecommerce Logo">
        </router-link>
      </div>
      <div class="header-actions">
        <div class="search-box">
          <input type="text" placeholder="Search..." class="search-input">
          <button class="search-button"><font-awesome-icon icon="search" /></button>
        </div>
      </div>
      <nav>
        <ul>
          <li @click="toggleUserMenu">
            <div class="user-link">
              <font-awesome-icon icon="user" />
            </div>
            <ul v-show="showUserMenu" class="dropdown-menu">
              <!-- <li><router-link to="/edit-profile">Edit Profile</router-link></li> -->
              <li><router-link to="/login">Login</router-link></li>
              <li><router-link to="/register">Sign Up</router-link></li>
              <li><router-link to="/profile">Profile</router-link></li>
              <li @click="logout">Logout</li>
            </ul>
          </li>
          <li><router-link to="/cart"><font-awesome-icon icon="shopping-cart" /></router-link></li>
          <li>
            <router-link to="/wishlist">
              <font-awesome-icon icon="heart" />
            </router-link>
          </li>
        </ul>
      </nav>
      
    </div>
  </header>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const accessToken = ref(localStorage.getItem('accessToken') || '');
    const showUserMenu = ref(false);
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem('accessToken');
      accessToken.value = '';
      router.push('/login');
    };

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value;
    };

    return {
      accessToken,
      logout,
      showUserMenu,
      toggleUserMenu,
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

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5em;
}

.logo img {
  height: 50px; /* Adjust height as needed */
}

nav ul {
  list-style: none;
  display: flex;
  gap: 1em;
}

nav ul li {
  position: relative;
}

nav ul li a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
}

nav ul li .user-link {
  display: flex;
  align-items: center;
  cursor: pointer;
}

nav ul li .user-link i {
  margin-right: 5px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #333;
  list-style: none;
  padding: 0.5em 0;
  min-width: 120px; /* Adjust width as needed */
  display: none;
}

.dropdown-menu li {
  padding: 0.5em 1em;
  cursor: pointer;
}

nav ul li:hover > .dropdown-menu {
  display: block;
}

.header-actions {
  display: flex;
  align-items: center;
}

.search-box {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 0.5em;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
}

.search-button {
  background-color: #555;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5em;
  cursor: pointer;
}

.search-button:hover {
  background-color: #777;
}
</style>
