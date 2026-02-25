/**
 * BlogPost.tsx — Redesigned to match Home styling.
 * Vanilla/terracotta palette · font-display headlines · EditorialReveal animations
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ShareModal from '../components/ui/modals/ShareModal';
import { fetchBlogBySlug } from '../services/contentfulService';
import { renderRichText } from '../utils/renderRichText';
import { BlogPost as BlogPostType } from '../types/blog';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { TornPaper } from '../components/ui/OrganicSectionDividers';

// ─── Palette & texture ────────────────────────────────────────────────────────
const VANILLA = '#FAF5E4';
const SOFT_SAND = '#F0E7DB';
const TERRACOTTA = '#B85C38';
// ─── Paper texture (replaced with index.css pattern) ────────
const paperStyle: React.CSSProperties = {};

// ═════════════════════════════════════════════════════════════════════════════
const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const fetched = await fetchBlogBySlug(slug);
        if (!fetched) setError('Post not found');
        else setPost(fetched);
      } catch { setError('Failed to load blog post.'); }
      finally { setLoading(false); }
    })();
  }, [slug]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div
        className="pt-32 min-h-screen flex items-center justify-center"
        style={{ backgroundColor: VANILLA }}
      >
        <div className="text-center">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="font-mono text-sm tracking-widest uppercase"
            style={{ color: 'rgba(34,33,31,0.30)' }}
          >
            Loading…
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Error / not found state ────────────────────────────────────────────────
  if (error || !post) {
    return (
      <div
        className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: VANILLA }}
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
        <div className="text-center relative z-10">
          <p className="font-mono text-[10px] tracking-[0.24em] uppercase mb-6" style={{ color: 'rgba(184,92,56,0.5)' }}>
            404 — Not Found
          </p>
          <h1
            className="font-display tracking-widest text-charcoal leading-none mb-8"
            style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}
          >
            ARTICLE<br /><span className="text-terracotta">NOT FOUND</span>
          </h1>
          <p className="font-light text-lg mb-10" style={{ color: 'rgba(34,33,31,0.50)' }}>
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-3 font-display tracking-widest text-base px-8 py-4 rounded-full no-underline transition-all duration-300"
            style={{ background: TERRACOTTA, color: VANILLA, boxShadow: '0 6px 28px rgba(184,92,56,0.22)' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#A34E2F')}
            onMouseLeave={e => (e.currentTarget.style.background = TERRACOTTA)}
          >
            <ArrowLeft className="h-4 w-4" /> BACK TO BLOG
          </Link>
        </div>
      </div>
    );
  }

  // ── Full post ──────────────────────────────────────────────────────────────
  return (
    <>
      <div className="pt-16" style={{ backgroundColor: VANILLA }}>
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />

        {/* ══════════════════ HEADER ══════════════════ */}
        <section
          className="relative overflow-hidden pt-16 pb-12"
          style={{ backgroundColor: VANILLA }}
        >
          <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(184,92,56,0.04) 0%, transparent 60%)' }}
          />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto">
              {/* Back link */}
              <motion.div
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-10"
              >
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase no-underline transition-colors duration-200"
                  style={{ color: 'rgba(34,33,31,0.38)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = TERRACOTTA)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(34,33,31,0.38)')}
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Insights
                </Link>
              </motion.div>

              {/* Category + date row */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-4 mb-6"
              >
                {post.category && (
                  <span
                    className="font-mono text-[10px] tracking-[0.24em] uppercase px-3 py-1.5 rounded-full border"
                    style={{ borderColor: 'rgba(184,92,56,0.26)', color: TERRACOTTA }}
                  >
                    {post.category}
                  </span>
                )}
                <span
                  className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase"
                  style={{ color: 'rgba(34,33,31,0.34)' }}
                >
                  <Calendar className="h-3 w-3" />
                  {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </motion.div>

              {/* Title */}
              <div className="overflow-hidden mb-8">
                <motion.h1
                  initial={{ y: '101%' }} animate={{ y: '0%' }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
                  className="font-display leading-[1.05] tracking-wide text-charcoal"
                  style={{ fontSize: 'clamp(2rem,5vw,4rem)' }}
                >
                  {post.title}
                </motion.h1>
              </div>

              {/* Excerpt */}
              {post.excerpt && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="font-light text-lg leading-relaxed mb-10"
                  style={{ color: 'rgba(34,33,31,0.52)' }}
                >
                  {post.excerpt}
                </motion.p>
              )}

              {/* Tags */}
              {post.tags && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap gap-2 mb-10"
                >
                  {(Array.isArray(post.tags)
                    ? post.tags
                    : String(post.tags).split(/[,|]+/)
                  ).filter(Boolean).map((tag: string) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border"
                      style={{ borderColor: 'rgba(34,33,31,0.10)', color: 'rgba(34,33,31,0.40)' }}
                    >
                      <Tag className="h-2.5 w-2.5" /> {tag.trim()}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Hero image */}
              {post.imageUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-56 md:h-80 object-cover rounded-2xl"
                    style={{ border: '1px solid rgba(34,33,31,0.06)', boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════ BODY ══════════════════ */}
        <section
          className="relative py-16"
          style={{ backgroundColor: VANILLA }}
          aria-label="Article content"
        >
          <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto">
              {/* Rich text body */}
              <div
                className="prose prose-lg max-w-none"
                style={{
                  // Tailwind prose override via CSS variables
                  '--tw-prose-body': 'rgba(34,33,31,0.72)',
                  '--tw-prose-headings': '#22211F',
                  '--tw-prose-links': TERRACOTTA,
                  '--tw-prose-bold': '#22211F',
                  '--tw-prose-hr': 'rgba(34,33,31,0.10)',
                  '--tw-prose-quotes': '#22211F',
                  '--tw-prose-quote-borders': TERRACOTTA,
                  '--tw-prose-captions': 'rgba(34,33,31,0.44)',
                  '--tw-prose-code': '#22211F',
                  '--tw-prose-bullets': TERRACOTTA,
                  '--tw-prose-counters': TERRACOTTA,
                } as React.CSSProperties}
              >
                {post.body && renderRichText(post.body)}
              </div>

              {/* Share section */}
              <ScrollReveal variant="fade" delay={0.1}>
                <div
                  className="border-t mt-16 pt-10"
                  style={{ borderColor: 'rgba(34,33,31,0.08)' }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                      <h3 className="font-heading text-charcoal text-xl mb-1">Found this helpful?</h3>
                      <p className="font-light text-sm" style={{ color: 'rgba(34,33,31,0.50)' }}>
                        Share this article with others who might benefit
                      </p>
                    </div>
                    <button
                      onClick={() => setShowShareModal(true)}
                      className="inline-flex items-center gap-3 font-display tracking-widest text-sm px-7 py-3.5 rounded-full transition-all duration-300 group flex-shrink-0"
                      style={{ background: TERRACOTTA, color: VANILLA, boxShadow: '0 4px 20px rgba(184,92,56,0.20)' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#A34E2F')}
                      onMouseLeave={e => (e.currentTarget.style.background = TERRACOTTA)}
                    >
                      <Share2 className="h-4 w-4" /> SHARE
                    </button>
                  </div>
                </div>
              </ScrollReveal>

              {/* Disclaimer */}
              <ScrollReveal variant="fade" delay={0.15}>
                <div
                  className="mt-10 rounded-xl p-5 border"
                  style={{ background: 'rgba(34,33,31,0.02)', borderColor: 'rgba(34,33,31,0.07)' }}
                >
                  <p className="font-mono text-xs leading-relaxed" style={{ color: 'rgba(34,33,31,0.36)' }}>
                    <strong style={{ color: 'rgba(34,33,31,0.50)', fontWeight: 600 }}>Disclaimer:</strong> This article is for
                    informational purposes only. It does not constitute medical advice. Always consult a qualified professional.
                  </p>
                </div>
              </ScrollReveal>

              {/* Back to blog */}
              <ScrollReveal variant="slide-up" delay={0.1}>
                <div className="mt-12">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase no-underline transition-colors duration-200"
                    style={{ color: 'rgba(34,33,31,0.38)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = TERRACOTTA)}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(34,33,31,0.38)')}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to all insights
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>

      {/* ── Torn paper: vanilla → soft sand (Footer transition) ─────────────── */}
      <TornPaper from={VANILLA} to={SOFT_SAND} height={72} />

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
