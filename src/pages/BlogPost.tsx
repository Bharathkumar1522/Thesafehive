import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import ShareModal from '../components/ShareModal';
import { fetchBlogBySlug } from '../services/contentfulService';
import { renderRichText } from '../utils/renderRichText';
import { BlogPost as BlogPostType } from '../types/blog';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      if (!slug) return;

      try {
        const fetched = await fetchBlogBySlug(slug);
        if (!fetched) {
          setError('Post not found');
        } else {
          setPost(fetched);
        }
      } catch (err) {
        setError('Failed to load blog post.');
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [slug]);

  const handleShare = () => setShowShareModal(true);
  const shareUrl = window.location.href;

  if (loading) {
    return <div className="pt-32 text-center">Loading...</div>;
  }

  if (error || !post) {
    return (
      <div className="pt-32 pb-24 container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Article Not Found</h1>
        <p className="text-lg text-gray-700 mb-8">
          The article you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-white">
          <div className="container mx-auto px-4 pt-8 pb-4 md:pt-10 md:pb-6">
            <div className="max-w-3xl mx-auto">
              <Link to="/blog" className="inline-flex items-center text-green-600 mb-6">
                <ArrowLeft className="mr-2 h-5 w-5" /> Back to Blog
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <div className="flex gap-6 text-gray-600 mb-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>{post.category}</span>
                </div>
              </div>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="block rounded-xl w-full h-[20rem] md:h-[24rem] object-cover mb-6"
                />
              )}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="pt-0 pb-16 md:pt-0 md:pb-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg text-gray-700 [&>*:first-child]:mt-0">
              {post.body && renderRichText(post.body)}
            </div>

            {/* Share Section */}
            <div className="border-t border-gray-200 mt-12 pt-8 max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Found this helpful?</h3>
                  <p className="text-sm text-gray-600">Share this article with others who might benefit</p>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Share2 className="h-5 w-5" />
                  <span className="ml-2 font-medium">Share Article</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        url={shareUrl}
        title={post.title}
        description={post.excerpt || ''}
      />
    </>
  );
};

export default BlogPost;
