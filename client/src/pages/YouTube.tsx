import { useState, useEffect } from 'react';
import YouTubeVideo from '@/components/YouTubeVideo';
import CTASection from '@/components/CTASection';
import { YouTubeVideo as VideoType } from '@/types';
import videosData from '@/data/videos.json';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const YouTube = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    setVideos(videosData);
    setFilteredVideos(videosData);
  }, []);

  useEffect(() => {
    const filtered = videos.filter(video => {
      const matchesSearch = searchTerm === '' || 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === 'all' || video.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredVideos(filtered);
  }, [searchTerm, activeCategory, videos]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
  };

  return (
    <>
      <section className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              Career Guidance Videos
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              Learn from experts about job search strategies, interview preparation, and career development.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="relative mb-6">
              <Input 
                type="text" 
                placeholder="Search videos..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                value={searchTerm}
                onChange={handleSearch}
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            
            <Tabs defaultValue="all" onValueChange={handleCategoryChange}>
              <TabsList className="grid grid-cols-4 md:flex md:space-x-2">
                <TabsTrigger value="all">All Videos</TabsTrigger>
                <TabsTrigger value="interview">Interview Tips</TabsTrigger>
                <TabsTrigger value="resume">Resume Building</TabsTrigger>
                <TabsTrigger value="skills">Skill Development</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.length > 0 ? (
              filteredVideos.map(video => (
                <YouTubeVideo key={video.id} video={video} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-lg text-gray-500">No videos found matching your search. Try different keywords.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <CTASection />
    </>
  );
};

export default YouTube;
