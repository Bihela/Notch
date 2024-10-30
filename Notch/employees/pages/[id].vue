<template>
  <div>
    <h1>Employee Details</h1>
    <!-- Automatically show the dialog on this page -->
    <EmployeeDialog 
      :show="true" 
      :employee="employee" 
      @close="() => router.push('/employees')" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EmployeeDialog from '~/employees/components/EmployeeDialog.vue'

const { $axios } = useNuxtApp()
const employee = ref(null)
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  try {
    const response = await $axios.get(`/api/Employee/${route.params.id}`)
    employee.value = response.data
  } catch (error) {
    console.error('Failed to fetch employee details:', error)
  }
})
</script>
