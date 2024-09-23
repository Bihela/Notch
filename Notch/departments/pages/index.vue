<template>
    <div>
      <h1>Department List</h1>
      <NuxtLink to="/departments/add" class="add-button">Add New Department</NuxtLink>
      <DepartmentList />
    </div>
  </template>
  
  <script setup>
  import DepartmentList from '~/departments/components/DepartmentList.vue'
  </script>
  