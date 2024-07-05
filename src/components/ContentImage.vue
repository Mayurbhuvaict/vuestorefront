<template>
  <div class="classic-layout-section">
    <div class="container">
      <div class="classic-layout">
        <!-- Left side: Large square photo -->
        <div
          class="left-side"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <img
            src="/banner/Villa_cms-image.webp"
            alt="Large Photo"
            class="large-photo"
          >
        </div>
  
        <!-- Right side: Content -->
        <div
          class="right-side"
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <h1 class="title">
            Title of the Content
          </h1>
          <p class="description">
            For more than 25 years, we have been passionately the expert for high-quality and exclusive garden furniture. Since 2023, we have expanded our range to include indoor furniture and continue to focus on quality, comfort and stylish design. Our goal is to create your personal oasis of well-being outdoors and in your home with first-class lounge furniture, attractive dining sets, comfortable sun loungers, innovative outdoor kitchens, designer parasols and inspiring garden accessories.&nbsp;
          </p>
          <button class="action-button">
            Read More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: 'ClassicLayout',
  };
  </script>
  
  <style scoped>
  .classic-layout {
    display: flex;
    justify-content: space-between; /* Adjust spacing between left and right sides */
    align-items: center; /* Center align items vertically */
    padding: 40px 0;
  }
  
  .left-side {
    flex: 1; /* Take 50% of the container */
  }
  
  .large-photo {
    width: 100%; /* Ensure the photo fills its container */
    max-width: 100%; /* Ensure the photo doesn't exceed its original size */
    height: auto; /* Maintain aspect ratio */
    border-radius: 8px; /* Optional: Add border-radius for rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: Add box shadow for depth */
  }
  
  .right-side {
    flex: 1; /* Take 50% of the container */
    padding-left: 20px; /* Add padding to separate from the photo */
  }
  
  .title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .description {
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
  }
  
  .action-button {
    background-color: #0b2f80;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  