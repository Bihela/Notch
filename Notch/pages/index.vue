<template>
    <div>
      <h1>Employee List</h1>
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
  