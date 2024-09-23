<template>
  <div>
    <h1>Add New Employee</h1>
    <EmployeeForm />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import EmployeeForm from '~/employees/components/EmployeeForm.vue'
const router = useRouter()
</script>
