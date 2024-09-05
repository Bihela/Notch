import axios from 'axios'

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your backend API URL
  })

  return {
    provide: {
      axios: axiosInstance,
    },
  }
})
