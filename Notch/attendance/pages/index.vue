<template>
    <div class="attendance-container">
      <h1>Attendance List</h1>
      <AttendanceList />
    </div>
  </template>
  
  <script setup>
  import AttendanceList from '~/attendance/components/AttendanceList.vue'
  </script>
  
  <style scoped>
  .attendance-container {
    margin: 20px;
  }
  </style>
  