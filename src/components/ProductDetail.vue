<template>
  <div
    v-if="product"
    class="product-detail"
  >
    <h1>{{ product.translated.name }}</h1>
    <div class="product-container">
      <img
        :src="product.cover?.media?.url"
        :alt="product.translated.name"
        class="product-image"
      >
      <div class="product-actions">
        <p class="product-price">
          {{ getPrice(product) }}
        </p>
        <div class="quantity-controls">
          <button @click="decrementQuantity">
            -
          </button>
          <input
            v-model.number="quantity"
            type="number"
            min="1"
          >
          <button @click="incrementQuantity">
            +
          </button>
        </div>
        <div class="btn-group">
          <button
            class="add-to-cart"
            @click="handleAddToCart(product, quantity)"
          >
            Add to Cart
          </button>
          <button
            class="add-to-wishlist"
            @click="handleAddToWishlist(product)"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
    <div
      class="product-description"
      v-html="product.description"
    />
  </div>
  <div
    v-else
    class="loading"
  >
    <img
      src="../../public/banner/loader.gif"
      alt="Loading..."
    >
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import CartStore from '@/store/CartStore';
import { getProduct, addWishlistProduct } from '@shopware-pwa/api-client';

export default {
  name: 'ProductDetail',
  setup() {
    const route = useRoute();
    const product = ref(null);
    const isLoading = ref(true);
    const quantity = ref(1);

    const fetchProduct = async (productId) => {
      isLoading.value = true;
      try {
        const response = await getProduct(productId);
        product.value = response.product;
        console.log(product.value);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const getPrice = (product) => {
      if (product.calculatedPrice && product.calculatedPrice.unitPrice) {
        const price = product.calculatedPrice.unitPrice.toFixed(2);
        const currencyId = product.calculatedPrice.calculatedTaxes[0]?.tax?.name || '€';
        return `${price} ${currencyId}`;
      } else {
        return "Price not available";
      }
    };

    const handleAddToCart = async (product, quantity) => {
      isLoading.value = true;
      try {
        await CartStore.addToCart(product, quantity);
        CartStore.isCartOpen = true;
        alert('Product added to cart!');
      } catch (error) {
        alert('Failed to add product to cart.');
      } finally {
        isLoading.value = false;
      }
    };

    const handleAddToWishlist = async (product) => {
      try {
        await addWishlistProduct(product.id);
        alert('Product added to wishlist!');
      } catch (error) {
        console.error('Error adding product to wishlist:', error);
        alert('Failed to add product to wishlist.');
      }
    };

    const incrementQuantity = () => {
      quantity.value += 1;
    };

    const decrementQuantity = () => {
      if (quantity.value > 1) {
        quantity.value -= 1;
      }
    };

    onMounted(() => {
      fetchProduct(route.params.id);
    });

    watch(() => route.params.id, (newId) => {
      fetchProduct(newId);
    });

    return {
      product,
      getPrice,
      handleAddToCart,
      handleAddToWishlist,
      isLoading,
      quantity,
      incrementQuantity,
      decrementQuantity
    };
  }
};
</script>

<style scoped>
.product-detail {
  padding: 20px;
}

.product-container {
  display: flex;
  align-items: flex-start;
}

.product-image {
  max-width: 50%;
  height: auto;
  border-radius: 8px;
}

.product-actions {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.quantity-controls button {
  background-color: #0b2f80;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.quantity-controls input {
  width: 50px;
  text-align: center;
  margin: 0 5px;
}

.add-to-cart, .add-to-wishlist {
  background-color: #0b2f80;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.add-to-cart:hover, .add-to-wishlist:hover {
  background-color: #0056b3;
}

.add-to-wishlist {
  background-color: #ff5733;
}

.add-to-wishlist:hover {
  background-color: #c70039;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  padding: 20px;
}
</style>
