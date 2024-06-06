<template>
    <div class="register">
      <h1>Register</h1>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" v-model="form.firstName" id="firstName" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" v-model="form.lastName" id="lastName" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="form.email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="form.password" id="password" :required="!form.guest" />
        </div>
        <div class="form-group">
          <label for="guest">Guest</label>
          <input type="checkbox" v-model="form.guest" id="guest" />
        </div>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" v-model="form.title" id="title" />
        </div>
        <div class="form-group">
          <label for="birthdayYear">Birthday Year</label>
          <input type="number" v-model="form.birthdayYear" id="birthdayYear" />
        </div>
        <div class="form-group">
          <label for="birthdayMonth">Birthday Month</label>
          <input type="number" v-model="form.birthdayMonth" id="birthdayMonth" />
        </div>
        <div class="form-group">
          <label for="birthdayDay">Birthday Day</label>
          <input type="number" v-model="form.birthdayDay" id="birthdayDay" />
        </div>
  
        <h2>Billing Address</h2>
        <div class="form-group">
          <label for="billingFirstName">First Name</label>
          <input type="text" v-model="form.billingAddress.firstName" id="billingFirstName" required />
        </div>
        <div class="form-group">
          <label for="billingLastName">Last Name</label>
          <input type="text" v-model="form.billingAddress.lastName" id="billingLastName" required />
        </div>
        <div class="form-group">
          <label for="billingStreet">Street</label>
          <input type="text" v-model="form.billingAddress.street" id="billingStreet" required />
        </div>
        <div class="form-group">
          <label for="billingCity">City</label>
          <input type="text" v-model="form.billingAddress.city" id="billingCity" required />
        </div>
        <div class="form-group">
          <label for="billingZipcode">Zipcode</label>
          <input type="text" v-model="form.billingAddress.zipcode" id="billingZipcode" required />
        </div>
        <div class="form-group">
          <label for="billingCountry">Country</label>
          <select v-model="form.billingAddress.countryId" id="billingCountry" required>
            <option value="" disabled>Select a country</option>
            <option v-for="country in countries" :key="country.id" :value="country.id">
              {{ country.translated.name }}
            </option>
          </select>
        </div>
  
        <h2>Shipping Address</h2>
        <div class="form-group">
          <label for="shippingFirstName">First Name</label>
          <input type="text" v-model="form.shippingAddress.firstName" id="shippingFirstName" />
        </div>
        <div class="form-group">
          <label for="shippingLastName">Last Name</label>
          <input type="text" v-model="form.shippingAddress.lastName" id="shippingLastName" />
        </div>
        <div class="form-group">
          <label for="shippingStreet">Street</label>
          <input type="text" v-model="form.shippingAddress.street" id="shippingStreet" />
        </div>
        <div class="form-group">
          <label for="shippingCity">City</label>
          <input type="text" v-model="form.shippingAddress.city" id="shippingCity" />
        </div>
        <div class="form-group">
          <label for="shippingZipcode">Zipcode</label>
          <input type="text" v-model="form.shippingAddress.zipcode" id="shippingZipcode" />
        </div>
        <div class="form-group">
          <label for="shippingCountry">Country</label>
          <select v-model="form.shippingAddress.countryId" id="shippingCountry">
            <option value="" disabled>Select a country</option>
            <option v-for="country in countries" :key="country.id" :value="country.id">
              {{ country.translated.name }}
            </option>
          </select>
        </div>
  
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import * as shopwareClient from "@shopware-pwa/api-client";
  
  export default {
    data() {
      return {
        form: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          guest: false,
          title: "",
          birthdayYear: null,
          birthdayMonth: null,
          birthdayDay: null,
          storefrontUrl: "https://shopware-6-demo.shop-studio.io",
          billingAddress: {
            firstName: "",
            lastName: "",
            street: "",
            city: "",
            zipcode: "",
            countryId: ""
          },
          shippingAddress: {
            firstName: "",
            lastName: "",
            street: "",
            city: "",
            zipcode: "",
            countryId: ""
          }
        },
        message: "",
        countries: []
      };
    },
    methods: {
      async fetchCountries() {
        try {
          const response = await shopwareClient.getAvailableCountries();
          this.countries = response.elements;
        } catch (error) {
          console.error("Error fetching countries:", error);
        }
      },
      async registerUser() {
        try {
          await shopwareClient.register(this.form);
          this.message = "Registration successful! Logging you in...";
          await this.loginUser();
        } catch (error) {
          this.message = `Registration failed: ${error.message}`;
          console.error(error);
        }
      },
      async loginUser() {
        try {
          const result = await shopwareClient.login({
            username: this.form.email,
            password: this.form.password,
          });
          console.log('Login successful. ContextToken:', result.contextToken);
          localStorage.setItem('accessToken', result.contextToken);
          this.$router.push({ path: '/' }); // Redirect to home page or desired route
          console.log('local token',window.localStorage.accessToken);
          
        } catch (error) {
          this.message = `Login failed: ${error.message}`;
          console.error(error);
        }
      }
    },
    mounted() {
      this.fetchCountries();
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  .register {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input, select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .message {
    margin-top: 20px;
    color: green;
    font-weight: bold;
  }
  </style>
  