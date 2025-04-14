import { Job } from '@/types';
import { Card } from '@/components/ui/card';

interface JobCardProps {
  job: Job;
  variant?: 'default' | 'wfh' | 'internship';
}

const JobCard = ({ job, variant = 'default' }: JobCardProps) => {
  if (variant === 'wfh') {
    return (
      <div className="bg-gray-50 rounded-lg p-6 job-card transition duration-300">
        <div className="flex items-start">
          <img src={job.logo} alt={`${job.company} Logo`} className="h-12 w-12 rounded-md object-contain border border-gray-200 p-1 bg-white" />
          <div className="ml-4 flex-grow">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-primary font-medium">{job.company}</p>
              </div>
              <span className="bg-green-100 text-green-600 px-2 py-1 text-xs font-medium rounded-full flex items-center">
                <i className="fas fa-home mr-1"></i> Remote
              </span>
            </div>
            
            <div className="mt-4 text-sm text-neutral-medium">
              {job.description}
            </div>
            
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center">
                <i className="fas fa-graduation-cap text-gray-400 w-5"></i>
                <span className="text-neutral-dark">{job.eligibility}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-calendar-alt text-gray-400 w-5"></i>
                <span className="text-status-warning font-medium">Deadline: {job.deadline}</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <span key={index} className="inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-primary rounded">{tag}</span>
                ))}
                {job.salary && (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-50 text-purple-600 rounded">{job.salary}</span>
                )}
              </div>
              <a href={job.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-primary hover:text-blue-700">
                Apply Now <i className="fas fa-external-link-alt ml-1"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'internship') {
    return (
      <Card className="bg-white rounded-lg shadow-sm overflow-hidden job-card transition duration-300">
        <div className="relative">
          <div className="absolute top-4 right-4">
            <span className="bg-blue-100 text-blue-600 px-2 py-1 text-xs font-medium rounded-full">
              Internship
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start">
            <img src={job.logo} alt={`${job.company} Logo`} className="h-12 w-12 rounded-md object-contain border border-gray-200 p-1 bg-white" />
            <div className="ml-4">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-primary font-medium">{job.company}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-medium">Duration: {job.duration}</span>
              <span className="text-green-600 font-medium">{job.salary}</span>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm">
              <i className="fas fa-graduation-cap text-gray-400 w-5"></i>
              <span className="text-neutral-dark">{job.eligibility}</span>
            </div>
            <div className="flex items-center text-sm">
              <i className="fas fa-map-marker-alt text-gray-400 w-5"></i>
              <span className="text-neutral-dark">{job.location}</span>
            </div>
            <div className="flex items-center text-sm">
              <i className="fas fa-calendar-alt text-gray-400 w-5"></i>
              <span className="text-status-warning font-medium">Deadline: {job.deadline}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <a 
              href={job.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-center transition-colors"
            >
              Apply Now
            </a>
          </div>
        </div>
      </Card>
    );
  }

  // Default job card
  return (
    <Card className="bg-white rounded-lg shadow-sm overflow-hidden job-card transition duration-300">
      <div className="p-6">
        <div className="flex items-start">
          <img src={job.logo} alt={`${job.company} Logo`} className="h-12 w-12 rounded-md object-contain border border-gray-200 p-1 bg-white" />
          <div className="ml-4">
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-primary font-medium">{job.company}</p>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-neutral-medium">
          {job.description}
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <i className="fas fa-graduation-cap text-gray-400 w-5"></i>
            <span className="text-neutral-dark">{job.eligibility}</span>
          </div>
          <div className="flex items-center text-sm">
            <i className="fas fa-map-marker-alt text-gray-400 w-5"></i>
            <span className="text-neutral-dark">{job.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <i className="fas fa-calendar-alt text-gray-400 w-5"></i>
            <span className="text-status-warning font-medium">Deadline: {job.deadline}</span>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, index) => (
              <span key={index} className="inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-primary rounded">{tag}</span>
            ))}
          </div>
          <a href={job.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-primary hover:text-blue-700">
            Apply Now <i className="fas fa-external-link-alt ml-1"></i>
          </a>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
