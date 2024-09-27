<template>
  <div>
    <h1>Department Details</h1>
    <!-- Show the department details in a dialog -->
    <DepartmentDialog 
      :show="true" 
      :department="department" 
      @close="() => router.push('/departments')" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DepartmentDialog from '~/departments/components/DepartmentDialog.vue'

const { $axios } = useNuxtApp()
const department = ref(null)
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  try {
    const response = await $axios.get(`/api/Department/${route.params.id}`)
    department.value = response.data
  } catch (error) {
    console.error('Failed to fetch department details:', error)
  }
})
</script>
