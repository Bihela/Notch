<template>
    <div class="dialog-overlay" v-if="isOpen">
      <div class="dialog">
        <h2>Request Leave</h2>
        <form @submit.prevent="submitLeaveRequest">
          <label for="employee">Select Employee:</label>
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Search for an employee"
            @input="filterEmployees"
          />
          <ul v-if="filteredEmployees.length">
            <li
              v-for="employee in filteredEmployees"
              :key="employee.id"
              @click="selectEmployee(employee)"
            >
              {{ employee.name }}
            </li>
          </ul>
          
          <label for="startDate">Start Date:</label>
          <input type="date" v-model="leaveRequest.startDate" required />
  
          <label for="endDate">End Date:</label>
          <input type="date" v-model="leaveRequest.endDate" required />
  
          <label for="reason">Reason:</label>
          <textarea v-model="leaveRequest.reason" required></textarea>
  
          <label for="leaveType">Leave Type:</label>
          <select v-model="leaveRequest.leaveType" required>
            <option value="Sick">Sick</option>
            <option value="Vacation">Vacation</option>
            <option value="Personal">Personal</option>
            <option value="Maternity">Maternity</option>
            <option value="Paternity">Paternity</option>
          </select>
  
          <button type="submit">Submit Leave Request</button>
          <button type="button" @click="closeDialog">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
 <!-- LeaveRequestDialog.vue -->
<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import { useNuxtApp } from '#app'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['leaveSubmitted'])

const leaveRequest = ref({
  startDate: '',
  endDate: '',
  reason: '',
  leaveType: 'Sick',
  employeeId: null,
})

const searchTerm = ref('')
const employees = ref([])
const filteredEmployees = ref([])

const { $axios } = useNuxtApp()

const fetchEmployees = async () => {
  try {
    const response = await $axios.get('/api/Employee')
    employees.value = response.data
    filteredEmployees.value = response.data
  } catch (error) {
    console.error('Failed to fetch employees:', error)
  }
}

const filterEmployees = () => {
  if (!searchTerm.value) {
    filteredEmployees.value = employees.value
  } else {
    filteredEmployees.value = employees.value.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }
}

const selectEmployee = (employee) => {
  leaveRequest.value.employeeId = employee.id
  searchTerm.value = employee.name
  filteredEmployees.value = []
}

const submitLeaveRequest = async () => {
  try {
    await $axios.post('/api/LeaveRequest/RequestLeave', leaveRequest.value)
    alert('Leave request submitted successfully!')
    emit('leaveSubmitted') // Emit event after successful submission
    closeDialog()
  } catch (error) {
    console.error('Failed to submit leave request:', error)
    alert('Failed to submit leave request. Please try again.')
  }
}

const closeDialog = () => {
  props.onClose()
}

onMounted(() => {
  fetchEmployees()
})
</script>

  
<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background: white;
  padding: 15px; /* Reduced padding */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 80%; /* Adjusted width */
  max-width: 400px; /* Set maximum width */
  max-height: 90vh; /* Ensure dialog doesn't cover entire height */
  overflow-y: auto; /* Enable scrolling if content exceeds height */
}

.dialog h2 {
  margin-bottom: 10px;
  font-size: 18px; /* Adjust font size */
}

.dialog label {
  display: block;
  margin: 8px 0 4px; /* Reduced margin */
}

.dialog input,
.dialog textarea,
.dialog select {
  width: 100%;
  padding: 6px; /* Reduced padding */
  margin-bottom: 8px; /* Reduced margin */
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dialog button {
  margin-right: 8px; /* Adjusted margin */
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  max-height: 120px; /* Adjusted height */
  overflow-y: auto;
}

li {
  padding: 8px; /* Reduced padding */
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
