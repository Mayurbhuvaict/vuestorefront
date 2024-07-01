<template>
  <section class="my-5">
    <div class="container">
      <div class="main-body">
        <div class="row">
          <div class="col-lg-4">
            <!-- Left Side Content -->
            <div class="card">
              <div class="card-body">
                <!-- User Profile Section -->
                <div class="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtbEsykx-0fhTred6UwHDYtMFd2UgTJCG4gaklT1dx4suRO4_n5LJr4Gg28kquSX5fpNo&usqp=CAU"
                    alt="Admin" class="rounded-circle p-1 bg-warning" width="110">
                  <div class="mt-3" v-if="userData">
                    <h4>{{ userData.firstName }} {{ userData.lastName }}</h4>
                    <p class="text-secondary mb-1">{{ userData.email }}</p>
                    <p class="text-muted font-size-sm" v-if="billingAddress">{{ billingAddress.city }}, {{
                    billingAddress.country.translated.name }}</p>
                  </div>
                </div>
                <!-- Navigation Menu -->
                <div class="list-group list-group-flush text-center mt-4">
                  <a href="#" class="list-group-item list-group-item-action border-0 " @click="showProfileDetails">
                    Profile Information
                  </a>
                  <a href="#" class="list-group-item list-group-item-action border-0"
                    @click="showOrderDetails">Orders</a>
                  <a href="#" class="list-group-item list-group-item-action border-0 active" @click="showAddressBook">
                    Address Book
                  </a>
                  <a href="#" @click="handleLogout" class="list-group-item list-group-item-action border-0">Logout</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <!-- Right Side Content -->
            <!-- Order Details -->
            <div id="orderDetails" class="card" style="display: none;">
              <div class="card-body" v-if="orders.length">
                <center>
                  <h5>Order Details</h5>
                </center>
                <div v-for="order in orders" :key="order.id" class="mb-3">
                  <p><strong>Order Number:</strong> {{ order.orderNumber }}</p>
                  <p><strong>Total Amount:</strong> {{ order.positionPrice }}</p>
                  <p><strong>Order Date:</strong> {{ new Date(order.orderDate).toLocaleDateString() }}</p>
                  <hr>
                </div>
              </div>
              <div class="card-body" v-else>
                <center>
                  <h5>No Orders Found</h5>
                </center>
              </div>
            </div>
            <!-- Profile Details -->
            <div id="profileDetails" class="card" style="display: none;">
              <div class="card-body" v-if="userData">
                <center>
                  <h5>Profile Information</h5>
                </center>
                <p><strong>Name:</strong> {{ userData.firstName }}</p>
                <p><strong>Email Address:</strong> {{ userData.email }}</p>
                <p v-if="userData.birthday"><strong>Date of Birth:</strong> {{ new Date(userData.birthday).toLocaleDateString() }}</p>
                <p v-if="billingAddress"><strong>City:</strong> {{ billingAddress.city }}, {{
                    billingAddress.country.translated.name }}</p>
                <p><strong>Role:</strong> User</p>
              </div>
            </div>
            <!-- Address Book -->
            <div id="addressBook" class="card">
              <div class="card-body">
                <center>
                  <h5>Address</h5>
                </center>
                <div class="row">
                  <div class="col-md-6" v-if="billingAddress">
                    <h5>Billing Address</h5>
                    <p><strong>Street:</strong> {{ billingAddress.street }}</p>
                    <p><strong>City:</strong> {{ billingAddress.city }}</p>
                    <p><strong>Zipcode:</strong> {{ billingAddress.zipcode }}</p>
                    <p><strong>Country:</strong> {{ billingAddress.country.translated.name }}</p>
                    <p v-if="billingAddress.countryState"><strong>State:</strong> {{ billingAddress.countryState.name }}
                    </p>
                  </div>
                  <div class="col-md-6" v-if="shippingAddress">
                    <h5>Shipping Address</h5>
                    <p><strong>Street:</strong> {{ shippingAddress.street }}</p>
                    <p><strong>City:</strong> {{ shippingAddress.city }}</p>
                    <p><strong>Zipcode:</strong> {{ shippingAddress.zipcode }}</p>
                    <p><strong>Country:</strong> {{ shippingAddress.country.translated.name }}</p>
                    <p v-if="shippingAddress.countryState"><strong>State:</strong> {{ shippingAddress.countryState.name
                      }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getCustomer, getCustomerAddresses, getCustomerOrders, getOrderDetails } from "@shopware-pwa/api-client";

export default {
  data() {
    return {
      userData: null,
      billingAddress: null,
      shippingAddress: null,
      orders: []
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
          await this.fetchCustomerOrders();
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
    async fetchCustomerOrders() {
      try {
        const ordersResponse = await getCustomerOrders('019029fe927a71d6826e9d520e0e9138');
        console.log(ordersResponse.elements);
        this.orders = ordersResponse.elements;
        const orderDetails = await getOrderDetails(ordersResponse.elements[0].id);
        console.log('detail',orderDetails);
      } catch (error) {
        console.error("Error fetching customer orders:", error);
      }
    },
    showProfileDetails() {
      this.hideAllSections();
      document.getElementById('profileDetails').style.display = 'block';
      this.setActiveLink(0);
    },
    showOrderDetails() {
      this.hideAllSections();
      document.getElementById('orderDetails').style.display = 'block';
      this.setActiveLink(1);
    },
    showAddressBook() {
      this.hideAllSections();
      document.getElementById('addressBook').style.display = 'block';
      this.setActiveLink(2);
    },
    hideAllSections() {
      document.getElementById('orderDetails').style.display = 'none';
      document.getElementById('profileDetails').style.display = 'none';
      document.getElementById('addressBook').style.display = 'none';
    },
    setActiveLink(index) {
      document.querySelector('.list-group-item.active').classList.remove('active');
      document.querySelectorAll('.list-group-item')[index].classList.add('active');
    },
    handleLogout() {
        localStorage.removeItem('accessToken');
        this.$router.push({ path: '/login' });
      }
  },
  mounted() {
    this.fetchUserData();
  }
};
</script>

<style scoped>
.list-group-item.active {
  background: #ffc107;
}

/* end common class */
.top-status ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
}

.top-status ul li {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border: 8px solid #ddd;
  box-shadow: 1px 1px 10px 1px #ddd inset;
  margin: 10px 5px;
}

.top-status ul li.active {
  border-color: #06C167;
  box-shadow: 1px 1px 20px 1px #ffc107 inset;
}

/* end top status */

ul.timeline {
  list-style-type: none;
  position: relative;
}

ul.timeline:before {
  content: ' ';
  background: #d4d9df;
  display: inline-block;
  position: absolute;
  left: 29px;
  width: 2px;
  height: 100%;
  z-index: 400;
}

ul.timeline>li {
  margin: 20px 0;
  padding-left: 30px;
}

ul.timeline>li:before {
  content: '\2713';
  background: #fff;
  display: inline-block;
  position: absolute;
  border-radius: 50%;
  border: 0;
  left: 5px;
  width: 50px;
  height: 50px;
  z-index: 400;
  text-align: center;
  line-height: 50px;
  color: #d4d9df;
  font-size: 24px;
  border: 2px solid var(--ogenix-primary);
}

ul.timeline>li.active:before {
  content: '\2713';
  background: #28a745;
  display: inline-block;
  position: absolute;
  border-radius: 50%;
  border: 0;
  left: 5px;
  width: 50px;
  height: 50px;
  z-index: 400;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 30px;
  border: 2px solid var(--ogenix-primary);
}

/* end timeline */
</style>
