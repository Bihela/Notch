<template>
    <div class="search-bar-container">
      <input
        v-model="query"
        @input="emitSearch"
        placeholder="Search departments..."
        class="search-bar"
        type="text"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const query = ref('') // Local state for the search query
  const emit = defineEmits(['update-search']) // Event emitter for parent communication
  
  // Emit the search query to the parent whenever input changes
  const emitSearch = () => {
    console.log('Search query input:', query.value) // Debug: Log search input
    emit('update-search', query.value)
  }
  
  // Optionally, watch the query to ensure it's updating properly
  watch(query, (newQuery) => {
    console.log('Query changed:', newQuery) // Debug: Log when the query changes
  })
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
  