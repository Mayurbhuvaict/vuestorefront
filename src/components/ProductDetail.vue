<template>
    <div class="product-detail" v-if="product">
      <h1>{{ product.name }}</h1>
      <img :src="product.cover?.media?.url" :alt="product.name" class="product-image" />
      <p class="product-price">{{ getPrice(product) }}</p>
      <div class="product-description" v-html="product.description"></div>
      <button class="add-to-cart" @click="handleAddToCart(product)">Add to Cart</button>
      <button class="add-to-wishlist" @click="handleAddToWishlist(product)">Add to Wishlist</button>
    </div>
    <div v-else class="loading">Loading...</div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import CartStore from '@/store/CartStore';
  import { getProduct,addWishlistProduct } from '@shopware-pwa/api-client';
  
  export default {
    name: 'ProductDetail',
    setup() {
      const route = useRoute();
      const product = ref(null);
      const isLoading = ref(true);
  
      const fetchProduct = async (productId) => {
        isLoading.value = true;
        try {
          const response = await getProduct(productId);
          product.value = response.product;
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
  
      const handleAddToCart = async (product) => {
        isLoading.value = true;
        try {
          await CartStore.addToCart(product);
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
  
      onMounted(() => {
        fetchProduct(route.params.id);
      });
  
      watch(() => route.params.id, (newId) => {
        fetchProduct(newId);
      });
  
      return { product, getPrice, handleAddToCart, handleAddToWishlist, isLoading };
    }
  };
  </script>
  
  <style scoped>
  .product-detail {
    padding: 20px;
  }
  
  .product-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .product-price {
    color: #888;
    margin: 10px 0;
  }
  
  .add-to-cart, .add-to-wishlist {
    background-color: #007bff;
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
  