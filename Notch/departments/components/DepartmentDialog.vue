<!-- components/DepartmentDialog.vue -->
<template>
  <div class="dialog-overlay" v-if="show">
    <div class="dialog">
      <button @click="closeDialog" class="close-button">X</button>
      <h2>Department Details</h2>
      
      <!-- Department Information -->
      <div v-if="department">
        <p><strong>ID:</strong> {{ department.id }}</p>
        <p><strong>Name:</strong> {{ department.name }}</p>
      </div>
      
      <!-- Display list of employees in the department -->
      <div v-if="employees && employees.length">
        <h3>Employees</h3>
        <ul>
          <li v-for="employee in employees" :key="employee.id">
            {{ employee.name }} - {{ employee.position }}
            <!-- Button to show employee details dialog -->
            <button @click="showEmployeeDialog(employee)">View Details</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Loading employee details or no employees found...</p>
      </div>

      <!-- Include Employee Dialog Component -->
      <EmployeeDialog :show="showEmployee" :employee="selectedEmployee" @close="closeEmployeeDialog" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'
import EmployeeDialog from '~/employees/components/EmployeeDialog.vue'

// Props for department and visibility
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  department: {
    type: Object,
    default: () => null
  }
})

// Emit close event for closing dialog
const emits = defineEmits(['close'])

// Use Nuxt's app instance to access $axios
const { $axios } = useNuxtApp()

// States to manage employees and employee details dialog
const employees = ref([])
const selectedEmployee = ref(null)
const showEmployee = ref(false)

// Watch for department prop changes and fetch employees accordingly
watch(() => props.department, async (newDepartment) => {
  if (newDepartment) {
    try {
      // Fetch employees when department changes
      const response = await $axios.get(`api/Department/${newDepartment.id}`)
      employees.value = response.data.employees
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }
}, { immediate: true }) // Ensure the API call is made initially as well

// Method to open employee dialog
const showEmployeeDialog = (employee) => {
  selectedEmployee.value = employee
  showEmployee.value = true
}

// Method to close employee dialog
const closeEmployeeDialog = () => {
  showEmployee.value = false
}

// Method to close department dialog
const closeDialog = () => {
  emits('close')
}
</script>


<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
</style>
