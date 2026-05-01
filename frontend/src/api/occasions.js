// frontend/src/api/occasions.js
import axiosInstance from './axiosInstance';

export const fetchActiveOccasion = async () => {
  const { data } = await axiosInstance.get('/occasions/active');
  return data.data;
};
