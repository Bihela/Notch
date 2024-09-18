<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="id">ID:</label>
      <input v-model="employee.id" type="number" id="id" />
    </div>
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
import { ref } from 'vue'
const { $axios } = useNuxtApp()

const employee = ref({
  id: null,
  name: '',
  position: '',
  departmentID: null,
  dateOfJoining: '',
  emailAddress: '',
  phoneNumber: ''
})

const submitForm = async () => {
  try {
    // Debug: Log the employee object before sending it to the API
    console.log('Submitting employee data:', JSON.stringify(employee.value, null, 2))

    const url = '/api/employee'

    console.log(`Request URL: ${url}`)

    // Use POST for both create and update
    console.log('Submitting data...')
    const response = await $axios.post(url, employee.value)
    console.log('Response:', response.data)

    // Optionally, redirect to employee list or clear form after submission
    console.log('Submission successful. Redirecting or clearing form...')
  } catch (error) {
    // Debug: Log any error that occurs during API call
    console.error('Failed to submit employee:', error)

    if (error.response) {
      console.error('Response data:', error.response.data)
      console.error('Response status:', error.response.status)
      console.error('Response headers:', error.response.headers)
    } else if (error.request) {
      console.error('Request data:', error.request)
    } else {
      console.error('Error message:', error.message)
    }
  }
}
</script>
