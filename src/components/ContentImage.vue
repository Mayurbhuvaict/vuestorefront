<template>
    <div class="classic-layout">
      <!-- Left side: Large square photo -->
      <div class="left-side">
        <img src="/banner/leftimage.jpg" alt="Large Photo" class="large-photo" />
      </div>
  
      <!-- Right side: Content -->
      <div class="right-side">
        <h2 class="title">Title of the Content</h2>
        <p class="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
        <button class="action-button">Read More</button>
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
    padding: 20px; /* Add padding around the layout */
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
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  