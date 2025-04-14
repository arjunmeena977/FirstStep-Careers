import { JobFilters, BatchYear, LocationType, JobTypeFilter } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterBarProps {
  filters: JobFilters;
  onSearchChange: (value: string) => void;
  onBatchChange: (value: BatchYear) => void;
  onLocationChange: (value: LocationType) => void;
  onJobTypeChange: (value: JobTypeFilter) => void;
}

const FilterBar = ({ 
  filters, 
  onSearchChange, 
  onBatchChange, 
  onLocationChange, 
  onJobTypeChange 
}: FilterBarProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-wrap gap-4 items-center">
      <div className="flex-grow lg:flex-grow-0 w-full lg:w-auto">
        <div className="relative">
          <Input 
            type="text" 
            placeholder="Search jobs..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 md:gap-4 w-full lg:w-auto">
        <Select
          value={filters.batch}
          onValueChange={(value) => onBatchChange(value as BatchYear)}
        >
          <SelectTrigger className="bg-white border border-gray-300 text-neutral-dark rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition w-full md:w-auto">
            <SelectValue placeholder="Any Batch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Any Batch">Any Batch</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={filters.location}
          onValueChange={(value) => onLocationChange(value as LocationType)}
        >
          <SelectTrigger className="bg-white border border-gray-300 text-neutral-dark rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition w-full md:w-auto">
            <SelectValue placeholder="Any Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Any Location">Any Location</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="Bangalore">Bangalore</SelectItem>
            <SelectItem value="Hyderabad">Hyderabad</SelectItem>
            <SelectItem value="Chennai">Chennai</SelectItem>
            <SelectItem value="Mumbai">Mumbai</SelectItem>
            <SelectItem value="Pan India">Pan India</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={filters.jobType}
          onValueChange={(value) => onJobTypeChange(value as JobTypeFilter)}
        >
          <SelectTrigger className="bg-white border border-gray-300 text-neutral-dark rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition w-full md:w-auto">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Job Type">Job Type</SelectItem>
            <SelectItem value="Full Time">Full Time</SelectItem>
            <SelectItem value="Part Time">Part Time</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
            <SelectItem value="Work From Home">Work From Home</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
