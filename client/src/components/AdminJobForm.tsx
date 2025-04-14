import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Job, BatchYear, LocationType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Job form schema
const jobSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  logo: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  eligibility: z.string().min(1, "Eligibility criteria is required"),
  deadline: z.string().min(1, "Application deadline is required"),
  location: z.string().min(1, "Job location is required"),
  link: z.string().url("Must be a valid URL"),
  jobType: z.string().min(1, "Job type is required"),
  salary: z.string().optional(),
  duration: z.string().optional(),
});

type JobFormData = z.infer<typeof jobSchema>;

interface AdminJobFormProps {
  job: Job | null;
  onSubmit: (data: Partial<Job>) => void;
  onCancel: () => void;
}

const BATCH_YEARS: BatchYear[] = ['2023', '2024', '2025'];
const LOCATIONS: LocationType[] = ['Remote', 'Bangalore', 'Hyderabad', 'Chennai', 'Mumbai', 'Pan India'];
const JOB_TYPES = ['Full-time', 'Part-time', 'Internship', 'Work From Home'];

const AdminJobForm = ({ job, onSubmit, onCancel }: AdminJobFormProps) => {
  const [selectedBatches, setSelectedBatches] = useState<string[]>(
    job?.batch || []
  );
  const [tags, setTags] = useState<string>(
    job?.tags ? job.tags.join(', ') : ''
  );

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      company: job?.company || '',
      logo: job?.logo || '',
      title: job?.title || '',
      description: job?.description || '',
      eligibility: job?.eligibility || '',
      deadline: job?.deadline || '',
      location: job?.location || '',
      link: job?.link || '',
      jobType: job?.jobType || 'Full-time',
      salary: job?.salary || '',
      duration: job?.duration || '',
    },
  });

  const handleFormSubmit = (data: JobFormData) => {
    // Process tags from comma-separated string to array
    const processedTags = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);

    // Combine form data with selected batches and processed tags
    const formattedData: Partial<Job> = {
      ...data,
      batch: selectedBatches,
      tags: processedTags,
    };

    onSubmit(formattedData);
  };

  const toggleBatch = (batch: string) => {
    setSelectedBatches(prev => {
      if (prev.includes(batch)) {
        return prev.filter(b => b !== batch);
      } else {
        return [...prev, batch];
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company Name *</Label>
          <Input
            id="company"
            {...form.register('company')}
            placeholder="e.g. Google"
          />
          {form.formState.errors.company && (
            <p className="text-sm text-red-500">
              {form.formState.errors.company.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo">Company Logo URL</Label>
          <Input
            id="logo"
            {...form.register('logo')}
            placeholder="https://example.com/logo.png"
          />
          {form.formState.errors.logo && (
            <p className="text-sm text-red-500">
              {form.formState.errors.logo.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            {...form.register('title')}
            placeholder="e.g. Frontend Developer"
          />
          {form.formState.errors.title && (
            <p className="text-sm text-red-500">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobType">Job Type *</Label>
          <Select
            defaultValue={form.getValues('jobType')}
            onValueChange={(value) => form.setValue('jobType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              {JOB_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.jobType && (
            <p className="text-sm text-red-500">
              {form.formState.errors.jobType.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Select
            defaultValue={form.getValues('location')}
            onValueChange={(value) => form.setValue('location', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {LOCATIONS.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.location && (
            <p className="text-sm text-red-500">
              {form.formState.errors.location.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="deadline">Application Deadline *</Label>
          <Input
            id="deadline"
            {...form.register('deadline')}
            placeholder="e.g. April 30, 2023"
          />
          {form.formState.errors.deadline && (
            <p className="text-sm text-red-500">
              {form.formState.errors.deadline.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary">Salary (Optional)</Label>
          <Input
            id="salary"
            {...form.register('salary')}
            placeholder="e.g. $80K - $120K"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (Optional)</Label>
          <Input
            id="duration"
            {...form.register('duration')}
            placeholder="e.g. 6 months"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="link">Application Link *</Label>
          <Input
            id="link"
            {...form.register('link')}
            placeholder="https://company.com/apply"
          />
          {form.formState.errors.link && (
            <p className="text-sm text-red-500">
              {form.formState.errors.link.message}
            </p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. React, Frontend, Remote"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Eligible Batch Years</Label>
          <div className="flex flex-wrap gap-3 mt-2">
            {BATCH_YEARS.map((batch) => (
              <div key={batch} className="flex items-center gap-2">
                <Checkbox
                  id={`batch-${batch}`}
                  checked={selectedBatches.includes(batch)}
                  onCheckedChange={() => toggleBatch(batch)}
                />
                <Label htmlFor={`batch-${batch}`} className="cursor-pointer">
                  {batch}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Job Description *</Label>
          <Textarea
            id="description"
            {...form.register('description')}
            placeholder="Detailed job description"
            rows={4}
          />
          {form.formState.errors.description && (
            <p className="text-sm text-red-500">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="eligibility">Eligibility Criteria *</Label>
          <Textarea
            id="eligibility"
            {...form.register('eligibility')}
            placeholder="Required qualifications and eligibility"
            rows={3}
          />
          {form.formState.errors.eligibility && (
            <p className="text-sm text-red-500">
              {form.formState.errors.eligibility.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-blue-700">
          {job ? 'Update Job' : 'Add Job'}
        </Button>
      </div>
    </form>
  );
};

export default AdminJobForm;