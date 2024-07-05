<template>
  <div class="profile-edit">
    <h1>Edit User Profile</h1>
    <div v-if="userData">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input
          id="firstName"
          v-model="userData.firstName"
          type="text"
        >
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input
          id="lastName"
          v-model="userData.lastName"
          type="text"
        >
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="userData.email"
          type="email"
        >
      </div>
      <div class="form-group">
        <label for="title">Title:</label>
        <input
          id="title"
          v-model="userData.title"
          type="text"
        >
      </div>
      <div class="form-group">
        <label for="birthday">Birthday:</label>
        <input
          id="birthday"
          v-model="userData.birthday"
          type="date"
        >
      </div>
  
      <h2>Billing Address</h2>
      <div v-if="billingAddress">
        <div class="form-group">
          <label for="billingStreet">Street:</label>
          <input
            id="billingStreet"
            v-model="billingAddress.street"
            type="text"
          >
        </div>
        <div class="form-group">
          <label for="billingCity">City:</label>
          <input
            id="billingCity"
            v-model="billingAddress.city"
            type="text"
          >
        </div>
        <div class="form-group">
          <label for="billingZipcode">Zipcode:</label>
          <input
            id="billingZipcode"
            v-model="billingAddress.zipcode"
            type="text"
          >
        </div>
        <div class="form-group">
          <label for="billingCountry">Country:</label>
          <input
            id="billingCountry"
            v-model="billingAddress.country.translated.name"
            type="text"
            disabled
          >
        </div>
        <div
          v-if="billingAddress.countryState"
          class="form-group"
        >
          <label for="billingState">State:</label>
          <input
            id="billingState"
            v-model="billingAddress.countryState.name"
            type="text"
            disabled
          >
        </div>
      </div>
      <div v-else>
        <p>Loading billing address...</p>
      </div>
  
      <h2>Shipping Address</h2>
      <div v-if="shippingAddress">
        <div class="form-group">
          <label for="shippingStreet">Street:</label>
          <input
            id="shippingStreet"
            v-model="shippingAddress.street"
            type="text"
          >
        </div>
        <div class="form-group">
          <label for="shippingCity">City:</label>
          <input
            id="shippingCity"
            v-model="shippingAddress.city"
            type="text"
          >
        </div>
        <div class="form-group">
          <label for="shippingZipcode">Zipcode:</label>
          <input
            id="shippingZipcode"
            v-model="shippingAddress.zipcode"
            type="text"
          >
        </div>
        <div class="form-group">
          <label for="shippingCountry">Country:</label>
          <input
            id="shippingCountry"
            v-model="shippingAddress.country.translated.name"
            type="text"
            disabled
          >
        </div>
        <div
          v-if="shippingAddress.countryState"
          class="form-group"
        >
          <label for="shippingState">State:</label>
          <input
            id="shippingState"
            v-model="shippingAddress.countryState.name"
            type="text"
            disabled
          >
        </div>
      </div>
      <div v-else>
        <p>Loading shipping address...</p>
      </div>
  
      <button @click="saveChanges">
        Save Changes
      </button>
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>
  </div>
</template>
  
  <script>
  import { getCustomer, getCustomerAddresses, updateProfile } from "@shopware-pwa/api-client";
  
  export default {
    data() {
      return {
        userData: null,
        billingAddress: null,
        shippingAddress: null,
      };
    },
    mounted() {
      this.fetchUserData();
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
      },
      async saveChanges() {
        try {
          await updateProfile(this.userData);
          alert("Profile updated successfully!");
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .profile-edit {
    max-width: 600px;
    margin: 0 auto;
  }
  h1, h2 {
    margin-bottom: 10px;
  }
  .form-group {
    margin-bottom: 10px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  button {
    padding: 10px 15px;
    background-color: #0b2f80;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #0b2f80;
  }
  </style>
  