<template>
    <div>
      <h2>Change Password</h2>
      <form @submit.prevent="updatePassword">
        <div>
          <label for="currentPassword">Current Password</label>
          <input type="password" id="currentPassword" v-model="currentPassword" required />
        </div>
        <div>
          <label for="newPassword">New Password</label>
          <input type="password" id="newPassword" v-model="newPassword" required />
        </div>
        <div>
          <label for="confirmPassword">Confirm New Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
        <button type="submit">Change Password</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { updatePassword } from "@shopware-pwa/api-client";
  
  export default {
    name: "ChangePassword",
    setup() {
      const currentPassword = ref("");
      const newPassword = ref("");
      const confirmPassword = ref("");
      const message = ref("");
  
      const changePasswordHandler = async () => {
        if (newPassword.value !== confirmPassword.value) {
          message.value = "New passwords do not match.";
          return;
        }
  
        try {
            console.log('1111111111111111111',currentPassword.value);
          await updatePassword({
            password: currentPassword.value,
            newPassword: newPassword.value,
            newPasswordConfirm:  newPassword.value,
          });
          message.value = "Password changed successfully!";
        } catch (error) {
          message.value = "Failed to change password: " + error;
        }
      };
  
      return {
        currentPassword,
        newPassword,
        confirmPassword,
        message,
        updatePassword: changePasswordHandler,
      };
    },
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
  }
  
  form > div {
    margin-bottom: 10px;
  }
  
  button {
    margin-top: 10px;
  }
  </style>
  