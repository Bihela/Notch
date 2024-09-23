import type { NuxtPage } from '@nuxt/schema'

const departmentRoutes: NuxtPage[] = [
  {
    path: '/departments',
    name: 'Departments',
    file: '@/departments/pages/index.vue',
  },
  {
    path: '/departments/add',
    name: 'AddDepartment',
    file: '@/departments/pages/add.vue',
  },
  {
    path: '/departments/edit/:id',
    name: 'EditDepartment',
    file: '@/departments/pages/[id].vue',
  }
]

export default departmentRoutes
