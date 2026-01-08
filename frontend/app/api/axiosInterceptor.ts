import axios from "axios";

const axiosServerInterceptor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
axiosServerInterceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Response Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosServerInterceptor;
