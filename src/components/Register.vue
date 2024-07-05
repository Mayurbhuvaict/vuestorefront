<template>
  <div class="register container mt-5 mb-5">
    <h1 class="text-center mb-4">
      Register
    </h1>
    <form
      class="needs-validation"
      novalidate
      @submit.prevent="registerUser"
    >
      <!-- User Information Fields -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div
            v-for="(field, index) in leftUserFields"
            :key="index"
            class="form-group mb-3"
          >
            <label :for="field.id">{{ field.label }}</label>
            <input
              :id="field.id"
              v-model="form[field.model]"
              :type="field.type"
              class="form-control"
              :required="field.required"
            >
          </div>
        </div>
        <div class="col-md-6">
          <div
            v-for="(field, index) in rightUserFields"
            :key="index"
            class="form-group mb-3"
          >
            <label :for="field.id">{{ field.label }}</label>
            <input
              :id="field.id"
              v-model="form[field.model]"
              :type="field.type"
              class="form-control"
              :required="field.required"
            >
          </div>
        </div>
      </div>

      <!-- Billing and Shipping Address Fields -->
      <div class="row">
        <!-- Billing Address -->
        <div class="col-md-6">
          <h2 class="mb-3">
            Billing Address
          </h2>
          <div
            v-for="(field, index) in billingFields"
            :key="index"
            class="form-group mb-3"
          >
            <label :for="field.id">{{ field.label }}</label>
            <input
              :id="field.id"
              v-model="form.billingAddress[field.model]"
              :type="field.type"
              class="form-control"
              :required="field.required"
            >
          </div>
          <div class="form-group mb-3">
            <label for="billingCountry">Country</label>
            <select
              id="billingCountry"
              v-model="form.billingAddress.countryId"
              class="form-select"
              required
              @change="loadStates('billing')"
            >
              <option
                value=""
                disabled
              >
                Select a country
              </option>
              <option
                v-for="country in countries"
                :key="country.id"
                :value="country.id"
              >
                {{ country.translated.name }}
              </option>
            </select>
          </div>
          <div
            v-if="billingStates.length > 0"
            class="form-group mb-3"
          >
            <label for="billingState">State</label>
            <select
              id="billingState"
              v-model="form.billingAddress.stateId"
              class="form-select"
              required
            >
              <option
                value=""
                disabled
              >
                Select a state
              </option>
              <option
                v-for="state in billingStates"
                :key="state.id"
                :value="state.id"
              >
                {{ state.translated.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Shipping Address -->
        <div class="col-md-6">
          <h2 class="mb-3">
            Shipping Address
          </h2>
          <div
            v-for="(field, index) in shippingFields"
            :key="index"
            class="form-group mb-3"
          >
            <label :for="field.id">{{ field.label }}</label>
            <input
              :id="field.id"
              v-model="form.shippingAddress[field.model]"
              :type="field.type"
              class="form-control"
            >
          </div>
          <div class="form-group mb-3">
            <label for="shippingCountry">Country</label>
            <select
              id="shippingCountry"
              v-model="form.shippingAddress.countryId"
              class="form-select"
              @change="loadStates('shipping')"
            >
              <option
                value=""
                disabled
              >
                Select a country
              </option>
              <option
                v-for="country in countries"
                :key="country.id"
                :value="country.id"
              >
                {{ country.translated.name }}
              </option>
            </select>
          </div>
          <div
            v-if="shippingStates.length > 0"
            class="form-group mb-3"
          >
            <label for="shippingState">State</label>
            <select
              id="shippingState"
              v-model="form.shippingAddress.stateId"
              class="form-select"
            >
              <option
                value=""
                disabled
              >
                Select a state
              </option>
              <option
                v-for="state in shippingStates"
                :key="state.id"
                :value="state.id"
              >
                {{ state.translated.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="btn btn-primary w-auto mt-3 login-btn"
      >
        Register
      </button>
    </form>

    <SuccessModal
      :visible="showSuccessModal"
      message="Registration successful!"
      @close="closeSuccessModal"
    />

    <p
      v-if="message"
      class="message alert alert-success mt-3"
    >
      {{ message }}
    </p>
  </div>
</template>

<script>
import * as shopwareClient from "@shopware-pwa/api-client";
import SuccessModal from './SuccessModal.vue';

export default {
  components: {
    SuccessModal,
  },
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
          countryId: "",
          stateId: ""
        },
        shippingAddress: {
          firstName: "",
          lastName: "",
          street: "",
          city: "",
          zipcode: "",
          countryId: "",
          stateId: ""
        }
      },
      message: "",
      countries: [],
      billingStates: [],
      shippingStates: [],
      leftUserFields: [
        { id: 'firstName', label: 'First Name', model: 'firstName', type: 'text', required: true },
        { id: 'email', label: 'Email', model: 'email', type: 'email', required: true },
        { id: 'title', label: 'Title', model: 'title', type: 'text' },
        { id: 'birthdayMonth', label: 'Birthday Month', model: 'birthdayMonth', type: 'number' }

      ],
      rightUserFields: [
        { id: 'lastName', label: 'Last Name', model: 'lastName', type: 'text', required: true },
        { id: 'password', label: 'Password', model: 'password', type: 'password', required: true },
        { id: 'birthdayYear', label: 'Birthday Year', model: 'birthdayYear', type: 'number' },
        { id: 'birthdayDay', label: 'Birthday Day', model: 'birthdayDay', type: 'number' }
      ],
      billingFields: [
        { id: 'billingFirstName', label: 'First Name', model: 'firstName', type: 'text', required: true },
        { id: 'billingLastName', label: 'Last Name', model: 'lastName', type: 'text', required: true },
        { id: 'billingStreet', label: 'Street', model: 'street', type: 'text', required: true },
        { id: 'billingCity', label: 'City', model: 'city', type: 'text', required: true },
        { id: 'billingZipcode', label: 'Zipcode', model: 'zipcode', type: 'text', required: true }
      ],
      shippingFields: [
        { id: 'shippingFirstName', label: 'First Name', model: 'firstName', type: 'text' },
        { id: 'shippingLastName', label: 'Last Name', model: 'lastName', type: 'text' },
        { id: 'shippingStreet', label: 'Street', model: 'street', type: 'text' },
        { id: 'shippingCity', label: 'City', model: 'city', type: 'text' },
        { id: 'shippingZipcode', label: 'Zipcode', model: 'zipcode', type: 'text' }
      ],
      showSuccessModal: false,
    };
  },
  mounted() {
    this.fetchCountries();
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
    async loadStates(addressType) {
      const countryId = addressType === 'billing' ? this.form.billingAddress.countryId : this.form.shippingAddress.countryId;
      const country = this.countries.find(c => c.id === countryId);
      if (country && country.states && country.states.length > 0) {
        if (addressType === 'billing') {
          this.billingStates = country.states;
        } else {
          this.shippingStates = country.states;
        }
      } else {
        if (addressType === 'billing') {
          this.billingStates = [];
        } else {
          this.shippingStates = [];
        }
      }
    },
    async registerUser() {
      try {
        await shopwareClient.register(this.form);
        this.message = "Registration successful!";
        this.showSuccessModal = true;
        await this.loginUser();
        setTimeout(() => {
          this.$router.push({ path: '/' });
        }, 1000);
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
      } catch (error) {
        this.message = `Login failed: ${error.message}`;
        console.error(error);
      }
    }
  },
};
</script>

<style scoped>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";

.register {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.needs-validation input:invalid {
  border-color: #dc3545;
}

.message {
  text-align: center;
}
</style>
