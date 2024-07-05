<template>
  <div class="checkout">
    <h3>Checkout</h3>
    <form @submit.prevent="processCheckout">
      <div class="form-group">
        <label for="fullName">Full Name:</label>
        <input
          id="fullName"
          v-model="fullName"
          type="text"
          required
        >
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
        >
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <textarea
          id="address"
          v-model="address"
          required
        />
      </div>
      <div class="form-group">
        <label for="paymentMethod">Payment Method:</label>
        <select
          id="paymentMethod"
          v-model="paymentMethod"
          required
        >
          <option value="creditCard">
            Credit Card
          </option>
          <option value="paypal">
            PayPal
          </option>
          <option value="bankTransfer">
            Bank Transfer
          </option>
        </select>
      </div>
      <button type="submit">
        Place Order
      </button>
    </form>
  </div>
</template>
  
  <script>
  import { ref } from 'vue';
  import { createCheckout, addProductToCheckout, setCustomer, setShippingMethod, setPaymentMethod, placeOrder } from '@shopware-pwa/api-client';
  
  export default {
    setup() {
      const fullName = ref('');
      const email = ref('');
      const address = ref('');
      const paymentMethod = ref('creditCard'); // Default payment method
  
      const processCheckout = async () => {
        try {
          // Step 1: Create a new checkout session
          const checkout = await createCheckout();
  
          // Step 2: Add products to the checkout session (if needed)
          // For example:
          // await addProductToCheckout(checkout.token, productId, quantity);
  
          // Step 3: Set customer information
          await setCustomer(checkout.token, {
            fullName: fullName.value,
            email: email.value,
            address: address.value,
          });
  
          // Step 4: Set shipping method
          // For example:
          // await setShippingMethod(checkout.token, shippingMethodId);
  
          // Step 5: Set payment method
          await setPaymentMethod(checkout.token, paymentMethod.value);
  
          // Step 6: Place the order
          await placeOrder(checkout.token);
  
          // Reset form fields after successful checkout
          fullName.value = '';
          email.value = '';
          address.value = '';
          paymentMethod.value = 'creditCard'; // Reset to default payment method
  
          // Optionally, you can redirect to a success page or display a success message
          console.log('Order placed successfully!');
        } catch (error) {
          console.error('Error processing checkout:', error);
          // Handle errors, e.g., display an error message to the user
        }
      };
  
      return { fullName, email, address, paymentMethod, processCheckout };
    },
  };
  </script>
  
  <style scoped>
  .checkout {
    margin-top: 20px;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    margin-top: 5px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  