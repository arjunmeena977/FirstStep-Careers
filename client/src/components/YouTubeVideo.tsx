import { YouTubeVideo as VideoType } from '@/types';

interface YouTubeVideoProps {
  video: VideoType;
}

const YouTubeVideo = ({ video }: YouTubeVideoProps) => {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        <iframe 
          src={`https://www.youtube.com/embed/${video.videoId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-48"
        ></iframe>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2">{video.title}</h3>
        <p className="text-sm text-neutral-medium mb-3">{video.description}</p>
        <div className="flex items-center text-xs text-neutral-medium">
          <i className="fas fa-calendar-alt mr-1"></i>
          <span>{video.date}</span>
          <span className="mx-2">•</span>
          <i className="fas fa-eye mr-1"></i>
          <span>{video.views}</span>
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideo;
