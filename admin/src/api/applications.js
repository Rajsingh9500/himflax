// admin/src/api/applications.js
import axiosInstance from './axiosInstance';

export const fetchApplications = (params) => axiosInstance.get('/applications', { params }).then((r) => r.data);
export const updateApplicationStatus = (id, status) => axiosInstance.patch(`/applications/${id}/status`, { status }).then((r) => r.data);
