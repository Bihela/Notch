import type { NuxtPage } from '@nuxt/schema'

const employeeRoutes: NuxtPage[] = [
  {
    path: '/employees',
    name: 'Employees',
    file: '@/employees/pages/index.vue',
  },
  {
    path: '/employees/add',
    name: 'AddEmployee',
    file: '@/employees/pages/add.vue',
  }
  // Removed EmployeeDetails route as it is no longer needed
]

export default employeeRoutes
