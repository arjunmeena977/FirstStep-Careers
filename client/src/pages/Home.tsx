import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import HeroSection from '@/components/HeroSection';
import QuickLinks from '@/components/QuickLinks';
import JobCard from '@/components/JobCard';
import FilterBar from '@/components/FilterBar';
import YouTubeVideo from '@/components/YouTubeVideo';
import CTASection from '@/components/CTASection';
import { Job, YouTubeVideo as VideoType } from '@/types';
import { useJobFilters } from '@/hooks/useJobFilters';
import jobsData from '@/data/jobs.json';
import videosData from '@/data/videos.json';

const Home = () => {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [wfhJobs, setWfhJobs] = useState<Job[]>([]);
  const [internships, setInternships] = useState<Job[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  
  const { 
    filters, 
    filteredJobs, 
    updateSearch, 
    updateBatch, 
    updateLocation, 
    updateJobType 
  } = useJobFilters(featuredJobs);

  useEffect(() => {
    // Get top 6 jobs to feature
    setFeaturedJobs(jobsData.slice(0, 6));
    
    // Get 2 work from home jobs
    setWfhJobs(jobsData.filter(job => job.jobType === 'Work From Home').slice(0, 2));
    
    // Get 3 internships
    setInternships(jobsData.filter(job => job.jobType === 'Internship').slice(0, 3));
    
    // Get 3 videos
    setVideos(videosData.slice(0, 3));
  }, []);

  return (
    <>
      <HeroSection />
      
      <QuickLinks />
      
      {/* Featured Jobs */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Top 10 Jobs</h2>
            <Link href="/off-campus-drives">
              <a className="text-primary hover:text-blue-700 font-medium text-sm flex items-center">
                View all <i className="fas fa-arrow-right ml-1"></i>
              </a>
            </Link>
          </div>
          
          <FilterBar 
            filters={filters}
            onSearchChange={updateSearch}
            onBatchChange={updateBatch}
            onLocationChange={updateLocation}
            onJobTypeChange={updateJobType}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-lg text-gray-500">No jobs found matching your filters. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Work From Home Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Work From Home</h2>
            <Link href="/work-from-home">
              <a className="text-primary hover:text-blue-700 font-medium text-sm flex items-center">
                View all <i className="fas fa-arrow-right ml-1"></i>
              </a>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wfhJobs.map(job => (
              <JobCard key={job.id} job={job} variant="wfh" />
            ))}
          </div>
        </div>
      </section>
      
      {/* Internship Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Latest Internships</h2>
            <Link href="/internships">
              <a className="text-primary hover:text-blue-700 font-medium text-sm flex items-center">
                View all <i className="fas fa-arrow-right ml-1"></i>
              </a>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map(job => (
              <JobCard key={job.id} job={job} variant="internship" />
            ))}
          </div>
        </div>
      </section>
      
      {/* YouTube Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Career Guidance Videos</h2>
            <Link href="/youtube">
              <a className="text-primary hover:text-blue-700 font-medium text-sm flex items-center">
                View all <i className="fas fa-arrow-right ml-1"></i>
              </a>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => (
              <YouTubeVideo key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>
      
      <CTASection />
    </>
  );
};

export default Home;
