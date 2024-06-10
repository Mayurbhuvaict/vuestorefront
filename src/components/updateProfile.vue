<template>
    <div class="profile-edit">
      <h1>Edit User Profile</h1>
      <div v-if="userData">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" v-model="userData.firstName" id="firstName" />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" v-model="userData.lastName" id="lastName" />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="userData.email" id="email" />
        </div>
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" v-model="userData.title" id="title" />
        </div>
        <div class="form-group">
          <label for="birthday">Birthday:</label>
          <input type="date" v-model="userData.birthday" id="birthday" />
        </div>
  
        <h2>Billing Address</h2>
        <div v-if="billingAddress">
          <div class="form-group">
            <label for="billingStreet">Street:</label>
            <input type="text" v-model="billingAddress.street" id="billingStreet" />
          </div>
          <div class="form-group">
            <label for="billingCity">City:</label>
            <input type="text" v-model="billingAddress.city" id="billingCity" />
          </div>
          <div class="form-group">
            <label for="billingZipcode">Zipcode:</label>
            <input type="text" v-model="billingAddress.zipcode" id="billingZipcode" />
          </div>
          <div class="form-group">
            <label for="billingCountry">Country:</label>
            <input type="text" v-model="billingAddress.country.translated.name" id="billingCountry" disabled />
          </div>
          <div class="form-group" v-if="billingAddress.countryState">
            <label for="billingState">State:</label>
            <input type="text" v-model="billingAddress.countryState.name" id="billingState" disabled />
          </div>
        </div>
        <div v-else>
          <p>Loading billing address...</p>
        </div>
  
        <h2>Shipping Address</h2>
        <div v-if="shippingAddress">
          <div class="form-group">
            <label for="shippingStreet">Street:</label>
            <input type="text" v-model="shippingAddress.street" id="shippingStreet" />
          </div>
          <div class="form-group">
            <label for="shippingCity">City:</label>
            <input type="text" v-model="shippingAddress.city" id="shippingCity" />
          </div>
          <div class="form-group">
            <label for="shippingZipcode">Zipcode:</label>
            <input type="text" v-model="shippingAddress.zipcode" id="shippingZipcode" />
          </div>
          <div class="form-group">
            <label for="shippingCountry">Country:</label>
            <input type="text" v-model="shippingAddress.country.translated.name" id="shippingCountry" disabled />
          </div>
          <div class="form-group" v-if="shippingAddress.countryState">
            <label for="shippingState">State:</label>
            <input type="text" v-model="shippingAddress.countryState.name" id="shippingState" disabled />
          </div>
        </div>
        <div v-else>
          <p>Loading shipping address...</p>
        </div>
  
        <button @click="saveChanges">Save Changes</button>
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
    },
    mounted() {
      this.fetchUserData();
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
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  