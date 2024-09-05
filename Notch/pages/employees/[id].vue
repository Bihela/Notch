<template>
    <div>
      <h1>Employee Details</h1>
      <div v-if="employee">
        <p><strong>Name:</strong> {{ employee.name }}</p>
        <p><strong>Position:</strong> {{ employee.position }}</p>
        <p><strong>Date of Joining:</strong> {{ employee.dateOfJoining }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  const { $axios } = useNuxtApp()
  const employee = ref(null)
  const route = useRoute()
  
  onMounted(async () => {
    const response = await $axios.get(`/employees/${route.params.id}`)
    employee.value = response.data
  })
  </script>
  