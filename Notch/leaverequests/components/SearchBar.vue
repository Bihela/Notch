<template>
    <div class="search-bar">
      <input
        type="text"
        v-model="query"
        @input="emitSearch"
        placeholder="Search by Employee ID or Name"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const query = ref('')
  const emit = defineEmits(['search'])
  
  const emitSearch = () => {
    emit('search', query.value)
  }
  </script>
  
  <style scoped>
  .search-bar input {
    padding: 10px; 
    width: 100%; 
    max-width: 400px; 
    border-radius: 5px; 
    border: 1px solid #ccc; 
    font-size: 16px; 
    margin-bottom: 10px;
  }
  </style>
  