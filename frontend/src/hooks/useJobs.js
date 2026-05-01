// frontend/src/hooks/useJobs.js
import { useQuery } from '@tanstack/react-query';
import { fetchJobs } from '../api/jobs';

/**
 * Custom hook for fetching jobs with filters
 * @param {Object} filters - Query filters
 * @param {string} [filters.type] - Job type filter
 * @param {string} [filters.location] - Location filter
 * @param {number} [filters.page] - Page number
 * @param {number} [filters.limit] - Limit per page
 */
export function useJobs(filters = {}) {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => fetchJobs(filters),
    select: (response) => ({
      jobs: response.data || [],
      pagination: response.pagination || {},
    }),
    keepPreviousData: true,
  });
}
