<template>
  <div class="department-list">
    <!-- Department Table -->
    <table class="department-table">
      <thead>
        <tr>
          <th>Department Name</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="department in departments" :key="department.id">
          <td>{{ department.name }}</td>
          <td>
            <!-- Button to show details dialog -->
            <button @click="showDepartmentDetails(department)">View Details</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Department Dialog Component -->
    <DepartmentDialog
      v-if="selectedDepartment"
      :show="dialogVisible"
      :department="selectedDepartment"
      @close="dialogVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import DepartmentDialog from '~/departments/components/DepartmentDialog.vue'
const { $axios } = useNuxtApp()

// Props for departments passed from parent
const props = defineProps({
  departments: {
    type: Array,
    required: true
  }
})

// Internal state for managing selected department and dialog visibility
const dialogVisible = ref(false)
const selectedDepartment = ref(null)

// Watch the departments passed as props to ensure they are correctly received
watch(() => props.departments, (newDepartments) => {
  console.log('Departments passed to DepartmentList:', newDepartments) // Debug: Log departments passed to the list
})

// Show the department details in the dialog
const showDepartmentDetails = (department) => {
  selectedDepartment.value = department
  dialogVisible.value = true
}
</script>

<style scoped>
/* Table styling */
.department-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.department-table th, .department-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.department-table th {
  background-color: #f2f2f2;
}

.department-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.department-table tr:hover {
  background-color: #f1f1f1;
}

/* Responsive styling */
@media screen and (max-width: 768px) {
  .department-table th, .department-table td {
    padding: 10px 5px;
  }
}
</style>
