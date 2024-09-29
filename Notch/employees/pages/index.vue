<template>
  <div>
    <h1>Employee List</h1>
    <!-- Add New Employee Button -->
    <button @click="showDialog = true" class="add-button">Add New Employee</button>

    <!-- Display Employee List -->
    <EmployeeList :employees="employees" @show-details="showEmployeeDetails" />

    <!-- Employee Dialog for adding new employee -->
    <Dialog v-if="showDialog" @close="showDialog = false">
      <template #header>
        <h3>Add New Employee</h3>
      </template>
      <template #body>
        <EmployeeForm :onSubmit="fetchEmployees" />
      </template>
      <template #footer>
        <button @click="showDialog = false">Close</button>
      </template>
    </Dialog>

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
import EmployeeForm from '~/employees/components/EmployeeForm.vue' // Ensure this import is present
import Dialog from '~/employees/components/Dialog.vue' // Check if this path is correct

const { $axios } = useNuxtApp()

const employees = ref([]) // Store the list of employees
const dialogVisible = ref(false) // State to control employee detail dialog visibility
const selectedEmployee = ref(null) // Currently selected employee
const showDialog = ref(false) // State to control add employee dialog visibility

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
