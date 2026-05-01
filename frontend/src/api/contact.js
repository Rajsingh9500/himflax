// frontend/src/api/contact.js
import axiosInstance from './axiosInstance';

/**
 * Submit contact form
 * @param {Object} formData - Contact form data
 * @param {string} formData.name
 * @param {string} formData.email
 * @param {string} [formData.phone]
 * @param {string} formData.service
 * @param {string} formData.message
 */
export async function submitContactForm(formData) {
  const { data } = await axiosInstance.post('/contact', formData);
  return data;
}
