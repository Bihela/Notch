<template>
  <div>
    <h2>Department Details</h2>
    <div v-if="department">
      <p><strong>Name:</strong> {{ department.departmentName }}</p>
      <p><strong>Manager ID:</strong> {{ department.managerId }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  department: {
    type: Object,
    required: true
  }
})
</script>
