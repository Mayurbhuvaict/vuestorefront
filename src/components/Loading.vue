<!-- src/components/Loading.vue -->
<template>
  <div
    v-if="loading"
    class="loading"
  >
    <img
      src="../../public/banner/loader.gif"
      alt="Loading..."
    >
  </div>
</template>
  
  <script>
  export default {
    props: {
      loading: {
        type: Boolean,
        default: false
      }
    }
  }
  </script>
  
  