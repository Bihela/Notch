import { defineNuxtConfig } from 'nuxt/config'
import path from 'node:path'
import glob from 'glob'

export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  components: true,
  compatibilityDate: "2024-09-22",

  hooks: {
    'pages:extend'(pages) {
      // Add departments routes
      const departmentRouteFiles = glob.sync('./departments/**/*.routes.ts')
      const departmentRoutes = departmentRouteFiles.map(routeFile => require(path.join(path.resolve(), routeFile)))
      pages.push(...departmentRoutes.flat(1))

      // Add employees routes
      const employeeRouteFiles = glob.sync('./employees/**/*.routes.ts')
      const employeeRoutes = employeeRouteFiles.map(routeFile => require(path.join(path.resolve(), routeFile)))
      pages.push(...employeeRoutes.flat(1))
    }
  }
})
