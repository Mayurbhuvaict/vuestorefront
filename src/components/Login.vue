<template>
  <div class="login-form">
    <h2>Login</h2>
    <div>
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="handleLogin">Login</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { login } from '@shopware-pwa/api-client';

export default {
  name: 'LoginComponent',
  setup(_, { emit }) {
    const email = ref('');
    const password = ref('');

    const handleLogin = async () => {
      try {
        const result = await login({
          username: email.value,
          password: password.value,
        });
        console.log('Login successful. ContextToken:', result.contextToken);
        localStorage.setItem('accessToken', result.contextToken);
        emit('login-success', result.contextToken);
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };

    return { email, password, handleLogin };
  },
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 5px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.success-message {
  margin-top: 20px;
  color: green;
}
</style>
