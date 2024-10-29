<template>
  <div class="leave-requests-container">
    <div class="header">
      <h1>Leave Requests</h1>
    </div>
    <button class="request-leave-btn" @click="openLeaveRequestDialog">Request Leave</button>
    
    <LeaveRequestDialog
      :isOpen="isDialogOpen"
      :onClose="closeLeaveRequestDialog"
      @leaveSubmitted="handleLeaveSubmitted"
    />
    <LeaveRequestsList 
      :leaveRequests="leaveRequests"
      :activeFilter="activeFilter"
      @approve="approveLeave"
      @reject="rejectLeave"
      @filter="changeFilter"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LeaveRequestDialog from '~/attendance/components/LeaveRequestDialog.vue'
import LeaveRequestsList from '~/leaverequests/components/LeaveRequestsList.vue'
const { $axios } = useNuxtApp()

const isDialogOpen = ref(false)
const leaveRequests = ref([])
const activeFilter = ref('Pending')

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

// Approve leave request
const approveLeave = async (id) => {
  try {
    await $axios.post(`/api/LeaveRequest/ApproveLeave/${id}`)
    alert('Leave request approved successfully!')
    fetchLeaveRequests(activeFilter.value) // Refresh the list after approving
  } catch (error) {
    console.error('Error approving leave request:', error)
    alert('Failed to approve leave request. Please try again.')
  }
}

// Reject leave request
const rejectLeave = async (id) => {
  try {
    await $axios.post(`/api/LeaveRequest/RejectLeave/${id}`)
    alert('Leave request rejected successfully!')
    fetchLeaveRequests(activeFilter.value) // Refresh the list after rejecting
  } catch (error) {
    console.error('Error rejecting leave request:', error)
    alert('Failed to reject leave request. Please try again.')
  }
}

// Fetch leave requests on component mount
onMounted(() => {
  fetchLeaveRequests()
})

// Handle event when a leave is successfully submitted
const handleLeaveSubmitted = () => {
  fetchLeaveRequests(activeFilter.value) // Refresh the leave requests list
  closeLeaveRequestDialog() // Close the dialog
}

// Handle filter change
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
