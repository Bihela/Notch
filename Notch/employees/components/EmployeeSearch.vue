<template>
    <div class="search-bar-container">
      <input
        v-model="query"
        @input="emitSearch"
        placeholder="Search employees..."
        class="search-bar"
        type="text"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const query = ref('') // Local state for the search query
  const emit = defineEmits(['update-search']) // Event emitter for parent communication
  
  // Emit the search query to the parent whenever input changes
  const emitSearch = () => {
    emit('update-search', query.value)
  }
  </script>
  
  <style scoped>
  .search-bar {
    margin-bottom: 20px;
    padding: 10px;
    width: 100%;
    max-width: 400px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
  }
  </style>
  