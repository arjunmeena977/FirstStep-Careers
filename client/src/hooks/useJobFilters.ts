import { useState, useEffect, useMemo } from 'react';
import { Job, JobFilters, BatchYear, LocationType, JobTypeFilter } from '@/types';

export function useJobFilters(jobs: Job[], initialFilters?: Partial<JobFilters>) {
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    batch: 'Any Batch',
    location: 'Any Location',
    jobType: 'Job Type',
    ...initialFilters,
  });

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Search filter
      if (filters.search && !job.title.toLowerCase().includes(filters.search.toLowerCase()) && 
          !job.company.toLowerCase().includes(filters.search.toLowerCase()) &&
          !job.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Batch filter
      if (filters.batch !== 'Any Batch') {
        if (!job.batch || !job.batch.includes(filters.batch)) {
          return false;
        }
      }

      // Location filter
      if (filters.location !== 'Any Location') {
        if (!job.location.includes(filters.location)) {
          return false;
        }
      }

      // Job Type filter
      if (filters.jobType !== 'Job Type') {
        const jobTypeMap: Record<JobTypeFilter, string> = {
          'Job Type': '',
          'Full Time': 'Full-time',
          'Part Time': 'Part-time',
          'Internship': 'Internship',
          'Work From Home': 'Work From Home'
        };
        
        if (job.jobType !== jobTypeMap[filters.jobType]) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, filters]);

  const updateFilter = (key: keyof JobFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateSearch = (value: string) => updateFilter('search', value);
  const updateBatch = (value: BatchYear) => updateFilter('batch', value);
  const updateLocation = (value: LocationType) => updateFilter('location', value);
  const updateJobType = (value: JobTypeFilter) => updateFilter('jobType', value);

  const resetFilters = () => {
    setFilters({
      search: '',
      batch: 'Any Batch',
      location: 'Any Location',
      jobType: 'Job Type'
    });
  };

  return {
    filters,
    filteredJobs,
    updateSearch,
    updateBatch,
    updateLocation,
    updateJobType,
    resetFilters
  };
}
