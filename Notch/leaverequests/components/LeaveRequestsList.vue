<template>
  <div class="leave-requests-list">
    <div class="filter-buttons">
      <button @click="$emit('filter', 'Pending')" :class="{ active: activeFilter === 'Pending' }">Pending</button>
      <button @click="$emit('filter', 'Approved')" :class="{ active: activeFilter === 'Approved' }">Approved</button>
      <button @click="$emit('filter', 'Rejected')" :class="{ active: activeFilter === 'Rejected' }">Rejected</button>
    </div>
    <table class="leave-requests-table">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Leave Type</th>
          <th>Status</th>
          <th v-if="activeFilter === 'Pending'">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in leaveRequests" :key="request.id">
          <td>{{ request.employeeId }}</td>
          <td>{{ request.employeeName }}</td>
          <td>{{ request.leaveType }}</td>
          <td>{{ request.status }}</td>
          <td v-if="activeFilter === 'Pending'">
            <button 
              v-if="request.status === 'Pending'" 
              @click="$emit('approve', request.id)" 
              class="approve-btn">
              Approve
            </button>
            <button 
              v-if="request.status === 'Pending'" 
              @click="$emit('reject', request.id)" 
              class="reject-btn">
              Reject
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  leaveRequests: Array,
  activeFilter: String
})
</script>

<style scoped>
.leave-requests-list {
  width: 100%;
}

.leave-requests-list .filter-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.leave-requests-list .filter-buttons button {
  padding: 8px 15px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.leave-requests-list .filter-buttons button.active {
  background-color: #4CAF50;
  color: white;
}

.leave-requests-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.leave-requests-table th,
.leave-requests-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
}

.leave-requests-table th {
  background-color: #f2f2f2;
}

.leave-requests-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.leave-requests-table tr:hover {
  background-color: #f1f1f1;
}

.approve-btn, .reject-btn {
  padding: 6px 10px;
  margin-right: 5px;
  border: none;
  cursor: pointer;
}

.approve-btn {
  background-color: #4CAF50;
  color: white;
}

.reject-btn {
  background-color: #f44336;
  color: white;
}
</style>
