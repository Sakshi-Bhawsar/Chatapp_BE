// axiosInterceptor.ts
import axios, { AxiosInstance } from 'axios';

// Create a custom Axios instance
const api: AxiosInstance = axios.create({
  baseURL: '/', // Set the base URL for your API
  headers: {
    'Content-type': 'application/json',
  },
});
api.interceptors.request.use(
  async(config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export  {api};
