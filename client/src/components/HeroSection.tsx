import { useState } from 'react';

// Button component with TypeScript props
interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ className, children, onClick }) => {
  return (
    <button 
      className={className} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const HeroSection = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [activePage, setActivePage] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [filteredView, setFilteredView] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    experience: "Any",
    jobType: "Any",
    location: "Any"
  });

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    // Only close active page if filters are being opened
    if (!showFilters) {
      setActivePage(null); 
    }
  };

  // Function to handle page navigation
  const navigateTo = (page) => {
    setActivePage(page);
    setShowFilters(false); // Hide filters when showing a page
    setSelectedJob(null); // Clear any selected job
    setSelectedCompany(null); // Clear any selected company
  };

  // Function to handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  // Function to apply filters
  const applyFilters = () => {
    setFilteredView(true);
    navigateTo('active-jobs'); // Navigate to jobs after applying filters
  };

  // Function to view job details
  const viewJobDetails = (job) => {
    setSelectedJob(job);
  };

  // Function to view company jobs
  const viewCompanyJobs = (company) => {
    setSelectedCompany(company);
    navigateTo('company-jobs');
  };

  // Function to go back from job details to the previous page
  const backToResults = () => {
    setSelectedJob(null);
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Find Your Dream <span className="text-yellow-300">Fresher Job</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover top opportunities for entry-level positions, internships, and more - all in one place.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a href="#" onClick={(e) => {
              e.preventDefault();
              navigateTo('active-jobs');
            }} className="inline-block">
              <Button className="inline-block bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                <i className="fas fa-search mr-2"></i> Browse All Jobs
              </Button>
            </a>
            <Button 
              className="inline-block bg-blue-700 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-800 transition"
              onClick={toggleFilters}
            >
              <i className="fas fa-filter mr-2"></i> Filter by Criteria
            </Button>
          </div>
          
          {showFilters && (
            <div className="mt-4 bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Experience Level</label>
                  <select 
                    className="w-full p-2 rounded text-blue-800"
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                  >
                    <option>Any</option>
                    <option>0-1 Years</option>
                    <option>1-2 Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Job Type</label>
                  <select 
                    className="w-full p-2 rounded text-blue-800"
                    value={filters.jobType}
                    onChange={(e) => handleFilterChange('jobType', e.target.value)}
                  >
                    <option>Any</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <select 
                    className="w-full p-2 rounded text-blue-800"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  >
                    <option>Any</option>
                    <option>Remote</option>
                    <option>On-site</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>
              <Button 
                className="mt-4 bg-yellow-500 text-blue-800 font-medium px-6 py-2 rounded-lg hover:bg-yellow-400 transition"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </div>
          )}
          
          <div className="mt-12 bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              <button onClick={() => navigateTo('active-jobs')} className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm cursor-pointer hover:bg-white/30 transition border-0">
                <i className="fas fa-check-circle mr-1"></i> 200+ Active Jobs
              </button>
              <button onClick={() => navigateTo('top-companies')} className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm cursor-pointer hover:bg-white/30 transition border-0">
                <i className="fas fa-building mr-1"></i> Top Companies
              </button>
              <button onClick={() => navigateTo('remote-jobs')} className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm cursor-pointer hover:bg-white/30 transition border-0">
                <i className="fas fa-laptop-house mr-1"></i> Remote Options
              </button>
              <button onClick={() => navigateTo('quick-apply')} className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm cursor-pointer hover:bg-white/30 transition border-0">
                <i className="fas fa-bolt mr-1"></i> Quick Apply
              </button>
            </div>
          </div>
          
          {/* Page Content Display */}
          {activePage === 'active-jobs' && !selectedJob && (
            <div className="mt-8 bg-white text-blue-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                {filteredView ? `Filtered Jobs (${filters.experience}, ${filters.jobType}, ${filters.location})` : '200+ Active Jobs'}
              </h2>
              <p className="mb-4">Browse through our collection of over 200 active job listings for freshers.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="border border-gray-200 p-4 rounded-lg">
                    <h3 className="font-medium">Software Developer Intern #{i}</h3>
                    <p className="text-sm text-gray-600">XYZ Tech Solutions</p>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="mr-3"><i className="fas fa-map-marker-alt mr-1"></i> Remote</span>
                      <span><i className="fas fa-money-bill-wave mr-1"></i> $35-45k</span>
                    </div>
                    <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => viewJobDetails(`Software Developer Intern #${i}`)}
                    >Apply Now</button>
                  </div>
                ))}
              </div>
              <button onClick={() => setActivePage(null)} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
                Back to Home
              </button>
            </div>
          )}
          
          {activePage === 'active-jobs' && selectedJob && (
            <div className="mt-8 bg-white text-blue-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">{selectedJob}</h2>
              
              <div className="border-b pb-4 mb-4">
                <p className="text-lg">XYZ Tech Solutions</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="mr-4"><i className="fas fa-map-marker-alt mr-1"></i> Remote</span>
                  <span className="mr-4"><i className="fas fa-money-bill-wave mr-1"></i> $35-45k</span>
                  <span><i className="fas fa-clock mr-1"></i> Full-time</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-2">Job Description</h3>
                <p className="text-gray-700 mb-3">
                  We are looking for a passionate Software Developer Intern to join our dynamic team. 
                  This is an excellent opportunity for freshers to gain hands-on experience in a collaborative environment.
                </p>
                <p className="text-gray-700 mb-3">
                  You will work on real projects, learn from experienced developers, and make a meaningful impact.
                </p>
                
                <h3 className="font-medium text-lg mt-4 mb-2">Requirements</h3>
                <ul className="list-disc list-inside text-gray-700 mb-3">
                  <li>Basic knowledge of programming languages (Java, Python, JavaScript)</li>
                  <li>Understanding of data structures and algorithms</li>
                  <li>Eagerness to learn and problem-solving attitude</li>
                  <li>Good communication skills</li>
                </ul>
              </div>
              
              <div className="flex space-x-3">
                <button className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => alert(`Application submitted for ${selectedJob}!`)}
                >
                  Submit Application
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={backToResults}
                >
                  Back to Results
                </button>
              </div>
            </div>
          )}
          
          {activePage === 'top-companies' && !selectedCompany && (
            <div className="mt-8 bg-white text-blue-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Top Companies</h2>
              <p className="mb-4">Explore opportunities from leading companies hiring freshers.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'IBM', 'Infosys', 'TCS'].map(company => (
                  <div key={company} className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="fas fa-building text-xl"></i>
                    </div>
                    <h3 className="font-medium">{company}</h3>
                    <p className="text-sm text-gray-600 mt-1">12 open positions</p>
                    <button className="mt-2 text-blue-600 text-sm"
                      onClick={() => viewCompanyJobs(company)}
                    >View Jobs</button>
                  </div>
                ))}
              </div>
              <button onClick={() => setActivePage(null)} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
                Back to Home
              </button>
            </div>
          )}
          
          {activePage === 'company-jobs' && selectedCompany && (
            <div className="mt-8 bg-white text-blue-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Jobs at {selectedCompany}</h2>
              <p className="mb-4">Explore the latest opportunities at {selectedCompany}.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer'].map(job => (
                  <div key={job} className="border border-gray-200 p-4 rounded-lg">
                    <h3 className="font-medium">{job}</h3>
                    <p className="text-sm text-gray-600">{selectedCompany}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="mr-3"><i className="fas fa-map-marker-alt mr-1"></i> Multiple Locations</span>
                      <span><i className="fas fa-money-bill-wave mr-1"></i> Competitive</span>
                    </div>
                    <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => viewJobDetails(`${job} at ${selectedCompany}`)}
                    >View Details</button>
                  </div>
                ))}
              </div>
              <button onClick={() => navigateTo('top-companies')} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
                Back to All Companies
              </button>
            </div>
          )}
          
          {activePage === 'remote-jobs' && !selectedJob && (
            <div className="mt-8 bg-white text-blue-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Remote Options</h2>
              <p className="mb-4">Find the best remote job opportunities for freshers.</p>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Filter by Department</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['IT & Software', 'Marketing', 'Design', 'Content Writing', 'Customer Support', 'Data Analysis'].map(dept => (
                    <button key={dept} className="px-3 py-1 border border-blue-500 rounded-full text-sm hover:bg-blue-500 hover:text-white"
                      onClick={() => {
                        alert("Filtering by: " + dept);
                        // Filter logic would go here
                      }}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Remote Frontend Developer', 'Content Writer', 'Digital Marketing Associate', 'UI/UX Designer'].map(job => (
                  <div key={job} className="border border-gray-200 p-4 rounded-lg">
                    <h3 className="font-medium">{job}</h3>
                    <p className="text-sm text-gray-600">Various Companies</p>
                    <div className="mt-2 text-sm text-green-600">
                      <i className="fas fa-globe mr-1"></i> Fully Remote
                    </div>
                    <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => viewJobDetails(job)}
                    >View Details</button>
                  </div>
                ))}
              </div>
              <button onClick={() => setActivePage(null)} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
                Back to Home
              </button>
            </div>
          )}
          
          {activePage === 'quick-apply' && (
            <div className="mt-8 bg-white text-blue-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Quick Apply</h2>
              <p className="mb-4">Apply to multiple jobs with a single click after setting up your profile.</p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium mb-2">Your Profile</h3>
                <p className="text-sm mb-4">Complete your profile to enable Quick Apply feature.</p>
                <div className="progress h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div className="bg-green-500 h-full" style={{width: '70%'}}></div>
                </div>
                <p className="text-sm text-gray-600">Profile completion: 70%</p>
                <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() => {
                    alert("Redirecting to profile completion page");
                    // Profile completion logic would go here
                  }}
                >
                  Complete Profile
                </button>
              </div>
              
              <h3 className="font-medium mb-3">Jobs with Quick Apply</h3>
              <div className="grid grid-cols-1 gap-4">
                {['Junior Web Developer', 'Python Developer', 'Data Analyst', 'Marketing Associate'].map(job => (
                  <div key={job} className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{job}</h4>
                      <p className="text-sm text-gray-600">Various Companies</p>
                    </div>
                    <button className="bg-green-500 text-white px-3 py-1 rounded text-sm flex items-center"
                      onClick={() => {
                        alert("Quick Apply submitted for: " + job);
                        // Quick apply submission logic would go here
                      }}
                    >
                      <i className="fas fa-bolt mr-1"></i> Quick Apply
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => setActivePage(null)} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;