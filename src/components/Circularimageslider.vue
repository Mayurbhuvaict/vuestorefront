<!-- src/components/ImageGallery.vue -->
<template>
  <div class="image-gallery-section">
    <div class="container">
      <div class="image-gallery">
        <h1 class="gallery-title">
          Category
        </h1>
        <div class="gallery-images">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="gallery-item aos-init"
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
            @click="handleImageClick(image)"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="gallery-image"
            >
            <div class="image-name">
              {{ image.alt }}
            </div>
          </div>
        </div>
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
        { id: '251448b91bc742de85643f5fccd89051', src: `${process.env.BASE_URL}banner/villa-category-image-1.webp`, alt: 'Loungemöbel' },
        { id: '2185182cbbd4462ea844abeb2a438b33', src: `${process.env.BASE_URL}banner/villa-category-image-2.webp`, alt: 'Sitzmöbel' },
        { id: '8de9b484c54f441c894774e5f57e485c', src: `${process.env.BASE_URL}banner/villa-cateegory-image-3.webp`, alt: 'Tische' },
        { id: 'a515ae260223466f8e37471d279e6406', src: `${process.env.BASE_URL}banner/villa-cateegory-image-4.webp`, alt: 'Sonnenschirme' },
        { id: 5, src: `${process.env.BASE_URL}banner/villa-cateegory-image-5.webp`, alt: 'Besonderes' },
        { id: 6, src: `${process.env.BASE_URL}banner/villa-category-image-6.webp`, alt: 'Schlafzimmer' },
        // { id: 7, src: `${process.env.BASE_URL}banner/villa-category-image-7.webp`, alt: 'Beleuchtung' },
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

  </style>
  