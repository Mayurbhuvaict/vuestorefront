<template>
  <header :class="{'sticky': isSticky}" class="header-main">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <router-link to="/">
            <img src="/banner/download.png" alt="Ecommerce Logo" />
          </router-link>
        </div>
        <div class="header-actions">
          <div class="search-box">
            <input type="text" placeholder="Search..." class="search-input" />
            <button class="search-button">
              <font-awesome-icon icon="search" />
            </button>
          </div>
        </div>
        <nav>
          <ul>
            <li @click="toggleUserMenu">
              <div class="user-link">
                <font-awesome-icon icon="user" style="color: #000;" />
              </div>
              <ul v-show="showUserMenu" class="dropdown-menu">
                <li>
                  <router-link to="/login">Login</router-link>
                </li>
                <li>
                  <router-link to="/register">Sign Up</router-link>
                </li>
                <li>
                  <router-link to="/profile">Profile</router-link>
                </li>
                <li class="btn-logout" @click="logout">Logout</li>
              </ul>
            </li>
            <li>
              <router-link to="/cart">
                <font-awesome-icon icon="shopping-cart" style="color: #000;" />
              </router-link>
            </li>
            <li>
              <router-link to="/wishlist">
                <font-awesome-icon icon="heart" style="color: #000;" />
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const accessToken = ref(localStorage.getItem('accessToken') || '');
    const showUserMenu = ref(false);
    const isSticky = ref(false);
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem('accessToken');
      accessToken.value = '';
      router.push('/login');
    };

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value;
    };

    const handleScroll = () => {
      const header = document.querySelector('.header-main');
      if (window.scrollY > header.offsetTop) {
        isSticky.value = true;
      } else {
        isSticky.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      accessToken,
      logout,
      showUserMenu,
      toggleUserMenu,
      isSticky,
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
.header-main {
  background-color: #FFF;
}
.sticky.header-main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 10px 90px;
  box-shadow: 0 0 25px 0 rgb(0 0 0 / 10%);
}
.header-main {
  background-color: #FFF;
  color: white;
  width: 100%;
  padding: 40px 90px;
  transition: all 0.3s ease 0s;
}
.container {
  max-width: 1400px;
  padding: 0 20px;
}
nav svg {
  width: 22px;
  height: 22px;
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
  max-width: 200px;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 1em;
  margin-bottom: 0;
}

nav ul li {
  position: relative;
}

nav ul li a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
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
  right: 10px;
  background-color: #FFF;
  list-style: none;
  display: block;
  min-width: 180px;
  left: auto;
}

.dropdown-menu li {
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
  position: relative;
}

.search-input {
  padding: 0.5em;
  border: 1px solid #000;
  border-radius: 4px;
  width: 350px;
  font-size: 20px;
  height: 42px;
}
.search-input:focus {
  border-color: #0b2f80;
  border-width: 2px;
}
.search-input:focus-visible {
  outline: none;
}

.search-button {
  background-color: #000;
  color: white;
  border: none;
  padding: 0.5em;
  cursor: pointer;
  position: absolute;
  right: 0px;
  display: block;
  width: 100%;
  max-width: 50px;
  border-radius: 0 4px 4px 0px;
}
.search-button:focus-visible,
.search-button:focus {
  outline: none;
}

.search-button:hover {
  background-color: #444;
}
</style>
