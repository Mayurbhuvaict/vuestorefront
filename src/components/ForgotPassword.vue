  <template>
    <div>
      <h1>Forgot your password?</h1>
      <hr />
      <h3>Enter your email address to reset your password</h3>
      <form @submit.prevent="handleForgotPassword">
        <label for="email">Email</label><br />
        <input type="email" v-model="email" placeholder="Enter your email address" required />
        <button type="submit">Submit</button>
      </form>
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
hr {
  background: #4bc970;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  padding: 0;
  text-align: right;
  width: 5%;
  float: center;
}

label {
  padding-top: 15px;
  font-weight: bold;
}

body {
  font-size: 13px;
  font-family: 'Nunito', sans-serif;
  color: #384047;
}

form {
  font-size: 16px;
  max-width: 300px;
  margin: 10px auto;
  padding: 10px 20px;
  background: #f4f7f8;
  border-radius: 0px;
}

h1 {
  padding-top: 2em;
  font-size: 32px;
  margin: 0 0 30px 0;
  text-align: center;
}

h3 {
  padding-top: 1em;
  font-size: 20px;
  margin: 0 0 30px 0;
  text-align: center;
}

input[type="email"] {
  border: none;
  font-size: 16px;
  height: auto;
  margin: 0;
  outline: 0;
  padding: 15px;
  width: 66%;
  color: #8a97a0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  margin-bottom: 30px;
}

button {
  padding: 12px 39px 13px 39px;
  color: #FFF;
  background-color: #4bc970;
  font-size: 18px;
  text-align: center;
  font-style: normal;
  border: 1px solid #3ac162;
  margin-bottom: 10px;
  overflow: hidden;
}

label {
  display: block;
  margin-bottom: 8px;
}

@media screen and (min-width: 480px) {
  form {
    max-width: 480px;
  }
}
</style>
  