import { memo, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface HeroVideoProps {
  src: string;
  className?: string;
  title?: string;
  autoplay?: boolean;
  controls?: boolean;
}

const HeroVideo = memo(({ 
  src, 
  className = '', 
  title = 'Video player',
  autoplay = true,
  controls = true
}: HeroVideoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Extract video ID from various YouTube URL formats
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Check if the URL is from YouTube
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  const videoId = isYouTube ? getYouTubeId(src) : null;
  
  // Handle video load events
  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error('Error loading video');
  };

  // YouTube iframe parameters
  const youTubeParams = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    mute: '1',
    rel: '0',
    showinfo: '0',
    loop: '1',
    controls: controls ? '1' : '0',
    enablejsapi: '1',
    modestbranding: '1',
    playsinline: '1',
    disablekb: '1',
    cc_load_policy: '0',
    iv_load_policy: '3',
    origin: window.location.origin
  });

  // Generate YouTube embed URL
  const youTubeUrl = videoId 
    ? `https://www.youtube.com/embed/${videoId}?${youTubeParams.toString()}`
    : '';

  // Handle direct video sources
  if (!isYouTube) {
    return (
      <div className={`relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
        )}
        <video
          className={`w-full h-full object-cover ${isLoading ? 'invisible' : 'visible'}`}
          autoPlay={autoplay}
          muted
          loop
          playsInline
          controls={controls}
          onLoadedData={handleLoad}
          onError={handleError}
          title={title}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Handle YouTube videos
  return (
    <div className={`relative aspect-video w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      )}
      {hasError ? (
        <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-600">
          Failed to load video
        </div>
      ) : (
        <iframe
          className={`w-full h-full ${isLoading ? 'invisible' : 'visible'}`}
          src={youTubeUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          frameBorder="0"
        />
      )}
    </div>
  );
});

HeroVideo.displayName = 'HeroVideo';

export default HeroVideo;