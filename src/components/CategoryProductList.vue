<template>
  <div class="product-list">
    <!-- Space above the product list -->
    <div style="height: 50px;" />
    <!-- Arrow button to go back to home page -->
    <button
      class="back-to-home"
      @click="goToHomePage"
    >
      <i class="fas fa-arrow-left" /> Back to Home
    </button>
    <div
      v-if="!isLoading"
      class="products"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
        @click="openProductDetail(product.id)"
      >
        <img
          :src="product.cover?.media?.url"
          :alt="product.name"
          class="product-image"
        >
        <div class="product-details">
          <h2 class="product-name">
            {{ product.translated.name }}
          </h2>
          <p class="product-price">
            {{ getPrice(product) }}
          </p>
          <p class="product-description">
            {{ truncateDescription(product.translated.description) }}
          </p>
           
          <div class="btn-group">
            <button
              v-if="!product.optionIds"
              class="add-to-cart"
              @click.stop="handleAddToCart(product)"
            >
              Add to Cart
            </button>
            <button
              v-if="product.optionIds"
              class="detail-button"
              @click.stop="openProductDetail(product.id)"
            >
              Detail
            </button>
            <button
              class="add-to-wishlist"
              @click.stop="handleAddToWishlist(product)"
            >
              <i class="fas fa-heart" />
            </button>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Space below the product list -->
    <div style="height: 50px;" />
      
  
    <div
      v-if="isLoading"
      class="loading"
    >
      <img
        src="../../public/banner/loader.gif"
        alt="Loading..."
      >
    </div>
    <div
      v-if="showCartModal"
      class="modal"
      @click="showCartModal = false"
    >
      <div class="modal-content">
        ✔ Product added to cart!
      </div>
    </div>
    <div
      v-if="showWishlistModal"
      class="modal"
      @click="showWishlistModal = false"
    >
      <div class="modal-content">
        ✔  Product added to wishlist!
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

