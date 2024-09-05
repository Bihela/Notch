<template>
  <div>
    <!-- Global Header or Navigation -->
    <header>
      <nav>
      <NuxtLink to="/">Home</NuxtLink> |
      <NuxtLink to="/employees">Employees</NuxtLink> |
      <NuxtLink to="/departments">Departments</NuxtLink> |
      <NuxtLink to="/attendance">Attendance</NuxtLink> |
      <NuxtLink to="/salaries">Salaries</NuxtLink> |
      <NuxtLink to="/job-performance">Job Performance</NuxtLink>
      </nav>
    </header>

    <!-- Page Content -->
    <NuxtPage />

    <!-- Global Footer -->
    <footer>
      <p>&copy; 2024 Employee Management System</p>
    </footer>
  </div>
</template>

<style>
/* Add some basic styles */
header, footer {
  background-color: #333;
  color: white;
  padding: 1em;
}

nav a {
  color: white;
  margin-right: 10px;
}

nav a:hover {
  text-decoration: underline;
}
</style>
