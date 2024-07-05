<template>
  <div class="slider">
    <img
      v-for="(image, index) in images"
      :key="index"
      :src="image.src"
      :alt="image.alt"
      :style="{ opacity: index === currentIndex ? 1 : 0 }"
      class="slider-image"
    >
    <div class="navigation-button">
      <span
        v-for="(dot, index) in dots"
        :key="index"
        class="dot"
        :class="{ active: index === currentIndex }"
        @click="changeSlide(index)"
      />
    </div>
  </div>
</template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const currentIndex = ref(0);
      const interval = 3000;
      const images = ref([
        {
          src: `${process.env.BASE_URL}banner/testbanner.png`,
          alt: 'Image 1',
        },
        {
          src: `${process.env.BASE_URL}banner/demo-test.jpg`,
          alt: 'Image 2',
        },
        {
          src: `${process.env.BASE_URL}banner/demo-images.jpg`,
          alt: 'Image 3',
        },
        {
          src: `${process.env.BASE_URL}banner/Villa-banner.webp`,
          alt: 'Image 4',
        },
        {
          src: `${process.env.BASE_URL}banner/banner5.jpg`,
          alt: 'Image 5',
        },
      ]);
      const dots = ref([
        { active: true },
        { active: false },
        { active: false },
        { active: false },
        { active: false },
      ]);
  
      const changeSlide = (index) => {
        if (index !== undefined) {
          clearInterval(timer.value);
          currentIndex.value = index;
          timer.value = setInterval(changeSlide, interval);
        } else {
          currentIndex.value = (currentIndex.value + 1) % images.value.length;
        }
      };
  
      const loadDynamicImages = () => {
        // Example dynamic change of images (replace with your logic)
        images.value[1] = {
          src: `${process.env.BASE_URL}banner/Ethnicraft_Banner_HERO.jpg`,
          alt: 'Image 2',
        };
  
        images.value[2] = {
          src: `${process.env.BASE_URL}banner/Villa-banner-test.webp`,
          alt: 'Image 3',
        };

        images.value[3] = {
          src: `${process.env.BASE_URL}banner/Villa-banner.webp`,
          alt: 'Image 4',
        };

        images.value[4] = {
          src: `${process.env.BASE_URL}banner/banner5.jpg`,
          alt: 'Image 5',
        };
      };
  
      let timer = ref(null);
  
      onMounted(() => {
        // Initialize second and third images dynamically
        loadDynamicImages();
  
        // Start interval timer for automatic sliding
        timer.value = setInterval(changeSlide, interval);
      });
  
      return {
        currentIndex,
        images,
        dots,
        changeSlide,
      };
    },
  };
  </script>
  
  <style scoped>
  .slider {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding-top: 30%;
    height: 100%;
  }
  
  .slider-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; 
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  .slider-image:first-child {
    opacity: 1;
  }
  
  .navigation-button {
    position: absolute;
    bottom: 20px; /* Adjust position as needed */
    left: 50%;
    transform: translateX(-50%);
    display: flex;
  }
  
  .dot {
    width: 10px;
    height: 10px;
    background-color: #bbb;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
  }
  
  .dot.active {
    background-color: #333;
  }
  </style>
  