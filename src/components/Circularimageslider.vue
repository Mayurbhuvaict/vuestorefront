<!-- src/components/ImageGallery.vue -->
<template>
    <div class="image-gallery">
      <h1 class="gallery-title">Category</h1>
      <div class="gallery-images">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="gallery-item"
          @click="handleImageClick(image)"
        >
          <img :src="image.src" :alt="image.alt" class="gallery-image">
          <div class="image-name">{{ image.alt }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'ImageGallery',
    setup() {
      const images = ref([
        { id: '251448b91bc742de85643f5fccd89051', src: `${process.env.BASE_URL}banner/lamp.jpeg`, alt: 'Lamp' },
        { id: '2185182cbbd4462ea844abeb2a438b33', src: `${process.env.BASE_URL}banner/bulb.jpeg`, alt: 'Bulb' },
        { id: '8de9b484c54f441c894774e5f57e485c', src: `${process.env.BASE_URL}banner/chair.jpeg`, alt: 'Chair' },
        { id: 'a515ae260223466f8e37471d279e6406', src: `${process.env.BASE_URL}banner/table.jpeg`, alt: 'Table' },
        { id: 5, src: `${process.env.BASE_URL}banner/bed.jpeg`, alt: 'Bed' },
      ]);
  
      const router = useRouter();
  
      const handleImageClick = (image) => {
        router.push({ name: 'CategoryProductList', params: { categoryId: image.id } });
      };
  
      return {
        images,
        handleImageClick,
      };
    },
  };
  </script>
  
  <style scoped>
  .image-gallery {
    max-width: 100%;
    margin: 20px auto;
    padding: 0 20px;
  }
  
  .gallery-title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .gallery-images {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
  .gallery-item {
    width: 18%;
    margin-bottom: 20px;
    text-align: center;
    cursor: pointer;
  }
  
  .gallery-image {
    width: 100%;
    height: auto;
    border-radius: 50%;
  }
  
  .image-name {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }
  </style>
  