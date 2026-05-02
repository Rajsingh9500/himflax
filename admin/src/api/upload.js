// admin/src/api/upload.js
import axiosInstance from './axiosInstance';

/**
 * Upload an image file to Cloudinary via the backend
 * @param {File} file - The image file to upload
 * @returns {Promise<{ url: string, publicId: string }>}
 */
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosInstance.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};
