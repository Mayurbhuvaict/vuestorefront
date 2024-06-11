<template>
<!--  <div class="navbar-collapse dark" id="navbarCollapse">-->
<!--    <div class="navbar-nav mx-auto">-->
      <ul>
        <category-item v-for="category in treeData" :key="category.id" :category="category" />
      </ul>
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import { ref, onMounted } from 'vue';
import CategoryItem from '../components/CategoryItem.vue';
import { getCategories } from '@shopware-pwa/api-client';

export default {
  components: {
    CategoryItem,
  },
  setup() {
    const categories = ref([]);
    const treeData = ref([]);

    const fetchCategories = async () => {
      const response = await getCategories(); // Assuming you have this function
      categories.value = response?.elements || [];
      treeData.value = buildTree(categories.value);
    };

    onMounted(() => {
      fetchCategories();
    });

    return {
      treeData,
    };
  },
};

function buildTree(data) {
  const tree = {};
  const map = {};
  let rootCategoryId = null;

  // const homeItem = {
  //   active: true,
  //   afterCategoryId: null,
  //   childCount: "0",
  //   id: "home",
  //   level: "2",
  //   parentId: null,
  //   translated: {
  //     name: "Home"
  //   },
  //   children: []
  // };

  // Create a map and find the root category id
  data.forEach(item => {
    map[item.id] = { ...item, children: [] };
    if (item.level === 1) {
      rootCategoryId = item.id;
    }
  });

  // Build the tree structure
  data.forEach(item => {
    if (item.active === true) {
      if (item.parentId && map[item.parentId]) {
        map[item.parentId].children.push(map[item.id]);
      } else if (item.level !== 1) {
        tree[item.id] = map[item.id];
      }
    }
  });

  return rootCategoryId ? map[rootCategoryId].children : Object.values(tree);
  // Return the children of the root category as the tree
  // const rootChildren = rootCategoryId ? map[rootCategoryId].children : Object.values(tree);
  // rootChildren.unshift(homeItem);
  //
  // return rootChildren;
}
</script>
<style scoped src="../assets/css/demo.css" />