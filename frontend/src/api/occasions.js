// frontend/src/api/occasions.js
const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const fetchActiveOccasion = async () => {
  const response = await fetch(`${API_URL}/occasions/active`);
  if (!response.ok) throw new Error('Failed to fetch active occasion');
  const json = await response.json();
  return json.data;
};
