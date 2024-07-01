<template>
  <div class="container">
    <div class="card">
      <h2>Login</h2>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" placeholder="Enter your email" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" placeholder="Enter your password" />
      </div>
      <button @click="handleLogin">Login</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <router-link to="/forgot-password">Forgot Password</router-link>
      <router-link to="/register">Sign Up</router-link>
      <SuccessPopup v-if="showSuccessPopup" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { login } from '@shopware-pwa/api-client';
import SuccessPopup from '@/components/SuccessPopup.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginComponent',
  components: {
    SuccessPopup
  },
  setup(_, { emit }) {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const showSuccessPopup = ref(false);
    const router = useRouter();

    const handleLogin = async () => {
      try {
        const result = await login({
          username: email.value,
          password: password.value,
        });
        console.log('Login successful. ContextToken:', result.contextToken);
        localStorage.setItem('accessToken', result.contextToken);
        emit('login-success', result.contextToken);
        showSuccessPopup.value = true;
        setTimeout(() => {
          router.push('/profile');
        }, 1000);
      } catch (error) {
        console.error('Error logging in:', error);
        errorMessage.value = 'Error: Invalid credentials';
      }
    };

    return { email, password, handleLogin, errorMessage, showSuccessPopup };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #fafafa; /* Light gray background color */
}

.card {
  width: 100%;
  max-width: 400px;
  height: auto; /* Auto height */
  background-color: #f8f8f8; /* Card background color */
  padding: 20px;
  border-radius: 12px; /* Card border radius */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px; /* Add margin bottom */
}

.form-group {
  margin-bottom: 20px; /* Add margin bottom */
  display: flex;
  flex-direction: column;
}

label {
  color: #333;
}

input {
  padding: 12px; /* Increase padding */
  border: 2px solid #ddd; /* Input border color */
  border-radius: 8px; /* Input border radius */
  transition: border-color 0.3s ease-in-out;
  outline: none;
  color: #333;
  background-color: #f4f4f4; /* Input background color */
}

input:focus {
  border-color: #51ff00; /* Input border color on focus */
}

button {
  background-color: #00ffd5; /* Button background color */
  color: #fff;
  padding: 12px; /* Increase padding */
  border: none;
  border-radius: 8px; /* Button border radius */
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #2600ff; /* Button background color on hover */
}

.error-message {
  color: red;
  margin-top: 10px;
}

a {
  display: block;
  margin-top: 10px;
  color: #00ffd5;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
