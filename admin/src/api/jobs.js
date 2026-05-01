// admin/src/api/jobs.js
import axiosInstance from './axiosInstance';

export const fetchJobs = (params) => axiosInstance.get('/jobs', { params: { all: 'true', ...params } }).then((r) => r.data);
export const fetchJobById = (id) => axiosInstance.get(`/jobs/${id}`).then((r) => r.data);
export const createJob = (data) => axiosInstance.post('/jobs', data).then((r) => r.data);
export const updateJob = (id, data) => axiosInstance.put(`/jobs/${id}`, data).then((r) => r.data);
export const toggleJob = (id) => axiosInstance.patch(`/jobs/${id}/toggle`).then((r) => r.data);
export const deleteJob = (id) => axiosInstance.delete(`/jobs/${id}`).then((r) => r.data);
export const getDashboardStats = () => axiosInstance.get('/jobs/stats/overview').then((r) => r.data);
