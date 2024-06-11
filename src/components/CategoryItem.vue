<template>
  <li>
    <a :href="getCategoryLink(category)" class="category-link">{{ category.translated.name }}</a>
    <ul v-if="category.children.length">
      <category-item v-for="child in category.children" :key="child.id" :category="child" />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'CategoryItem',
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getCategoryLink(category) {
      // Construct the URL or route path for the category
      // Replace with your actual URL structure or use a route name
      return `/category/${category.id}`;
    },
  },
};
</script>
<style scoped src="../assets/css/demo.css" />