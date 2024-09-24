<template>
  <div>
    <h1>Add New Employee</h1>
    <button class="add-employee-btn" @click="navigateToForm">Add New Employee</button>
    <EmployeeForm />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import EmployeeForm from '~/employees/components/EmployeeForm.vue'

const router = useRouter()

const navigateToForm = () => {
  // Logic to navigate to the employee form
  // For example, you can redirect to a different route if needed
  // router.push('/path-to-employee-form')
}
</script>

<style scoped>
.add-employee-btn {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}

.add-employee-btn:hover {
  background-color: #218838;
}
</style>
