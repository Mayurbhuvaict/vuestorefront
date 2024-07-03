<template>
  <div class="cart">
    <h2>Cart</h2>
    <div v-if="isCartEmpty" class="empty-cart">
      <p>Cart is empty</p>
    </div>
    <div v-else class="product-grid">
      <div class="product-card" v-for="(item, index) in cartItems" :key="index">
        <img :src="getProductImage(item.product)" :alt="item.product.name" class="product-image" />
        <div class="product-details">
          <h3>{{ item.product.name }}</h3>
          <p>Quantity: {{ item.quantity }}</p>
          <p>Price: {{ getPrice(item) }}</p>
        </div>
      </div>
    </div>
    <p>Total: {{ getTotalPrice() }}</p>
    <button v-if="!isCartEmpty" @click="checkout" class="checkout-button">Checkout</button>
    <CartSuccessModal v-if="showSuccessModal" @close="closeSuccessModal" />
    <CartErrorModal v-if="showErrorModal" @close="closeErrorModal" />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import CartStore from '@/store/CartStore';
import { createOrder } from '@shopware-pwa/api-client';
import CartSuccessModal from '@/components/CartSuccessModal.vue';
import CartErrorModal from '@/components/CartErrorModal.vue'; // Import CartErrorModal

export default {
  name: 'Cart',
  components: {
    CartSuccessModal,
    CartErrorModal,
  },
  props: {
    userData: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const cartItems = computed(() => CartStore.getCartItems());
    const showSuccessModal = ref(false);
    const showErrorModal = ref(false);
    const router = useRouter(); // Get the router instance

    const isCartEmpty = computed(() => cartItems.value.length === 0);

    const getProductImage = (product) => {
      console.log(product.cover.media.length);
      if (product && product.cover.media) {
        return product.cover.media.url;
      } else {
        return 'default-image-url';
      }
    };

    const getPrice = (item) => {
      if (item.product.calculatedPrice && item.product.calculatedPrice.unitPrice) {
        const price = item.product.calculatedPrice.unitPrice.toFixed(2);
        const currencyId = item.product.calculatedPrice.calculatedTaxes[0]?.tax?.name || '€';
        return `${price} ${currencyId}`;
      } else {
        return "Price not available";
      }
    };

    const getTotalPrice = () => {
      let total = 0;
      CartStore.getCartItems().forEach(item => {
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
        console.log('Order placed successfully:', order);
        closeCart();
        showSuccessModal.value = true; // Show success modal
      } catch (error) {
        console.error('Error during checkout:', error);
        showErrorModal.value = true; // Show error modal
      }
    };

    const closeSuccessModal = () => {
      showSuccessModal.value = false;
      // Redirect to profile without refreshing the page
      router.push('/profile');
    };

    const closeErrorModal = () => {
      showErrorModal.value = false;
    };

    return {
      cartItems,
      getProductImage,
      getPrice,
      getTotalPrice,
      checkout,
      isCartEmpty,
      showSuccessModal,
      showErrorModal,
      closeSuccessModal,
      closeErrorModal,
    };
  },
};
</script>

<style scoped>
.cart {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.empty-cart {
  text-align: center;
  font-size: 18px;
  color: #888;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: calc(33.333% - 16px); /* Adjust based on the desired number of columns */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-image {
  width: 100%;
  height: auto;
  max-width: 150px; /* Adjust as needed */
  margin-bottom: 16px;
}

.product-details {
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

.checkout-button {
  margin-top: 16px;
}
</style>
