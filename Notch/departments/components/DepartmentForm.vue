<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="departmentName">Department Name:</label>
      <input v-model="department.departmentName" type="text" id="departmentName" required />
    </div>
    <div>
      <label for="managerId">Manager ID:</label>
      <input v-model="department.managerId" type="number" id="managerId" required />
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const { $axios } = useNuxtApp()
const router = useRouter()

const department = ref({
  departmentName: '',
  managerId: null
})

const submitForm = async () => {
  try {
    await $axios.post('/api/Department', department.value)
    router.push('/departments')
  } catch (error) {
    console.error('Failed to submit department:', error)
  }
}
</script>
