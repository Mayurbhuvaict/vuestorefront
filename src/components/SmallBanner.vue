<template>
    <div class="small-banners">
      <div class="banner">
        <img src="/banner/smallbanner.jpg" alt="Banner 1" class="banner-image" />
      </div>
      <div class="banner">
        <img src="/banner/smallbanner.jpg" alt="Banner 2" class="banner-image" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SmallBanners',
  };
  </script>
  
  <style scoped>
  .small-banners {
    display: flex;
    justify-content: space-between; /* Adjust spacing between banners */
    margin-top: 20px; /* Adjust margin as needed */
  }
  
  .banner {
    width: 48%; /* Adjust width to fit your layout */
  }
  
  .banner-image {
    width: 100%;
    height: auto;
    border-radius: 8px; /* Optional: Add border-radius for rounded corners */
  }
  </style>
  