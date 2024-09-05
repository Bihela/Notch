import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: 'https://localhost:7065/api', // Your API base URL
  });

  nuxtApp.provide('axios', api);
});
