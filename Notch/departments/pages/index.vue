<template>
  <div class="department-container">
    <h1>Department List</h1>
    <!-- Add New Department Button -->
    <button @click="showDialog = true" class="add-button">Add New Department</button>

    <!-- Department List Component -->
    <DepartmentList />

    <!-- Add Department Dialog -->
    <Dialog v-if="showDialog" @close="showDialog = false">
      <template #header>
        <h3>Add New Department</h3>
      </template>
      <template #body>
        <DepartmentForm :onSubmit="handleAddDepartment" />
      </template>
      <template #footer>
        <button @click="showDialog = false">Close</button>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DepartmentList from '~/departments/components/DepartmentList.vue'
import DepartmentForm from '~/departments/components/DepartmentForm.vue'
import Dialog from '~/departments/components/Dialog.vue' // Import the Dialog component

const showDialog = ref(false)

const handleAddDepartment = async (department) => {
  try {
    const { $axios } = useNuxtApp()
    await $axios.post('/api/Department', department)
    showDialog.value = false
    // Optionally refresh the department list if necessary
  } catch (error) {
    console.error('Failed to add department:', error)
  }
}
</script>

<style scoped>
.department-container {
  margin: 20px;
}

.add-button {
  display: inline-block;
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  text-decoration: none;
}

.add-button:hover {
  background-color: #218838;
}
</style>
