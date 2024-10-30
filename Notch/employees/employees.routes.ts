import type { NuxtPage } from '@nuxt/schema'

const employeeRoutes: NuxtPage[] = [
  {
    path: '/employees',
    name: 'Employees',
    file: '@/employees/pages/index.vue',
  },
  {
    path: '/employees/:id',
    name: 'EditEmployee',
    file: '@/employees/pages/[id].vue',
  }
]

export default employeeRoutes
