<template>
    <div class="dialog-overlay" @click.self="close">
      <div class="dialog-content">
        <header class="dialog-header">
          <slot name="header"></slot>
        </header>
        <div class="dialog-body">
          <slot name="body"></slot>
        </div>
        <footer class="dialog-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue'
  
  const emit = defineEmits(['close'])
  
  const close = () => {
    emit('close')
  }
  </script>
  
  <style scoped>
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dialog-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
  }
  
  .dialog-header,
  .dialog-footer {
    padding: 10px 0;
  }
  
  .dialog-body {
    padding: 10px 0;
  }
  </style>
  