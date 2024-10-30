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
    <div>
      <label for="departmentID">Department ID:</label>
      <input v-model="employee.departmentID" type="number" id="departmentID" required />
    </div>
    <div>
      <label for="dateOfJoining">Date of Joining:</label>
      <input v-model="employee.dateOfJoining" type="date" id="dateOfJoining" required />
    </div>
    <div>
      <label for="emailAddress">Email Address:</label>
      <input v-model="employee.emailAddress" type="email" id="emailAddress" />
    </div>
    <div>
      <label for="phoneNumber">Phone Number:</label>
      <input v-model="employee.phoneNumber" type="text" id="phoneNumber" />
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

const employee = ref({
  name: '',
  position: '',
  departmentID: null,
  dateOfJoining: '',
  emailAddress: '',
  phoneNumber: ''
})

const submitForm = async () => {
  try {
    const { $axios } = useNuxtApp()
    await $axios.post('/api/employee', employee.value)
    props.onSubmit() // Call the parent method to handle post-submission logic
    employee.value = { name: '', position: '', departmentID: null, dateOfJoining: '', emailAddress: '', phoneNumber: '' } // Reset form
  } catch (error) {
    console.error('Failed to submit employee:', error)
  }
}
</script>
