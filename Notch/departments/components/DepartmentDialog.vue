<!-- components/DepartmentDialog.vue -->
<template>
    <div class="dialog-overlay" v-if="show">
      <div class="dialog">
        <button @click="closeDialog" class="close-button">X</button>
        <h2>Department Details</h2>
        <div v-if="department">
          <p><strong>ID:</strong> {{ department.id }}</p>
          <p><strong>Name:</strong> {{ department.name }}</p>
          <!-- If the property is 'departmentName' in API response, use department.departmentName instead -->
          <!-- <p><strong>Name:</strong> {{ department.departmentName }}</p> -->
        </div>
        <div v-else>
          <p>Loading department details...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    department: {
      type: Object,
      default: () => null
    }
  })
  
  const emits = defineEmits(['close'])
  
  const closeDialog = () => {
    emits('close')
  }
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
  }
  
  .dialog {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  