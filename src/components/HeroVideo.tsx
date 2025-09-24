import { memo } from 'react';

interface HeroVideoProps {
  src: string;
  className?: string;
}

const HeroVideo = memo(({ src, className = '' }: HeroVideoProps) => {
  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
  const isDrive = src.includes("drive.google.com");
  const isDirectVideo =
    src.endsWith(".mp4") || src.endsWith(".webm") || src.includes("cloudinary");

  const containerClasses = `mt-6 w-full max-w-3xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg ${className}`;

  if (isYouTube) {
    const videoId = src.includes("embed")
      ? src.split("/embed/")[1]
      : src.split("youtu.be/")[1]?.split("?")[0] || "";

    return (
      <div className={containerClasses}>
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0&playsinline=1&loop=1&playlist=${videoId}`}
          title="YouTube Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer"
          width="100%"
          height="100%"
        />
      </div>
    );
  }

  if (isDrive) {
    const fileId = src.match(/[-\w]{25,}/)?.[0];
    return (
      <div className={containerClasses}>
        <iframe
          className="w-full h-full"
          src={`https://drive.google.com/file/d/${fileId}/preview`}
          allow="autoplay"
          allowFullScreen
          title="Drive Video"
          loading="lazy"
          referrerPolicy="no-referrer"
          width="100%"
          height="100%"
        />
      </div>
    );
  }

  if (isDirectVideo) {
    return (
      <div className={containerClasses}>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          controls
          loop
          playsInline
          preload="none"
          width="100%"
          height="100%"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return null;
});

HeroVideo.displayName = 'HeroVideo';

export default HeroVideo;
