<template>
  <ul>
    <li v-for="employee in employees" :key="employee.id">
      <NuxtLink :to="`/employees/${employee.id}`">{{ employee.name }} - {{ employee.position }}</NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const { $axios } = useNuxtApp()

const employees = ref([])

onMounted(async () => {
  try {
    const response = await $axios.get('/employees')
    employees.value = response.data
  } catch (error) {
    console.error('Failed to fetch employees:', error)
  }
})
</script>
