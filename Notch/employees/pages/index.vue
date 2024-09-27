<template>
  <div>
    <h1>Employee List</h1>
    <!-- Add New Employee Button -->
    <NuxtLink to="/employees/add" class="add-button">Add New Employee</NuxtLink>

    <!-- Display Employee List and listen for show-details event -->
    <EmployeeList :employees="employees" @show-details="showEmployeeDetails" />

    <!-- Employee Dialog for displaying details -->
    <EmployeeDialog
      v-if="selectedEmployee"
      :show="dialogVisible"
      :employee="selectedEmployee"
      @close="dialogVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EmployeeList from '~/employees/components/EmployeeList.vue'
import EmployeeDialog from '~/employees/components/EmployeeDialog.vue'

const { $axios } = useNuxtApp()

const employees = ref([]) // Store the list of employees
const dialogVisible = ref(false) // State to control dialog visibility
const selectedEmployee = ref(null) // Currently selected employee

// Fetch employees from the API
const fetchEmployees = async () => {
  try {
    const response = await $axios.get('/api/Employee')
    employees.value = response.data
  } catch (error) {
    console.error('Failed to fetch employees:', error)
  }
}

// Show the employee details in the dialog
const showEmployeeDetails = (employee) => {
  selectedEmployee.value = employee
  dialogVisible.value = true
}

onMounted(() => {
  fetchEmployees()
})
</script>

<style scoped>
.add-button {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.add-button:hover {
  background-color: #218838;
}
</style>
