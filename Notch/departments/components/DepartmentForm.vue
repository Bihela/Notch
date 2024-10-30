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
import { ref, defineProps } from 'vue'

const props = defineProps({
  onSubmit: {
    type: Function,
    required: true
  }
})

const department = ref({
  departmentName: '',
  managerId: null
})

const submitForm = async () => {
  try {
    await props.onSubmit(department.value)
    department.value = { departmentName: '', managerId: null } // Reset form after successful submission
  } catch (error) {
    console.error('Failed to submit department:', error)
  }
}
</script>
