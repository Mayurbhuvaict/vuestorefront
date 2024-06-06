<template>
  <div class="profile">
    <h2>User Profile</h2>
    <div v-if="userData">
      <p><strong>Name:</strong> {{ userData.firstName }}</p>
      <p><strong>Email:</strong> {{ userData.email }}</p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { getCustomer } from '@shopware-pwa/api-client';

export default {
  name: 'Profile',
  props: {
    accessToken: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const userData = ref(null);

    const fetchUserData = async () => {
      try {
        const data = await getCustomer(window.localStorage.accessToken);
        userData.value = data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    watch(() => props.accessToken, fetchUserData, { immediate: true });

    return { userData };
  },
};
</script>

<style scoped>
.profile {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
