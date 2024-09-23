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
  },
  {
    path: '/employees/edit/:id',
    name: 'EditEmployee',
    file: '@/employees/pages/[id].vue',
  }
]

export default employeeRoutes
