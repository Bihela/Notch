<template>
  <div>
    <h1>Department Details</h1>
    <DepartmentDetails v-if="department" :department="department" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DepartmentDetails from '~/departments/components/DepartmentDetails.vue'

const { $axios } = useNuxtApp()
const route = useRoute()
const department = ref(null)

onMounted(async () => {
  try {
    const response = await $axios.get(`/api/Department/${route.params.id}`)
    department.value = response.data
  } catch (error) {
    console.error('Failed to fetch department details:', error)
  }
})
</script>
