<template>
    <div class="product-list">
      <!-- Space above the product list -->
      <div style="height: 50px;"></div>
            <!-- Arrow button to go back to home page -->
            <button class="back-to-home" @click="goToHomePage">
        <i class="fas fa-arrow-left"></i> Back to Home
      </button>
      <div class="products" v-if="!isLoading">
        <div
          class="product-card"
          v-for="product in products"
          :key="product.id"
          @click="openProductDetail(product.id)"
        >
          <img :src="product.cover?.media?.url" :alt="product.name" class="product-image" />
          <div class="product-details">
            <h2 class="product-name">{{ product.translated.name }}</h2>
            <p class="product-price">{{ getPrice(product) }}</p>
            <p class="product-description">{{ truncateDescription(product.translated.description) }}</p>
            <button v-if="!product.optionIds" class="add-to-cart" @click.stop="handleAddToCart(product)">
              Add to Cart
            </button>
            <button v-if="product.optionIds" class="detail-button" @click.stop="openProductDetail(product.id)">Detail</button>
            <button class="add-to-wishlist" @click.stop="handleAddToWishlist(product)">
              <i class="fas fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Space below the product list -->
      <div style="height: 50px;"></div>
      
  
      <div v-if="isLoading" class="loading">Loading...</div>
      <div v-if="showCartModal" class="modal" @click="showCartModal = false">
        <div class="modal-content">
          Product added to cart!
        </div>
      </div>
      <div v-if="showWishlistModal" class="modal" @click="showWishlistModal = false">
        <div class="modal-content">
          Product added to wishlist!
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
import { ref, onMounted, watch } from 'vue';
import { getCategoryProducts, addWishlistProduct } from '@shopware-pwa/api-client';
import CartStore from '@/store/CartStore';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'CategoryProductList',

  setup() {
    const router = useRouter();
    const route = useRoute();
    const products = ref([]);
    const isLoading = ref(false);
    const showCartModal = ref(false);
    const showWishlistModal = ref(false);
    const selectedCategory = ref(route.params.categoryId);

    const fetchProducts = async (categoryId) => {
      isLoading.value = true;
      try {
        const response = await getCategoryProducts(categoryId, {});
        const uniqueProducts = [];
        const productNames = new Set();

        (response?.elements || []).forEach((product) => {
          const productName = product.translated.name;
          if (!productNames.has(productName)) {
            productNames.add(productName);
            uniqueProducts.push(product);
          }
        });

        products.value = uniqueProducts;
      } catch (error) {
        console.error('Error fetching product list:', error);
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
        return 'Price not available';
      }
    };

    const handleAddToCart = async (product) => {
      isLoading.value = true;
      try {
        CartStore.addToCart(product);
        showCartModal.value = true;
        setTimeout(() => {
          showCartModal.value = false;
        }, 3000);
      } catch (error) {
        console.error('Failed to add product to cart.');
      } finally {
        isLoading.value = false;
      }
    };

    const handleAddToWishlist = async (product) => {
      isLoading.value = true;
      try {
        await addWishlistProduct(product.id);
        showWishlistModal.value = true;
        setTimeout(() => {
          showWishlistModal.value = false;
        }, 3000);
      } catch (error) {
        console.error('Error adding product to wishlist:', error);
      } finally {
        isLoading.value = false;
      }
    };

    const handleCategorySelected = (category) => {
      selectedCategory.value = category.id;
    };

    const openProductDetail = (productId) => {
      router.push({ name: 'ProductDetail', params: { id: productId } });
    };

    const truncateDescription = (description) => {
      if (!description) return '';
      const lines = description.split('\n');
      return lines.length > 3 ? lines.slice(0, 3).join('\n') + '...' : description;
    };

    const goToHomePage = () => {
      router.push('/');
    };

    watch(selectedCategory, (newCategoryId) => {
      fetchProducts(newCategoryId);
    });

    onMounted(() => {
      fetchProducts(selectedCategory.value);
    });

    return {
      products,
      getPrice,
      handleAddToCart,
      handleAddToWishlist,
      isLoading,
      handleCategorySelected,
      openProductDetail,
      showCartModal,
      showWishlistModal,
      truncateDescription,
      goToHomePage,
    };
  },
};
</script>

<style scoped>
.product-list {
  padding: 20px; /* Added padding for spacing */
}

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: calc(20% - 10px);
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

.product-description {
  font-size: 14px;
  margin: 10px 0;
  color: #555;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.add-to-cart,
.add-to-wishlist,
.detail-button,
.back-to-home {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
}

.add-to-cart:hover,
.add-to-wishlist:hover,
.detail-button:hover,
.back-to-home:hover {
  background-color: #0056b3;
}

.add-to-wishlist {
  background-color: #ff5733;
}

.add-to-wishlist:hover {
  background-color: #c70039;
}

.back-to-home {
  margin-top: 20px;
  margin-bottom: 20px; /* Added margin for spacing */
}

.loading {
  text-align: center;
  font-size: 1.2em;
  padding: 20px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>
