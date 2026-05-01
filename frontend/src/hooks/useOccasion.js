// frontend/src/hooks/useOccasion.js
import { useState, useEffect } from 'react';
import { fetchActiveOccasion } from '../api/occasions';

export function useOccasion() {
  const [occasion, setOccasion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOccasion = async () => {
      try {
        setIsLoading(true);
        const data = await fetchActiveOccasion();
        setOccasion(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadOccasion();
  }, []);

  return { occasion, isLoading, error };
}
