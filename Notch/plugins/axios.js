import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: 'https://localhost:7065/', // Your API base URL
  });

  // Log requests and responses for debugging
  api.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
  });

  api.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
  }, error => {
    console.error('Error Response:', error.response);
    return Promise.reject(error);
  });

  nuxtApp.provide('axios', api);
});
