// frontend/src/hooks/useBanners.js
import { useState, useEffect } from 'react';
import { fetchActiveBanners } from '../api/banners';

export function useBanners() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setIsLoading(true);
        const data = await fetchActiveBanners();
        setBanners(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadBanners();
  }, []);

  return { banners, isLoading, error };
}
