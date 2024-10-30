<template>
  <div>
    <h1>Employee List</h1>

    <!-- Employee Search Component -->
    <EmployeeSearch @update-search="setSearchQuery" />

    <!-- Add New Employee Button -->
    <button @click="showDialog = true" class="add-button">Add New Employee</button>

    <!-- Display Employee List -->
    <EmployeeList
      :employees="filteredEmployees"
      @show-details="showEmployeeDetails"
    />

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
import { ref, computed, onMounted } from 'vue'
import EmployeeList from '~/employees/components/EmployeeList.vue'
import EmployeeSearch from '~/employees/components/EmployeeSearch.vue'
import EmployeeDialog from '~/employees/components/EmployeeDialog.vue'
import EmployeeForm from '~/employees/components/EmployeeForm.vue'
import Dialog from '~/employees/components/Dialog.vue'

const { $axios } = useNuxtApp()

const employees = ref([]) // Store the list of employees
const dialogVisible = ref(false)
const selectedEmployee = ref(null)
const showDialog = ref(false)
const searchQuery = ref('') // State for search query

// Fetch employees from the API
const fetchEmployees = async () => {
  try {
    const response = await $axios.get('/api/Employee')
    employees.value = response.data
  } catch (error) {
    console.error('Failed to fetch employees:', error)
  }
}

// Show employee details in the dialog
const showEmployeeDetails = (employee) => {
  selectedEmployee.value = employee
  dialogVisible.value = true
}

// Update search query from child component
const setSearchQuery = (query) => {
  searchQuery.value = query
}

// Filtered employees based on the search query
const filteredEmployees = computed(() => {
  const lowerCaseQuery = searchQuery.value.toLowerCase()
  return employees.value.filter(employee =>
    employee.name.toLowerCase().includes(lowerCaseQuery) ||
    employee.position.toLowerCase().includes(lowerCaseQuery) ||
    employee.departmentName.toLowerCase().includes(lowerCaseQuery)
  )
})

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
  border-radius: 5px;
}

.add-button:hover {
  background-color: #218838;
}
</style>
