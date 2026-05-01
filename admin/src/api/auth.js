// admin/src/api/auth.js
import axiosInstance from './axiosInstance';

export const loginApi = (data) => axiosInstance.post('/auth/login', data).then((r) => r.data);
export const logoutApi = () => axiosInstance.post('/auth/logout').then((r) => r.data);
export const getMeApi = () => axiosInstance.get('/auth/me').then((r) => r.data);
