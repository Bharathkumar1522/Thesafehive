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
  const sliderW = imgW ?? 1000;
  const sliderH = imgH ?? 600;

  const cardH = imgH ?? 224;
  const cardW = imgW ?? Math.round(cardH * (16 / 9));

  return (
    <>
      {variant === 'slider' ? (
        <Link
          to={`/blog/${post.slug}`}
          className="block w-full h-full group relative overflow-hidden rounded-[2rem] no-underline"
        >
          <Img
            src={imageSrc}
            alt={post.title || 'Blog cover image'}
            w={sliderW}
            h={sliderH}
            eager={priority}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <span className="absolute top-4 left-4 bg-cream/90 backdrop-blur-sm text-sm px-4 py-1.5 rounded-full text-umber font-medium shadow-sm border border-taupe/10">
            {category}
          </span>

          {/* Overlay */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-charcoal/85 via-charcoal/50 to-transparent p-6 text-cream">
            <h3 className="text-3xl font-heading font-medium mb-2 line-clamp-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] text-cream/90">
              {post.title}
            </h3>
            <p className="text-lg line-clamp-2 text-cream/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">{post.excerpt}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-cream/70">{readTime}</span>
              <button
                onClick={handleShare}
                className="flex items-center text-cream/80 hover:text-cream transition-colors duration-300"
                title="Copy blog link"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </button>
            </div>
          </div>
        </Link>
      ) : (
        <div className="group block bg-cream rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 border border-taupe/10 hover:-translate-y-1">
          <div className="relative">
            <Img
              src={imageSrc}
              alt={post.title || 'Blog cover image'}
              w={cardW}
              h={cardH}
              className="w-full h-56 object-cover"
            />
            <span className="absolute top-3 left-3 bg-cream/90 backdrop-blur-sm text-sm px-4 py-1.5 rounded-full text-umber font-medium shadow-sm border border-taupe/10">
              {category}
            </span>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-heading font-medium text-charcoal group-hover:text-umber transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-charcoal/70 mt-3 line-clamp-3 leading-relaxed">{post.excerpt}</p>
            <div className="mt-4 text-xs text-taupe">{readTime}</div>
            <div className="flex justify-between items-center mt-5 pt-4 border-t border-taupe/10">
              <Link
                to={`/blog/${post.slug}`}
                className="text-umber font-medium text-sm hover:text-forest transition-colors duration-300 no-underline"
              >
                Read This →
              </Link>
              <button
                onClick={handleShare}
                className="flex items-center text-taupe hover:text-umber text-sm transition-colors duration-300 p-2 -m-2 rounded-xl hover:bg-taupe/10"
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
