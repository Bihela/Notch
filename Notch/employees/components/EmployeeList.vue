<template>
  <div class="employee-list">
    <table class="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.departmentName }}</td>
          <td>
            <NuxtLink :to="`/employees/${employee.id}`">View Details</NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  employees: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.employee-list {
  max-width: 100%;
  margin: 20px auto;
  padding: 0 20px;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.employee-table th, .employee-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.employee-table th {
  background-color: #f2f2f2;
}

.employee-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.employee-table tr:hover {
  background-color: #f1f1f1;
}

@media screen and (max-width: 768px) {
  .employee-table th, .employee-table td {
    padding: 10px 5px;
  }
}
</style>
