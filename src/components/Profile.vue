<template>
  <div class="profile">
    <h1>User Profile</h1>
    <div v-if="userData">
      <p><strong>First Name:</strong> {{ userData.firstName }}</p>
      <p><strong>Last Name:</strong> {{ userData.lastName }}</p>
      <p><strong>Email:</strong> {{ userData.email }}</p>
      <p><strong>Title:</strong> {{ userData.title }}</p>
      <p><strong>Birthday:</strong> {{ userData.birthday }}</p>
      
      <h2>Billing Address</h2>
      <div v-if="billingAddress">
        <p><strong>Street:</strong> {{ billingAddress.street }}</p>
        <p><strong>City:</strong> {{ billingAddress.city }}</p>
        <p><strong>Zipcode:</strong> {{ billingAddress.zipcode }}</p>
        <p><strong>Country:</strong> {{ billingAddress.country.translated.name }}</p>
        <p v-if="billingAddress.countryState"><strong>State:</strong> {{ billingAddress.countryState.name }}</p>
      </div>
      <div v-else>
        <p>Loading billing address...</p>
      </div>
      
      <h2>Shipping Address</h2>
      <div v-if="shippingAddress">
        <p><strong>Street:</strong> {{ shippingAddress.street }}</p>
        <p><strong>City:</strong> {{ shippingAddress.city }}</p>
        <p><strong>Zipcode:</strong> {{ shippingAddress.zipcode }}</p>
        <p><strong>Country:</strong> {{ shippingAddress.country.translated.name }}</p>
        <p v-if="shippingAddress.countryState"><strong>State:</strong> {{ shippingAddress.countryState.name }}</p>
      </div>
      <div v-else>
        <p>Loading shipping address...</p>
      </div>
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>
  </div>
</template>

<script>
import { getCustomer, getCustomerAddresses } from "@shopware-pwa/api-client";

export default {
  data() {
    return {
      userData: null,
      billingAddress: null,
      shippingAddress: null,
    };
  },
  methods: {
    async fetchUserData() {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await getCustomer();
          this.userData = response;
          await this.fetchCustomerAddresses();
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("No access token found in local storage.");
      }
    },
    async fetchCustomerAddresses() {
      if (this.userData) {
        try {
          const billingResponse = await getCustomerAddresses(this.userData.defaultBillingAddressId);
          const shippingResponse = await getCustomerAddresses(this.userData.defaultShippingAddressId);
          billingResponse.elements.forEach(billingAddress => {
          this.billingAddress = billingAddress;
          });
          shippingResponse.elements.forEach(shippingAddress => {
          this.shippingAddress = shippingAddress;
          });
        } catch (error) {
          console.error("Error fetching customer addresses:", error);
        }
      }
    }
  },
  mounted() {
    this.fetchUserData();
  }
};
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 0 auto;
}
h1, h2 {
  margin-bottom: 10px;
}
p {
  margin-bottom: 5px;
}
</style>
