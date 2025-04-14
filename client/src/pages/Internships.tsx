import { useState, useEffect } from 'react';
import JobCard from '@/components/JobCard';
import FilterBar from '@/components/FilterBar';
import CTASection from '@/components/CTASection';
import { Job } from '@/types';
import { useJobFilters } from '@/hooks/useJobFilters';
import { useToast } from '@/hooks/use-toast';

const Internships = () => {
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
  } = useJobFilters(jobs, { jobType: 'Internship' });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/jobs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobs data');
        }
        
        const jobsData = await response.json();
        
        // Get all internship jobs
        setJobs(jobsData.filter((job: Job) => 
          job.jobType.toLowerCase() === 'internship'));
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: "Error loading jobs",
          description: "Couldn't load the internship listings.",
          variant: "destructive",
        });
        
        // Fallback to local data if API fails
        import('@/data/jobs.json').then((module) => {
          const fallbackData = module.default;
          setJobs(fallbackData.filter((job: Job) => 
            job.jobType.toLowerCase() === 'internship'));
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, [toast]);

  return (
    <>
      <section className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              Internship Opportunities
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              Kickstart your career with hands-on experience through our curated internship opportunities.
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
                <JobCard key={job.id} job={job} variant="internship" />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-lg text-gray-500">No internships found matching your filters. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <CTASection />
    </>
  );
};

export default Internships;
