<template>
    <div class="modal">
      <div class="modal-content">
        <h3>Something went wrong, please try again later.</h3>
        <button @click="$emit('close')">Close</button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  
  button {
    margin-top: 20px;
  }
  </style>
  