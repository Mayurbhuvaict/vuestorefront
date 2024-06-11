<template>
    <div class="wishlist">
      <h1>My Wishlist</h1>
      <div v-if="isLoading" class="loading">Loading...</div>
      <div v-else>
        <div v-if="wishlistItems.length === 0" class="empty-wishlist">
          Your wishlist is empty.
        </div>
        <div v-else class="wishlist-items">
          <div class="wishlist-item" v-for="item in wishlistItems" :key="item.id">
            <img :src="item.cover?.media?.url" :alt="item.name" class="wishlist-item-image" />
            <div class="wishlist-item-details">
              <h2>{{ item.name }}</h2>
              <p>{{ getPrice(item) }}</p>
              <button class="remove-from-wishlist" @click="handleRemoveFromWishlist(item.id)">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getWishlistProducts, removeWishlistProduct } from '@shopware-pwa/api-client';
  
  export default {
    name: 'AddToWishlist',
    setup() {
      const wishlistItems = ref([]);
      const isLoading = ref(false);
  
      const fetchWishlist = async () => {
        isLoading.value = true;
        try {
          const response = await getWishlistProducts();
          wishlistItems.value = response.products?.elements || [];
        } catch (error) {
          console.error("Error fetching wishlist:", error);
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
  
      const handleRemoveFromWishlist = async (productId) => {
        isLoading.value = true;
        try {
          await removeWishlistProduct(productId);
          fetchWishlist();
        } catch (error) {
          alert("Failed to remove product from wishlist.");
          console.error("Error removing product from wishlist:", error);
        } finally {
          isLoading.value = false;
        }
      };
  
      onMounted(fetchWishlist);
  
      return { wishlistItems, getPrice, handleRemoveFromWishlist, isLoading };
    },
  };
  </script>
  
  <style scoped>
  .wishlist {
    padding: 20px;
  }
  
  .loading {
    text-align: center;
    font-size: 1.2em;
    padding: 20px;
  }
  
  .empty-wishlist {
    text-align: center;
    font-size: 1.2em;
    padding: 20px;
  }
  
  .wishlist-items {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .wishlist-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    width: calc(20% - 10px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .wishlist-item-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .wishlist-item-details {
    margin-top: 10px;
  }
  
  .wishlist-item-details h2 {
    font-size: 18px;
    margin: 0;
  }
  
  .wishlist-item-details p {
    color: #888;
    margin: 10px 0;
  }
  
  .remove-from-wishlist {
    background-color: #ff5733;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .remove-from-wishlist:hover {
    background-color: #c70039;
  }
  </style>
  