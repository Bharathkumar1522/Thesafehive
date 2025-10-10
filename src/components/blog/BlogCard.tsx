import { Share2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost, SimpleBlogPost } from '../../types/blog';
import ShareModal from '../ui/modals/ShareModal';
import Img from '../ui/image';

interface BlogCardProps {
  post: SimpleBlogPost | BlogPost;
  variant?: 'default' | 'slider';
  /** Optional explicit intrinsic size for the image (caller can pass for CLS safety) */
  imgW?: number;
  imgH?: number;
  /** If true, load image with high priority (eager) -- useful for current/adjacent slides */
  priority?: boolean;
}

const BlogCard = ({ post, variant = 'default', imgW, imgH, priority = false }: BlogCardProps) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareModal(true);
  };

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/blog/${post.slug}`
      : `/blog/${post.slug}`;

  const imageSrc = post.imageUrl || '/fallback.webp';
  const category = post.category || 'Wellness';
  const readTime = post.readtime || '3 min read';

  // Intrinsic size defaults (kept realistic for your layouts)
  // Slider cards are ~1000x600 (aligned with Home.tsx)
  const sliderW = imgW ?? 1000;
  const sliderH = imgH ?? 600;

  // Default card image area is h-56 (~224px tall). Assume 16:9 to compute width.
  const cardH = imgH ?? 224;        // ~h-56
  const cardW = imgW ?? Math.round(cardH * (16 / 9)); // ~398px

  return (
    <>
      {variant === 'slider' ? (
        <Link
          to={`/blog/${post.slug}`}
          className="block w-full h-full group relative overflow-hidden rounded-3xl"
        >
          <Img
            src={imageSrc}
            alt={post.title || 'Blog cover image'}
            w={sliderW}
            h={sliderH}
            eager={priority}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <span className="absolute top-4 left-4 bg-white text-sm px-3 py-1 rounded-full text-green-700 font-medium shadow">
            {category}
          </span>

          {/* Stronger overlay for readability */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/85 via-black/50 to-transparent p-6 text-white">
            <h3 className="text-3xl font-bold mb-2 line-clamp-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]  text-white/90">
              {post.title}
            </h3>
            <p className="text-lg line-clamp-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">{post.excerpt}</p>
            {/* {post.description && (
              <p className="text-sm mt-2 text-white/90 line-clamp-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">{post.description}</p>
            )} */}
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-white/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">{readTime}</span>
              <button
                onClick={handleShare}
                className="flex items-center text-white hover:text-green-200 transition-colors"
                title="Copy blog link"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </button>
            </div>
          </div>
        </Link>
      ) : (
        <div className="group block bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition">
          <div className="relative">
            <Img
              src={imageSrc}
              alt={post.title || 'Blog cover image'}
              w={cardW}
              h={cardH}
              className="w-full h-56 object-cover"
            />
            <span className="absolute top-2 left-2 bg-white text-sm px-3 py-1 rounded-full text-green-700 font-medium shadow">
              {category}
            </span>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:underline line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.excerpt}</p>
            <div className="mt-4 text-xs text-gray-500">{readTime}</div>
            <div className="flex justify-between items-center mt-4">
              <Link
                to={`/blog/${post.slug}`}
                className="text-green-600 font-medium text-sm hover:underline"
              >
                Read This
              </Link>
              <button
                onClick={handleShare}
                className="flex items-center text-gray-500 hover:text-green-600 text-sm transition-colors p-2 -m-2 rounded-lg hover:bg-green-50"
                title="Copy blog link"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        url={shareUrl}
        title={post.title}
        description={post.excerpt}
      />
    </>
  );
};

export default BlogCard;
