<template>
  <div class="department-container">
    <h1>Department List</h1>
    <!-- Add New Department Button -->
    <NuxtLink to="/departments/add" class="add-button">Add New Department</NuxtLink>

    <!-- Department Table -->
    <DepartmentList />
  </div>
</template>

<script setup>
import DepartmentList from '~/departments/components/DepartmentList.vue'
</script>

<style scoped>
/* Container styling */
.department-container {
  margin: 20px; /* Add spacing around the container */
}

/* Button styling */
.add-button {
  display: inline-block; /* Make the button inline */
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-bottom: 20px; /* Add space below the button to separate it from the table */
  text-decoration: none; /* Remove underline from the link */
}

.add-button:hover {
  background-color: #218838;
}

/* Additional styles can go here */
</style>
