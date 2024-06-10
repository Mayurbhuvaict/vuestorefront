<template>
    <button @click="handleLogout" class="logout-button">Logout</button>
  </template>
  
  <script>
  export default {
    name: "Logout",
    methods: {
      handleLogout() {
        localStorage.removeItem('accessToken');
        this.$router.push({ path: '/' });
      }
    }
  };
  </script>
  
  <style scoped>
  .logout-button {
    background-color: #d9534f;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .logout-button:hover {
    background-color: #c9302c;
  }
  </style>
  