<template>
  <div class="department-container">
    <h1>Department List</h1>

    <!-- Department Search Component -->
    <DepartmentSearch @update-search="setSearchQuery" />

    <!-- Add New Department Button -->
    <button @click="showDialog = true" class="add-button">Add New Department</button>

    <!-- Department List Component -->
    <DepartmentList :departments="filteredDepartments" />

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
import { ref, computed, onMounted, watch } from 'vue'
import DepartmentList from '~/departments/components/DepartmentList.vue'
import DepartmentForm from '~/departments/components/DepartmentForm.vue'
import DepartmentSearch from '~/departments/components/DepartmentSearch.vue'
import Dialog from '~/departments/components/Dialog.vue'

const { $axios } = useNuxtApp()

const departments = ref([]) // Store the list of departments
const showDialog = ref(false)
const searchQuery = ref('') // State for search query

// Fetch departments from the API
onMounted(async () => {
  try {
    const response = await $axios.get('/api/Department')
    departments.value = response.data.map(department => ({
      id: department.departmentId,
      name: department.departmentName
    }))
    console.log('Departments fetched:', departments.value) // Debug: Log fetched departments
  } catch (error) {
    console.error('Failed to fetch departments:', error)
  }
})

// Handle the addition of a new department
const handleAddDepartment = async (department) => {
  try {
    await $axios.post('/api/Department', department)
    showDialog.value = false
    // Optionally refresh the department list if necessary
  } catch (error) {
    console.error('Failed to add department:', error)
  }
}

// Update search query from the child component
const setSearchQuery = (query) => {
  searchQuery.value = query
  console.log('Search query received in parent:', searchQuery.value) // Debug: Log search query in parent
}

// Filter departments based on the search query
const filteredDepartments = computed(() => {
  const filtered = departments.value.filter(department =>
    department.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  console.log('Filtered departments:', filtered) // Debug: Log filtered departments
  return filtered
})

// Watch the search query to see if it's updating properly
watch(searchQuery, (newQuery) => {
  console.log('Search query updated:', newQuery) // Debug: Log when the search query changes
})
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
