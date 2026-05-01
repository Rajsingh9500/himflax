// frontend/src/api/axiosInstance.js
import axios from 'axios';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';

    // Don't toast on 401 (handled by auth flow) or validation errors
    if (error.response?.status !== 401 && error.response?.status !== 400) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
