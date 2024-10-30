<template>
  <div class="leave-requests-container">
    <div class="header">
      <h1>Leave Requests</h1>
    </div>
    <button class="request-leave-btn" @click="openLeaveRequestDialog">Request Leave</button>

    <SearchBar @search="handleSearch" />

    <LeaveRequestDialog
      :isOpen="isDialogOpen"
      :onClose="closeLeaveRequestDialog"
      @leaveSubmitted="handleLeaveSubmitted"
    />
    <LeaveRequestsList
      :leaveRequests="filteredLeaveRequests"
      :activeFilter="activeFilter"
      @approve="approveLeave"
      @reject="rejectLeave"
      @filter="changeFilter"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import LeaveRequestDialog from '~/attendance/components/LeaveRequestDialog.vue'
import LeaveRequestsList from '~/leaverequests/components/LeaveRequestsList.vue'
import SearchBar from '~/leaverequests/components/SearchBar.vue'
const { $axios } = useNuxtApp()

const isDialogOpen = ref(false)
const leaveRequests = ref([])
const activeFilter = ref('Pending')
const searchQuery = ref('')

const openLeaveRequestDialog = () => {
  isDialogOpen.value = true
}

const closeLeaveRequestDialog = () => {
  isDialogOpen.value = false
}

const fetchLeaveRequests = async (filter = 'Pending') => {
  try {
    const endpointMap = {
      'Pending': '/api/leaverequest/PendingLeaveRequests',
      'Approved': '/api/leaverequest/ApprovedLeaveRequests',
      'Rejected': '/api/leaverequest/RejectedLeaveRequests'
    }
    const response = await $axios.get(endpointMap[filter])
    leaveRequests.value = response.data
    activeFilter.value = filter
  } catch (error) {
    console.error('Failed to fetch leave requests:', error)
  }
}

const handleSearch = (query) => {
  searchQuery.value = query
}

// Filter leave requests based on search query and active filter
const filteredLeaveRequests = computed(() => {
  return leaveRequests.value.filter(request =>
    (request.employeeId.toString().includes(searchQuery.value) ||
      request.employeeName.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
})

onMounted(() => {
  fetchLeaveRequests()
})

const handleLeaveSubmitted = () => {
  fetchLeaveRequests(activeFilter.value)
  closeLeaveRequestDialog()
}

const changeFilter = (filter) => {
  fetchLeaveRequests(filter)
}
</script>


<style scoped>
.leave-requests-container {
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 1px;
}

.request-leave-btn {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  align-self: flex-start;
}
</style>
