<template>
  <div class="product-list">
    <h1>Product List</h1>
    <CategoryList @category-selected="handleCategorySelected" />
    <div class="products" v-if="!isLoading">
      <div class="product-card" v-for="product in products" :key="product.id">
        <img :src="product.cover?.media?.url" :alt="product.name" class="product-image" />
        <div class="product-details">
          <h2 class="product-name">{{ product.name }}</h2>
          <p class="product-price">{{ getPrice(product) }}</p>
          <button class="add-to-cart" @click="handleAddToCart(product)">Add to Cart</button>
          <button class="add-to-wishlist" @click="handleAddToWishlist(product)">Add to Wishlist</button>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="loading">Loading...</div>
  </div>
  <CartPopup />
</template>

<script>
import CartPopup from '@/components/CartPopup';
import CategoryList from '@/components/CategoryList';
import { ref, onMounted, watch } from 'vue';
import { getCategoryProducts, getProducts, addWishlistProduct } from '@shopware-pwa/api-client';
import CartStore from '@/store/CartStore';

export default {
  name: 'ProductList',
  components: {
    CartPopup,
    CategoryList
  },
  setup() {
    const products = ref([]);
    const isLoading = ref(false);
    const selectedCategory = ref(null);

    const fetchProducts = async (categoryId = null) => {
      isLoading.value = true;
      try {
        const response = categoryId
          ? await getCategoryProducts(categoryId, {})
          : await getProducts();
        products.value = response?.elements || [];
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
        console.log(product.id);
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

    const handleCategorySelected = (category) => {
      selectedCategory.value = category.id;
    };

    watch(selectedCategory, (newCategoryId) => {
      fetchProducts(newCategoryId);
    });

    onMounted(() => fetchProducts());

    return { products, getPrice, addToCart, handleAddToCart, handleAddToWishlist, isLoading, handleCategorySelected };
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
