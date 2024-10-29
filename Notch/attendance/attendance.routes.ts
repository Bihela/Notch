import type { NuxtPage } from '@nuxt/schema'

const attendanceRoutes: NuxtPage[] = [
  {
    path: '/attendance',
    name: 'Attendances',
    file: '@/attendance/pages/index.vue',
  },
]

export default attendanceRoutes
