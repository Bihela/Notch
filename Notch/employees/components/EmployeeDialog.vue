<!-- components/EmployeeDialog.vue -->
<template>
  <div class="dialog-overlay" v-if="show" :key="employee?.id || 'default-key'">
    <div class="dialog">
      <!-- Close button to hide the dialog -->
      <button @click="closeDialog" class="close-button">X</button>
      <h2>Employee Details</h2>
      <!-- Display employee details if the employee object is available -->
      <div v-if="employee">
        <p><strong>Name:</strong> {{ employee.name }}</p>
        <p><strong>Position:</strong> {{ employee.position }}</p>
        <p><strong>Date of Joining:</strong> {{ employee.dateOfJoining }}</p>
      </div>
      <div v-else>
        <p>Loading employee details...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  employee: {
    type: Object,
    default: () => null
  }
})

const emits = defineEmits(['close'])

const closeDialog = () => {
  emits('close')
}

// Watch for changes in the employee prop to handle any updates
watch(() => props.employee, (newEmployee, oldEmployee) => {
  if (newEmployee !== oldEmployee) {
    // Here you can add any additional logic when the employee changes
    console.log('Employee data has changed:', newEmployee)
  }
})
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Ensure dialog appears above other elements */
}

.dialog {
  position: relative; /* Required for absolute positioning of close button */
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: #999;
  cursor: pointer;
  transition: color 0.3s;
}

.close-button:hover {
  color: #333;
}
</style>
