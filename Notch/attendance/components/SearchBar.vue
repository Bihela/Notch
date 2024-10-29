<template>
    <div class="search-bar-container">
      <input
        v-model="query"
        @input="emitSearch"
        placeholder="Search by Employee ID or Name"
        class="search-bar"
        type="text"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, watch } from 'vue'
  
  const query = ref(''); // Local state for the search query
  const emit = defineEmits(['search']); // Event emitter for parent communication
  
  // Emit the search query to the parent whenever input changes
  const emitSearch = () => {
    console.log('Search query input:', query.value); // Debug: Log search input
    emit('search', query.value);
  }
  
  // Optionally, watch the query to ensure it's updating properly
  watch(query, (newQuery) => {
    console.log('Query changed:', newQuery); // Debug: Log when the query changes
  });
  </script>
  
  <style scoped>
  .search-bar-container {
    margin-bottom: 20px; /* Spacing below the search bar */
  }
  
  .search-bar {
    padding: 10px; /* Inner padding for the input */
    width: 100%; /* Full width */
    max-width: 400px; /* Maximum width */
    border-radius: 5px; /* Rounded corners */
    border: 1px solid #ccc; /* Light grey border */
    font-size: 16px; /* Font size */
  }
  </style>
  