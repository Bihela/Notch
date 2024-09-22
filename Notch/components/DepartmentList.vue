<template>
  <ul>
    <li v-for="department in departments" :key="department.id">
      <NuxtLink :to="`/departments/${department.id}`">{{ department.name }}</NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const { $axios } = useNuxtApp()

// Define the departments ref
const departments = ref([])

// Fetch departments from the API
const fetchDepartments = async () => {
  try {
    const response = await $axios.get('/api/Department')
    
    // Log the response data to inspect it
    console.log('API Response:', response.data)
    
    // Extract department names based on the correct key
    departments.value = response.data.map(department => ({
      id: department.departmentId,
      name: department.departmentName
    }))
  } catch (error) {
    console.error('Failed to fetch departments:', error)
  }
}

// Call the fetch function on component mount
onMounted(() => {
  fetchDepartments()
})
</script>
