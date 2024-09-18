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
import EmployeeList from '~/components/EmployeeList.vue'
const { $axios } = useNuxtApp()

const employees = ref([])

onMounted(async () => {
  const response = await $axios.get('/employees')
  employees.value = response.data
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
