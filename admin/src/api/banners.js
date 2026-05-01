// admin/src/api/banners.js
import axiosInstance from './axiosInstance';

export const fetchBanners = () => axiosInstance.get('/banners/all').then((r) => r.data);
export const createBanner = (data) => axiosInstance.post('/banners', data).then((r) => r.data);
export const updateBanner = (id, data) => axiosInstance.put(`/banners/${id}`, data).then((r) => r.data);
export const deleteBanner = (id) => axiosInstance.delete(`/banners/${id}`).then((r) => r.data);
