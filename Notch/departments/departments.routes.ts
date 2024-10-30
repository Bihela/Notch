import type { NuxtPage } from '@nuxt/schema'

const departmentRoutes: NuxtPage[] = [
  {
    path: '/departments',
    name: 'Departments',
    file: '@/departments/pages/index.vue',
  },
  {
    path: '/departments/:id',
    name: 'EditDepartment',
    file: '@/departments/pages/[id].vue',
  }
]

export default departmentRoutes
