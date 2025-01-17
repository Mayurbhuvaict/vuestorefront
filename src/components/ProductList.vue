<template>
  <div class="product-list">
    <h1>Product List</h1>
    <div class="products">
      <div class="product-card" v-for="product in products" :key="product.id">
        <img :src="product.cover?.media?.url" :alt="product.name" class="product-image" />
        <div class="product-details">
          <h2 class="product-name">{{ product.name }}</h2>
          <p class="product-price">{{ getPrice(product) }}</p>
          <button class="add-to-cart" @click="handleAddToCart(product)">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
  <CartPopup />
</template>

<script>
import CartPopup from '@/components/CartPopup';
import { ref, onMounted } from 'vue';
import { getProducts } from '@shopware-pwa/api-client';
import CartStore from '@/store/CartStore';

export default {
  name: 'ProductList',
  components: {
    CartPopup
  },
  setup() {
    const products = ref([]);
    const isLoading = ref(false);

    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        products.value = response?.elements || [];
      } catch (error) {
        console.error("Error fetching product list:", error);
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

    const addToCart = (product) => {
      CartStore.addToCart(product);
      CartStore.isCartOpen = true;
    };

    const handleAddToCart = async (product) => {
      isLoading.value = true;
      try {
        await addToCart(product);
        alert('Product added to cart!');
      } catch (error) {
        alert('Failed to add product to cart.');
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(fetchProducts);

    return { products, getPrice, addToCart, handleAddToCart, isLoading };
  },
};
</script>
<style scoped>
.product-list {
  padding: 20px;
}

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Reduced the gap between products */
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: calc(20% - 10px); /* Adjusted width to fit 5 products in a row */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-details {
  margin-top: 10px;
}

.product-name {
  font-size: 18px;
  margin: 0;
}

.product-price {
  color: #888;
  margin: 10px 0;
}

.add-to-cart {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart:hover {
  background-color: #0056b3;
}
</style>
