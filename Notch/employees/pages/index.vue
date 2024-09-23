<template>
  <div>
    <h1>Employee List</h1>
    <!-- Add New Employee Button -->
    <NuxtLink to="/employees/add" class="add-button">Add New Employee</NuxtLink>

    <!-- Display Employee List -->
    <EmployeeList :employees="employees" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EmployeeList from '~/employees/components/EmployeeList.vue'
const { $axios } = useNuxtApp()

const employees = ref([])

const fetchEmployees = async () => {
  try {
    const response = await $axios.get('/api/Employee')
    employees.value = response.data
  } catch (error) {
    console.error('Failed to fetch employees:', error)
  }
}

onMounted(() => {
  fetchEmployees()
})
</script>

<style scoped>
.add-button {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.add-button:hover {
  background-color: #218838;
}
</style>
