// frontend/src/hooks/useOccasion.js
import { useQuery } from '@tanstack/react-query';
import { fetchActiveOccasion } from '../api/occasions';

export function useOccasion() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['activeOccasion'],
    queryFn: fetchActiveOccasion,
    staleTime: 10 * 60 * 1000, // 10 minutes — occasions rarely change
    retry: 1,
  });

  return {
    occasion: data || null,
    isLoading,
    error: error?.message || null,
  };
}
