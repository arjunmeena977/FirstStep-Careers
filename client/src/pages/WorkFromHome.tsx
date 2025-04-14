import { useState, useEffect } from 'react';
import JobCard from '@/components/JobCard';
import FilterBar from '@/components/FilterBar';
import CTASection from '@/components/CTASection';
import { Job } from '@/types';
import { useJobFilters } from '@/hooks/useJobFilters';
import jobsData from '@/data/jobs.json';

const WorkFromHome = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  
  const { 
    filters, 
    filteredJobs, 
    updateSearch, 
    updateBatch, 
    updateLocation, 
    updateJobType 
  } = useJobFilters(jobs, { jobType: 'Work From Home' });

  useEffect(() => {
    // Get all work from home jobs
    setJobs(jobsData.filter(job => job.jobType === 'Work From Home'));
  }, []);

  return (
    <>
      <section className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              Work From Home Opportunities
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              Find the best remote job opportunities that allow you to work from the comfort of your home.
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobCard key={job.id} job={job} variant="wfh" />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-lg text-gray-500">No work from home jobs found matching your filters. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <CTASection />
    </>
  );
};

export default WorkFromHome;
