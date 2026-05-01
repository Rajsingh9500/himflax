// frontend/src/api/banners.js
const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const fetchActiveBanners = async () => {
  const response = await fetch(`${API_URL}/banners`);
  if (!response.ok) throw new Error('Failed to fetch banners');
  const json = await response.json();
  return json.data;
};
