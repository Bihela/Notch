<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Name:</label>
      <input v-model="employee.name" type="text" id="name" required />
    </div>
    <div>
      <label for="position">Position:</label>
      <input v-model="employee.position" type="text" id="position" required />
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const { $axios } = useNuxtApp()

const employee = ref({
  name: '',
  position: '',
})

const submitForm = async () => {
  try {
    await $axios.post('/employees', employee.value)
    // Optionally, redirect to employee list after submission
  } catch (error) {
    console.error('Failed to submit employee:', error)
  }
}
</script>
