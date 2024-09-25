<template>
  <div>
    <p><strong>Name:</strong> {{ employee.name }}</p>
    <p><strong>Position:</strong> {{ employee.position }}</p>
    <p><strong>Date of Joining:</strong> {{ employee.dateOfJoining }}</p>
  </div>
</template>

<script setup>
defineProps({
  employee: {
    type: Object,
    required: true
  }
})
</script>
