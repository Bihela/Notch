<template>
  <div>
    <h1>Employee Details</h1>
    <EmployeeDetail v-if="employee" :employee="employee" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import EmployeeDetail from '~/employees/components/EmployeeDetails.vue'
const { $axios } = useNuxtApp()
const employee = ref(null)
const route = useRoute()

onMounted(async () => {
  try {
    const response = await $axios.get(`/api/Employee/${route.params.id}`)
    employee.value = response.data
    
  } catch (error) {
    console.error('Failed to fetch employee details:', error)
  }
})
</script>
