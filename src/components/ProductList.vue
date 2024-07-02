<template>
  <div class="product-list">
    <!-- <h1>Product List</h1> -->
    <CategoryList @category-selected="handleCategorySelected" />
    <div class="banner-container">
      <img :src="bannerUrl" alt="Banner" class="banner-image" v-if="bannerUrl" />
    </div>
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
          <button v-if="!product.optionIds" class="add-to-cart" @click.stop="handleAddToCart(product)">Add to Cart</button>
          <button class="add-to-wishlist" @click.stop="handleAddToWishlist(product)">Add to Wishlist</button>
          <button v-if="product.optionIds" class="detail-button" @click.stop="openProductDetail(product.id)">Detail</button>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="loading">Loading...</div>
  </div>
  <!-- <CartPopup /> -->
</template>



<script>
// import CartPopup from '@/components/CartPopup';
import CategoryList from '@/components/CategoryList';
import { ref, onMounted, watch } from 'vue';
import { getCategoryProducts, getProducts, addWishlistProduct } from '@shopware-pwa/api-client';
import CartStore from '@/store/CartStore';
import { useRouter } from 'vue-router';

export default {
  name: 'ProductList',
  components: {
    // CartPopup,
    CategoryList
  },
  setup() {
    const router = useRouter();
    const products = ref([]);
    const isLoading = ref(false);
    const selectedCategory = ref(null);
    const bannerUrl = ref('');

    const fetchProducts = async (categoryId = null) => {
      isLoading.value = true;
      try {
        const response = categoryId
          ? await getCategoryProducts(categoryId, {})
          : await getProducts();
          
        const uniqueProducts = [];
        const productNames = new Set();

        (response?.elements || []).forEach(product => {
          const productName = product.translated.name;
          if (!productNames.has(productName)) {
            productNames.add(productName);
            uniqueProducts.push(product);
          }
        });

        products.value = uniqueProducts;
      } catch (error) {
        console.error("Error fetching product list:", error);
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

    const addToWishlist = async (product) => {
      try {
        await addWishlistProduct(product.id);
        alert('Product added to wishlist!');
      } catch (error) {
        console.error('Error adding product to wishlist:', error);
        alert('Failed to add product to wishlist.');
      }
    };

    const handleAddToWishlist = async (product) => {
      isLoading.value = true;
      try {
        await addToWishlist(product);
      } catch (error) {
        alert('Failed to add product to wishlist.');
      } finally {
        isLoading.value = false;
      }
    };
    const loadBanner = () => {
      // Set the URL for your banner image
      bannerUrl.value = `${process.env.BASE_URL}banner/homepagebanner.webp`; // Update the banner image name as needed
    };
    const handleCategorySelected = (category) => {
      selectedCategory.value = category.id;
    };

    const openProductDetail = (productId) => {
      router.push({ name: 'ProductDetail', params: { id: productId } });
    };

    watch(selectedCategory, (newCategoryId) => {
      fetchProducts(newCategoryId);
    });

    onMounted(() => {loadBanner();
    fetchProducts();
  });

    return {
      products,
      getPrice,
      addToCart,
      handleAddToCart,
      handleAddToWishlist,
      isLoading,
      handleCategorySelected,
      openProductDetail,
      bannerUrl
    };
  },
};
</script>


<style scoped>
.product-list {
  padding: 0px;
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

.add-to-cart, .add-to-wishlist, .detail-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.add-to-cart:hover, .add-to-wishlist:hover, .detail-button:hover {
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
.banner-container {
  margin: 20px 0; /* Adjust the margin as needed */
  text-align: center;
}

.banner-image {
  max-width: 100%;
  height: auto;
  width: 100%;
}
</style>
