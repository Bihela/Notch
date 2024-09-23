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
import { useRouter } from 'vue-router'
const { $axios } = useNuxtApp()
const router = useRouter()

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
    const url = '/api/employee'

    // Submitting the employee data to the API
    const response = await $axios.post(url, employee.value)
    
    // After successful submission, redirect to the employee list page
    router.push('/employees')
  } catch (error) {
    console.error('Failed to submit employee:', error)
  }
}
</script>
