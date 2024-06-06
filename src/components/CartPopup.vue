<!-- <template>
  <div class="cart-popup" v-if="isCartOpen">
    <h2>Shopping Cart</h2>
    <div class="cart-grid">
      <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <div class="cart-item-image">
          <img :src="item.cover?.media?.url" :alt="item.name" />
        </div>
        <div class="cart-item-details">
          <p>{{ item.name }}</p>
          <p>Price: {{ item.calculatedPrice.unitPrice.toFixed(2) }} {{ item.calculatedPrice.calculatedTaxes[0]?.tax?.name || '€' }}</p>
          <p>Quantity: {{ item.quantity }}</p>
        </div>
      </div>
    </div>
    <p>Total: {{ cartTotal.toFixed(2) }}</p>
    <button @click="checkout" class="checkout-button">Checkout</button>
    <button @click="closeCart" class="close-button">Close</button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { createOrder } from '@shopware-pwa/api-client';
import CartStore from '@/store/CartStore';

export default {
  props: {
    userData: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const isCartOpen = computed(() => CartStore.isCartOpen);
    const cartItems = computed(() => CartStore.cart.items);
    const cartTotal = computed(() => {
      return cartItems.value.reduce((total, item) => {
        return total + item.calculatedPrice.unitPrice * item.quantity;
      }, 0);
    });

    const closeCart = () => {
      CartStore.isCartOpen = false;
    };

    const checkout = async () => {
      try {
        console.log('Initiating checkout process...');
        const order = await createOrder({
          lineItems: cartItems.value.map(item => ({
            referencedId: item.versionId,
            quantity: 1,
          })),
          billingAddress: {
            fullName: props.userData ? `${props.userData.firstName} ${props.userData.lastName}` : 'Guest User',
            email: props.userData ? props.userData.email : 'guest@example.com',
            street: props.userData ? props.userData.street : '123 Main St',
            city: props.userData ? props.userData.city : 'Anytown',
            zipCode: props.userData ? props.userData.zipCode : '12345',
            country: props.userData ? props.userData.country : 'US',
          },
        });
console.log(order);
        console.log('Order placed successfully:', order);
        closeCart(); 
      } catch (error) {
        console.error('Error during checkout:', error);
      }
    };

    return { isCartOpen, cartItems, cartTotal, closeCart, checkout };
  },
};
</script>


<style scoped>
.cart-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
  color: white;
  padding: 1em;
}

.cart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Adjust column size as needed */
  gap: 20px; /* Adjust gap between grid items */
}

.cart-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.cart-item-image img {
  width: 100px; /* Adjust image size as needed */
  height: 100px; /* Adjust image size as needed */
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.close-button {
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #0056b3;
}
</style> -->
<template>
  <div class="cart">
    <h2>Cart</h2>
    <ul>
      <li v-for="(item, index) in cartItems" :key="index">
        {{ item.product.name }} - {{ item.quantity }} - {{ getPrice(item) }}
      </li>
    </ul>
    <p>Total: {{ getTotalPrice() }}</p>
  </div>
  <button @click="checkout" class="checkout-button">Checkout</button>
</template>

<script>
import { computed } from 'vue';
import CartStore from '@/store/CartStore';
import { createOrder } from '@shopware-pwa/api-client';

export default {
  name: 'Cart',
  props: {
    userData: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const cartItems = computed(() => CartStore.getCartItems());
    const getPrice = (item) => {
      console.log(item);
      if (item.calculatedPrice && item.calculatedPrice.unitPrice) {
        const price = item.calculatedPrice.unitPrice.toFixed(2);
        const currencyId = item.calculatedPrice.calculatedTaxes[0]?.tax?.name || '€';
        return `${price} ${currencyId}`;
      } else {
        return "Price not available";
      }
    };

    const getTotalPrice = () => {
      let total = 0;

      CartStore.getCartItems().forEach(item => {
        console.log('product item',item.product);
        total += item.product.calculatedPrice.unitPrice * item.quantity;
      });
      return total.toFixed(2);
    };
    const closeCart = () => {
      CartStore.isCartOpen = false;
    };
    const checkout = async () => {
      try {
        console.log('Initiating checkout process...');
        const order = await createOrder({
          lineItems: cartItems.value.map(item => ({
            referencedId: item.versionId,
            quantity: 1,
          })),
          billingAddress: {
            fullName: props.userData ? `${props.userData.firstName} ${props.userData.lastName}` : 'Guest User',
            email: props.userData ? props.userData.email : 'guest@example.com',
            street: props.userData ? props.userData.street : '123 Main St',
            city: props.userData ? props.userData.city : 'Anytown',
            zipCode: props.userData ? props.userData.zipCode : '12345',
            country: props.userData ? props.userData.country : 'US',
          },
        });
console.log(order);
        console.log('Order placed successfully:', order);
        closeCart(); 
      } catch (error) {
        console.error('Error during checkout:', error);
      }
    };
    return { cartItems, getPrice, getTotalPrice, checkout };
  }
};
</script>


<style scoped>
.cart {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}
</style>
