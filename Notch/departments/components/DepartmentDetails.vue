<template>
    <div>
      <h2>Department Details</h2>
      <div v-if="department">
        <p><strong>Name:</strong> {{ department.name }}</p>
        <p><strong>Description:</strong> {{ department.description }}</p>
        <NuxtLink to="/departments" class="back-button">Back to Departments</NuxtLink>
      </div>
      <div v-else>
        <p>Loading department details...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  const { $axios } = useNuxtApp()
  
  const route = useRoute()
  const department = ref(null)
  
  const fetchDepartment = async () => {
    try {
      const response = await $axios.get(`/api/Department/${route.params.id}`)
      department.value = response.data
    } catch (error) {
      console.error('Failed to fetch department details:', error)
    }
  }
  
  onMounted(() => {
    fetchDepartment()
  })
  </script>
  