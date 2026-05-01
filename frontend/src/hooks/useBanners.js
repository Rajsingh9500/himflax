// frontend/src/hooks/useBanners.js
import { useQuery } from '@tanstack/react-query';
import { fetchActiveBanners } from '../api/banners';

export function useBanners() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['banners'],
    queryFn: fetchActiveBanners,
    staleTime: 5 * 60 * 1000, // 5 minutes — banners don't change often
    retry: 2,
  });

  return {
    banners: data || [],
    isLoading,
    error: error?.message || null,
  };
}
