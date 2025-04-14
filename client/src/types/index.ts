export interface Job {
  id: number;
  company: string;
  logo: string;
  title: string;
  description: string;
  eligibility: string;
  deadline: string;
  location: string;
  link: string;
  jobType: 'Full-time' | 'Part-time' | 'Internship' | 'Work From Home';
  tags: string[];
  batch?: string[];
  salary?: string;
  duration?: string;
}

export interface YouTubeVideo {
  id: number;
  videoId: string;
  title: string;
  description: string;
  date: string;
  views: string;
  category: string;
}

export interface QuickLink {
  id: number;
  title: string;
  icon: string;
  color: string;
  url: string;
  bgColor: string;
}

export type JobType = 'all' | 'off-campus' | 'work-from-home' | 'internship';
export type BatchYear = 'Any Batch' | '2023' | '2024' | '2025';
export type LocationType = 'Any Location' | 'Remote' | 'Bangalore' | 'Hyderabad' | 'Chennai' | 'Mumbai' | 'Pan India';
export type JobTypeFilter = 'Job Type' | 'Full Time' | 'Part Time' | 'Internship' | 'Work From Home';

export interface JobFilters {
  search: string;
  batch: BatchYear;
  location: LocationType;
  jobType: JobTypeFilter;
}
