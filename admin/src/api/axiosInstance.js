// admin/src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Attach Bearer token from localStorage on every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('himflax_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, clear token and redirect to login
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && window.location.pathname !== '/login') {
      localStorage.removeItem('himflax_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
