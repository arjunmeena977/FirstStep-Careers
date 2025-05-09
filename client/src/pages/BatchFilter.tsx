import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import JobCard from '@/components/JobCard';
import FilterBar from '@/components/FilterBar';
import CTASection from '@/components/CTASection';
import { Job, BatchYear } from '@/types';
import { useJobFilters } from '@/hooks/useJobFilters';
import { useToast } from '@/hooks/use-toast';

const BatchFilter = () => {
  const params = useParams<{ year?: string }>();
  const batchYear = params.year as BatchYear || 'Any Batch';
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const { 
    filters,
    filteredJobs, 
    updateSearch, 
    updateBatch, 
    updateLocation, 
    updateJobType 
  } = useJobFilters(jobs, { batch: batchYear });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/jobs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobs data');
        }
        
        const jobsData = await response.json();
        
        // Get all jobs
        setJobs(jobsData);
        
        // Set the batch filter based on URL parameter
        if (params.year) {
          updateBatch(params.year as BatchYear);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: "Error loading jobs",
          description: "Couldn't load the job listings for this batch.",
          variant: "destructive",
        });
        
        // Fallback to local data if API fails
        import('@/data/jobs.json').then((module) => {
          const fallbackData = module.default;
          setJobs(fallbackData);
          if (params.year) {
            updateBatch(params.year as BatchYear);
          }
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, [params.year, toast, updateBatch]);

  return (
    <>
      <section className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              Jobs for {params.year || 'All'} Batch
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              Find the best job opportunities tailored for your graduation year.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterBar 
            filters={filters}
            onSearchChange={updateSearch}
            onBatchChange={updateBatch}
            onLocationChange={updateLocation}
            onJobTypeChange={updateJobType}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-lg text-gray-500">No jobs found for {params.year || 'selected'} batch. Try a different batch year.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <CTASection />
    </>
  );
};

export default BatchFilter;
