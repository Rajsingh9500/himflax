// admin/src/api/occasions.js
import axiosInstance from './axiosInstance';

export const fetchOccasions = () => axiosInstance.get('/occasions').then((r) => r.data);
export const createOccasion = (data) => axiosInstance.post('/occasions', data).then((r) => r.data);
export const updateOccasion = (id, data) => axiosInstance.put(`/occasions/${id}`, data).then((r) => r.data);
export const deleteOccasion = (id) => axiosInstance.delete(`/occasions/${id}`).then((r) => r.data);
export const toggleOccasionLive = (id) => axiosInstance.patch(`/occasions/${id}/toggle-live`).then((r) => r.data);
