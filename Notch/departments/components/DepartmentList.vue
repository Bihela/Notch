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
            <NuxtLink :to="`/departments/${department.id}`">View Details</NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const { $axios } = useNuxtApp()

const departments = ref([])

onMounted(async () => {
  try {
    const response = await $axios.get('/api/Department')
    departments.value = response.data.map(department => ({
      id: department.departmentId,
      name: department.departmentName
    }))
  } catch (error) {
    console.error('Failed to fetch departments:', error)
  }
})
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
