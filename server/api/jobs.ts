import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Job } from '@/types';

// Path to jobs.json file
const jobsFilePath = path.join(process.cwd(), 'client/src/data/jobs.json');

// Read jobs data from the file
const readJobsData = (): Job[] => {
  try {
    const data = fs.readFileSync(jobsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading jobs data:', error);
    return [];
  }
};

// Write jobs data to the file
const writeJobsData = (jobs: Job[]): boolean => {
  try {
    fs.writeFileSync(jobsFilePath, JSON.stringify(jobs, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing jobs data:', error);
    return false;
  }
};

// Get all jobs
export const getJobs = (req: Request, res: Response) => {
  try {
    const jobs = readJobsData();
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

// Get a specific job by ID
export const getJobById = (req: Request, res: Response) => {
  try {
    const jobs = readJobsData();
    const jobId = parseInt(req.params.id);
    const job = jobs.find(job => job.id === jobId);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
};

// Create a new job
export const createJob = (req: Request, res: Response) => {
  try {
    const jobs = readJobsData();
    const newJob = req.body;
    
    // Generate a new ID
    const maxId = jobs.length > 0 ? Math.max(...jobs.map(job => job.id)) : 0;
    newJob.id = maxId + 1;
    
    // Add new job to the array
    jobs.push(newJob);
    
    // Write updated jobs array to file
    if (writeJobsData(jobs)) {
      res.status(201).json(newJob);
    } else {
      res.status(500).json({ error: 'Failed to save job' });
    }
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
};

// Update an existing job
export const updateJob = (req: Request, res: Response) => {
  try {
    const jobs = readJobsData();
    const jobId = parseInt(req.params.id);
    const updatedJobData = req.body;
    
    // Find the job to update
    const jobIndex = jobs.findIndex(job => job.id === jobId);
    
    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    // Update the job with new data
    jobs[jobIndex] = { ...jobs[jobIndex], ...updatedJobData };
    
    // Write updated jobs array to file
    if (writeJobsData(jobs)) {
      res.json(jobs[jobIndex]);
    } else {
      res.status(500).json({ error: 'Failed to update job' });
    }
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
};

// Delete a job
export const deleteJob = (req: Request, res: Response) => {
  try {
    const jobs = readJobsData();
    const jobId = parseInt(req.params.id);
    
    // Find the job to delete
    const jobIndex = jobs.findIndex(job => job.id === jobId);
    
    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    // Remove the job from the array
    jobs.splice(jobIndex, 1);
    
    // Write updated jobs array to file
    if (writeJobsData(jobs)) {
      res.json({ message: 'Job deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete job' });
    }
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
};