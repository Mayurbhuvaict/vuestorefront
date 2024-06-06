<template>
  <div class="category-list">
    <h2>Categories</h2>
    <ul>
      <li v-for="category in categories" :key="category.id" @click="selectCategory(category)">
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getCategories } from '@shopware-pwa/api-client';

export default {
  setup(props, { emit }) {
    const categories = ref([]);

    const fetchCategories = async () => {
      try {
        const response = await getCategories(); // Assuming you have a method to fetch categories
        categories.value = response?.elements || [];
      } catch (error) {
        console.error("Error fetching category list:", error);
      }
    };

    const selectCategory = (category) => {
      emit('category-selected', category); // Emit event when category is selected
    };

    onMounted(fetchCategories);

    return { categories, selectCategory };
  },
};
</script>

<style scoped>
.category-list {
  margin-top: 20px;
}

.category-list h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.category-list ul {
  list-style-type: none;
  padding: 0;
}

.category-list li {
  margin-bottom: 5px;
  cursor: pointer;
  color: #333;
}

.category-list li:hover {
  color: #007bff;
}
</style>
