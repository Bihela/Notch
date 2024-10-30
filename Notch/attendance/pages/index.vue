<template>
  <div class="attendance-container">
    <h1>Attendance List</h1>
    <button @click="openLeaveRequestDialog">Request Leave</button>
    <AttendanceList />
    <LeaveRequestDialog
      :isOpen="isDialogOpen"
      :onClose="closeLeaveRequestDialog"
    />
  </div>
</template>

<script setup>
import AttendanceList from '~/attendance/components/AttendanceList.vue'
import LeaveRequestDialog from '~/attendance/components/LeaveRequestDialog.vue'
import { ref } from 'vue'

const isDialogOpen = ref(false)

const openLeaveRequestDialog = () => {
  isDialogOpen.value = true
}

const closeLeaveRequestDialog = () => {
  isDialogOpen.value = false
}
</script>

<style scoped>
.attendance-container {
  margin: 20px;
}

button {
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
