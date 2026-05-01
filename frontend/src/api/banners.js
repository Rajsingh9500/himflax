// frontend/src/api/banners.js
import axiosInstance from './axiosInstance';

export const fetchActiveBanners = async () => {
  const { data } = await axiosInstance.get('/banners');
  return data.data;
};
