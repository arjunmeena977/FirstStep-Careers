import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Job } from '@/types';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// Import using relative path to avoid module resolution issues
import AdminJobForm from '../../components/AdminJobForm';

const AdminDashboard = () => {
  const [, setLocation] = useLocation();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  const { toast } = useToast();

  // Check authentication
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      setLocation('/admin');
    }
  }, [setLocation]);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll load the jobs from the static import
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        // Fallback to local data
        import('@/data/jobs.json').then((module) => {
          setJobs(module.default);
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setLocation('/admin');
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsDialogOpen(true);
  };

  const handleDeleteJob = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        // API call would go here in a real app
        const response = await fetch(`/api/jobs/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete job');
        }
        
        // Update local state
        setJobs(jobs.filter(job => job.id !== id));
        
        toast({
          title: "Job deleted",
          description: "The job has been successfully deleted",
        });
      } catch (error) {
        console.error('Error deleting job:', error);
        
        // Simulate successful delete for demo
        setJobs(jobs.filter(job => job.id !== id));
        
        toast({
          title: "Job deleted",
          description: "The job has been successfully deleted",
        });
      }
    }
  };

  const handleAddJob = () => {
    setEditingJob(null);
    setIsDialogOpen(true);
  };

  const handleSaveJob = async (job: Partial<Job>) => {
    try {
      // Check if we're editing an existing job or adding a new one
      if (editingJob) {
        // Update existing job
        const response = await fetch(`/api/jobs/${editingJob.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...editingJob,
            ...job,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to update job');
        }
        
        const updatedJob = await response.json();
        
        // Update local state
        setJobs(jobs.map(j => j.id === editingJob.id ? updatedJob : j));
        
        toast({
          title: "Job updated",
          description: "The job has been successfully updated",
        });
      } else {
        // Add new job
        const newJob: Partial<Job> = {
          ...job,
          id: Math.max(...jobs.map(j => j.id), 0) + 1,
        };
        
        const response = await fetch('/api/jobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newJob),
        });
        
        if (!response.ok) {
          throw new Error('Failed to add job');
        }
        
        const savedJob = await response.json();
        
        // Update local state
        setJobs([...jobs, savedJob]);
        
        toast({
          title: "Job added",
          description: "The job has been successfully added",
        });
      }
      
      // Close the dialog
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving job:', error);
      
      // Simulate successful save for demo
      if (editingJob) {
        // Update existing job
        const updatedJobs = jobs.map(j => {
          if (j.id === editingJob.id) {
            return {
              ...j,
              ...job,
            };
          }
          return j;
        });
        
        setJobs(updatedJobs);
        
        toast({
          title: "Job updated",
          description: "The job has been successfully updated",
        });
      } else {
        // Add new job
        const newJob: Job = {
          id: Math.max(...jobs.map(j => j.id), 0) + 1,
          company: job.company || '',
          logo: job.logo || 'https://via.placeholder.com/150',
          title: job.title || '',
          description: job.description || '',
          eligibility: job.eligibility || '',
          deadline: job.deadline || '',
          location: job.location || '',
          link: job.link || '',
          jobType: job.jobType || 'Full-time',
          tags: job.tags || [],
          batch: job.batch || ['2023', '2024'],
          salary: job.salary,
          duration: job.duration,
        };
        
        setJobs([...jobs, newJob]);
        
        toast({
          title: "Job added",
          description: "The job has been successfully added",
        });
      }
      
      // Close the dialog
      setIsDialogOpen(false);
    }
  };

  // Filter jobs based on active tab
  const filteredJobs = jobs.filter(job => {
    if (activeTab === 'all') return true;
    return job.jobType.toLowerCase().includes(activeTab.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Job Management</h2>
            <Button onClick={handleAddJob} className="bg-primary hover:bg-blue-700">
              <i className="fas fa-plus mr-2"></i> Add New Job
            </Button>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="full-time">Full-time</TabsTrigger>
              <TabsTrigger value="work from home">Work From Home</TabsTrigger>
              <TabsTrigger value="internship">Internships</TabsTrigger>
            </TabsList>
          </Tabs>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>List of job opportunities</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        No jobs found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.id}</TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.jobType}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.deadline}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button 
                            onClick={() => handleEditJob(job)}
                            variant="outline" 
                            size="sm"
                          >
                            <i className="fas fa-edit mr-1"></i> Edit
                          </Button>
                          <Button 
                            onClick={() => handleDeleteJob(job.id)}
                            variant="destructive" 
                            size="sm"
                          >
                            <i className="fas fa-trash-alt mr-1"></i> Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>
            {editingJob ? 'Edit Job' : 'Add New Job'}
          </DialogTitle>
          <DialogDescription>
            {editingJob 
              ? 'Make changes to the job posting here.'
              : 'Fill in the details to create a new job posting.'
            }
          </DialogDescription>
          
          <AdminJobForm 
            job={editingJob} 
            onSubmit={handleSaveJob} 
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;