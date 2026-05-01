// frontend/src/api/jobs.js
import axiosInstance from './axiosInstance';

/**
 * Fetch all active jobs with optional filters
 * @param {Object} params - Query parameters
 * @param {string} [params.type] - Job type filter
 * @param {string} [params.location] - Location filter
 * @param {number} [params.page] - Page number
 * @param {number} [params.limit] - Items per page
 */
export async function fetchJobs(params = {}) {
  const { data } = await axiosInstance.get('/jobs', { params });
  return data;
}

/**
 * Fetch single job by ID
 * @param {string} id - Job ID
 */
export async function fetchJobById(id) {
  const { data } = await axiosInstance.get(`/jobs/${id}`);
  return data;
}

/**
 * Submit a job application
 * @param {FormData} formData - Application form data including resume file
 */
export async function submitApplication(formData) {
  const { data } = await axiosInstance.post('/applications', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
