<template>
  <div class="attendance-list">
    <SearchBar @search="filterAttendance" />
    
    <!-- Date Picker to select a different date -->
    <div class="date-picker">
      <label for="date">Select Date:</label>
      <input type="date" v-model="selectedDate" @change="fetchAttendance" />
    </div>

    <table class="attendance-table">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="attendance in filteredAttendanceList" :key="attendance.employeeId">
          <td>{{ attendance.employeeId }}</td>
          <td>{{ attendance.name }}</td>
          <td>{{ attendance.department }}</td>
          <td>
            <div class="status-container">
              <select v-model="attendance.status" @change="updateAttendanceStatus(attendance)">
                <option value="Present">Present</option>
                <option value="Leave">Leave</option>
                <option value="Need to Attend">Need to Attend</option>
              </select>
              <span v-if="attendance.isLate" class="late-tag">Late</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import SearchBar from '../components/SearchBar.vue' // Adjust the path as necessary
const { $axios } = useNuxtApp()

const attendanceList = ref([])
const searchQuery = ref('')
const selectedDate = ref(new Date().toISOString().substr(0, 10))

const fetchAttendance = async () => {
  try {
    const response = await $axios.get(`/api/attendance/ByDate/${selectedDate.value}`)
    const attendanceData = response.data
    const employeeResponse = await $axios.get('/api/Employee')
    const employees = employeeResponse.data

    attendanceList.value = attendanceData.map(attendance => {
      const employee = employees.find(emp => emp.id === attendance.employeeId) || {}
      return {
        employeeId: attendance.employeeId,
        name: employee.name || 'Unknown',
        department: employee.departmentName || 'Unknown',
        status: attendance.status,
        isLate: attendance.isLate
      }
    })
  } catch (error) {
    console.error('Failed to fetch attendance:', error)
  }
}

const updateAttendanceStatus = async (attendance) => {
  try {
    await $axios.post('/api/attendance/SetStatus', {
      employeeId: attendance.employeeId,
      status: attendance.status,
    })
  } catch (error) {
    console.error('Failed to update attendance status:', error)
  }
}

const filteredAttendanceList = computed(() => {
  if (!searchQuery.value) {
    return attendanceList.value
  }
  const lowerCaseQuery = searchQuery.value.toLowerCase()
  return attendanceList.value.filter(attendance => 
    attendance.employeeId.toString().includes(lowerCaseQuery) ||
    attendance.name.toLowerCase().includes(lowerCaseQuery)
  )
})

const filterAttendance = (query) => {
  searchQuery.value = query
}

onMounted(() => {
  fetchAttendance()
})
</script>

<style scoped>
.attendance-table {
  width: 100%;
  border-collapse: collapse;
}

.attendance-table th,
.attendance-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.attendance-table th {
  background-color: #f2f2f2;
}

.attendance-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.attendance-table tr:hover {
  background-color: #f1f1f1;
}

.status-container {
  display: flex;
  align-items: center;
}

.late-tag {
  margin-left: 10px;
  padding: 3px 6px;
  background-color: red;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.date-picker {
  margin-bottom: 20px;
}

.date-picker input {
  padding: 5px;
  font-size: 16px;
}
</style>
