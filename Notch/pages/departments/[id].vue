<template>
    <div>
      <h1>Department Details</h1>
      <DepartmentDetails :id="route.params.id" />
    </div>
  </template>
  
  <script setup>
  import DepartmentDetails from '@/components/DepartmentDetails.vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  </script>
  