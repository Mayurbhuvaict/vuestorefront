<template>
  <div class="category-list">
    <h2>Categories</h2>
    <ul>
      <li v-for="category in categories" :key="category.id" @click="selectCategory(category)">
        {{ category.name }}
        {{ category }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {getCategories} from '@shopware-pwa/api-client';

export default {
  setup(props, { emit }) {
    const categories = ref([]);
    // const criteria = {
    //   page: 1,
    //   limit: 10,
    //   filter: [
    //     {
    //       type: "equals",
    //       field: "parentId",
    //       value: null,
    //     },
    //   ]
    // };
    const fetchCategories = async () => {
      try {
        const response = await getCategories(); // Assuming you have a method to fetch categories
        categories.value = response?.elements || [];
        console.log(response.elements);
        let html = '';
        categories.value.forEach(category => {
          if (category.level === 2) {
            html += '<ul id='+category.id+'></ul>';
            console.log(html);
          }
        });
        // for (const responseKey in response.elements) {
        //   console.log(responseKey);
        // }
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

<style scoped src="../assets/css/demo.css" />