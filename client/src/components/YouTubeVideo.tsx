import { useState, useEffect } from 'react';
import { YouTubeVideo as VideoType } from '@/types';

interface YouTubeVideoProps {
  video: VideoType;
}

const YouTubeVideo = ({ video }: YouTubeVideoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Set up YouTube iframe parameters with better options
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`;

  // Function to handle iframe load events
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Function to handle iframe error events
  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
      <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
            <i className="fas fa-exclamation-triangle text-yellow-500 text-3xl mb-2"></i>
            <p className="text-gray-600">Video unavailable. Please try again later.</p>
            <a 
              href={`https://www.youtube.com/watch?v=${video.videoId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 text-primary hover:text-blue-700 text-sm font-medium"
            >
              Open in YouTube <i className="fas fa-external-link-alt ml-1"></i>
            </a>
          </div>
        ) : (
          <iframe 
            src={youtubeEmbedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-48"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          ></iframe>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2 line-clamp-2">{video.title}</h3>
        <p className="text-sm text-neutral-medium mb-3 line-clamp-3">{video.description}</p>
        <div className="flex items-center text-xs text-neutral-medium">
          <i className="fas fa-calendar-alt mr-1"></i>
          <span>{video.date}</span>
          <span className="mx-2">•</span>
          <i className="fas fa-eye mr-1"></i>
          <span>{video.views}</span>
          <span className="mx-2">•</span>
          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 capitalize">
            {video.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideo;
