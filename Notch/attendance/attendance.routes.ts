import type { NuxtPage } from '@nuxt/schema'

const attendanceRoutes: NuxtPage[] = [
  {
    path: '/attendance',
    name: 'AttendanceList',
    file: '@/attendance/pages/index.vue',
  },
]

export default attendanceRoutes
