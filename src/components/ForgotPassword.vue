<template>
    <div class="forgot-password">
      <h1>Forgot Password</h1>
      <form @submit.prevent="handleForgotPassword">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { resetPassword } from '@shopware-pwa/api-client';
  
  export default {
    name: 'ForgotPassword',
    setup() {
      const email = ref('');
      const successMessage = ref('');
      const errorMessage = ref('');
  
      const handleForgotPassword = async () => {
        try {
          await resetPassword({ email: email.value });
          console.log();
          successMessage.value = 'Password reset email sent successfully!';
          errorMessage.value = ''; 
        } catch (error) {
          errorMessage.value = 'Error sending password reset email. Please try again.';
          successMessage.value = ''; 
          console.error('Error sending password reset email:', error);
        }
      };
  
      return { email, successMessage, errorMessage, handleForgotPassword };
    },
  };
  </script>
  
  <style scoped>
  .forgot-password {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .success-message {
    color: green;
    margin-top: 20px;
  }
  .error-message {
    color: red;
    margin-top: 20px;
  }
  </style>
  