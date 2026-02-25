/**
 * Blog.tsx — Redesigned to match Home styling.
 * Vanilla/terracotta palette · font-display headlines · section rule dividers · ScrollReveal
 */
import { useEffect, useMemo, useState, useDeferredValue, useCallback } from 'react';
import { matchSorter } from 'match-sorter';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import BlogCard from '../components/blog/BlogCard';
import { BlogPost, blogCategories } from '../types/blog';
import { fetchBlogPosts } from '../services/contentfulService';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { motion } from 'framer-motion';
import { TornPaper } from '../components/ui/OrganicSectionDividers';

// ─── Paper texture (replaced with index.css pattern) ────────
const VANILLA = '#FAF5E4';
const SOFT_SAND = '#F0E7DB';
const TERRACOTTA = '#B85C38';
const paperStyle: React.CSSProperties = {};

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const deferredQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true); setError(null);
        setPosts(await fetchBlogPosts());
      } catch (e) {
        setError((e as Error).message || 'Failed to load posts');
      } finally { setLoading(false); }
    })();
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(prev => (category === prev ? '' : category));
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number, total: number) => {
    if (page < 1 || page > total) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredByCategory = useMemo(() =>
    selectedCategory ? posts.filter(p => p.category === selectedCategory) : posts,
    [posts, selectedCategory]);

  const filteredPosts = useMemo(() => {
    const q = deferredQuery.trim();
    if (!q) return filteredByCategory;
    return matchSorter(filteredByCategory, q, {
      keys: ['title', 'excerpt', (item: BlogPost) => {
        const t = item.tags;
        if (!t) return '';
        return Array.isArray(t) ? t.join(' ') : String(t).replace(/[,|]+/g, ' ');
      }],
      threshold: matchSorter.rankings.CONTAINS,
    });
  }, [filteredByCategory, deferredQuery]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE)), [filteredPosts.length]);
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Pagination
  const Pagination = () => {
    if (totalPages <= 1) return null;
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

    return (
      <nav className="flex justify-center mt-16 gap-2" role="navigation" aria-label="Pagination">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1, totalPages)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-xl border transition-all duration-200 disabled:opacity-40"
          style={{ borderColor: 'rgba(34,33,31,0.14)', color: 'rgba(34,33,31,0.54)' }}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(i => {
          const active = i === currentPage;
          return (
            <button
              key={i} type="button"
              onClick={() => handlePageChange(i, totalPages)}
              className="px-4 py-2 rounded-xl border font-mono text-sm transition-all duration-200"
              style={{
                background: active ? '#22211F' : 'transparent',
                color: active ? VANILLA : 'rgba(34,33,31,0.54)',
                borderColor: active ? '#22211F' : 'rgba(34,33,31,0.14)',
              }}
              aria-current={active ? 'page' : undefined}
              aria-label={`Page ${i}`}
            >{i}</button>
          );
        })}
        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1, totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-xl border transition-all duration-200 disabled:opacity-40"
          style={{ borderColor: 'rgba(34,33,31,0.14)', color: 'rgba(34,33,31,0.54)' }}
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </nav>
    );
  };

  return (
    <div className="pt-16" style={{ backgroundColor: VANILLA }}>
      <div className="absolute inset-0 pointer-events-none" style={paperStyle} />

      {/* ══════════════════ HERO ══════════════════ */}
      <section
        className="relative overflow-hidden pt-20 pb-28"
        style={{ backgroundColor: VANILLA }}
        aria-label="Blog hero"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(184,92,56,0.05) 0%, transparent 60%)' }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-mono text-[10px] tracking-[0.28em] uppercase mb-6 text-center"
            style={{ color: 'rgba(184,92,56,0.5)' }}
          >
            Knowledge Base
          </motion.p>

          <div className="overflow-hidden text-center mb-4">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: '0%' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display leading-none tracking-widest text-charcoal"
              style={{ fontSize: 'clamp(3.5rem,10vw,10rem)' }}
            >
              INSIGHTS
            </motion.h1>
          </div>
          <div className="overflow-hidden text-center mb-12">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
              className="font-display leading-none tracking-widest text-terracotta"
              style={{ fontSize: 'clamp(1.6rem,4vw,3.5rem)' }}
            >
              &amp; GUIDES
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="max-w-lg mx-auto font-light leading-relaxed text-lg text-center mb-14"
            style={{ color: 'rgba(34,33,31,0.46)' }}
          >
            We decode chemicals in your home and reveal evidence-based, safer alternatives.
            Informational only — not medical advice.
          </motion.p>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <img
              src="https://res.cloudinary.com/dwmaznf4n/image/upload/f_auto,q_auto,w_960/HeroSection_Blog_z30kwi.webp"
              srcSet="
                https://res.cloudinary.com/dwmaznf4n/image/upload/f_auto,q_auto,w_480/HeroSection_Blog_z30kwi.webp 480w,
                https://res.cloudinary.com/dwmaznf4n/image/upload/f_auto,q_auto,w_960/HeroSection_Blog_z30kwi.webp 960w,
                https://res.cloudinary.com/dwmaznf4n/image/upload/f_auto,q_auto,w_1280/HeroSection_Blog_z30kwi.webp 1280w
              "
              sizes="(min-width: 768px) 720px, 90vw"
              alt="Mother and child illustrating safe everyday choices"
              className="w-full h-56 md:h-80 object-cover rounded-2xl"
              style={{ border: '1px solid rgba(34,33,31,0.06)', boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}
              width={960} height={540}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ POSTS GRID ══════════════════ */}
      <section
        id="posts"
        className="relative py-20"
        style={{ backgroundColor: VANILLA }}
        aria-label="Articles"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
        <div className="container mx-auto px-6 relative z-10">

          {/* Section label */}
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-1 h-px" style={{ background: 'rgba(34,33,31,0.07)' }} />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(34,33,31,0.22)' }}>All Articles</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(34,33,31,0.07)' }} />
          </div>

          {/* Search */}
          <ScrollReveal variant="slide-up">
            <div className="max-w-xl mb-8">
              <label htmlFor="blog-search" className="sr-only">Search articles</label>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                  style={{ color: 'rgba(34,33,31,0.28)' }}
                  strokeWidth={1.5}
                />
                <input
                  id="blog-search"
                  type="text"
                  placeholder="Search articles…"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-5 py-3 rounded-xl font-mono text-sm bg-white border focus:outline-none transition-colors duration-200"
                  style={{
                    borderColor: 'rgba(34,33,31,0.10)',
                    color: '#22211F',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                  onFocus={e => (e.target.style.borderColor = TERRACOTTA)}
                  onBlur={e => (e.target.style.borderColor = 'rgba(34,33,31,0.10)')}
                  inputMode="search"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Category filters */}
          <ScrollReveal variant="fade" delay={0.05}>
            <div className="flex gap-2 flex-wrap mb-12" role="tablist" aria-label="Filter by category">
              {['All', ...blogCategories].map(category => {
                const active = (category === 'All' && !selectedCategory) || selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category === 'All' ? '' : category)}
                    className="px-5 py-2 rounded-full font-mono text-xs tracking-widest uppercase border transition-all duration-200"
                    style={{
                      background: active ? '#22211F' : 'transparent',
                      color: active ? VANILLA : 'rgba(34,33,31,0.46)',
                      borderColor: active ? '#22211F' : 'rgba(34,33,31,0.14)',
                    }}
                    role="tab"
                    aria-selected={active}
                  >
                    {category === 'All' ? 'All' : category}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="h-64 rounded-2xl animate-pulse"
                  style={{ background: 'rgba(34,33,31,0.06)' }}
                />
              ))}
            </div>
          ) : error ? (
            <p className="text-center py-16 font-mono text-sm" style={{ color: TERRACOTTA }}>
              Could not load articles. Please try again later.
            </p>
          ) : currentPosts.length === 0 ? (
            <p className="text-center py-16 font-mono text-sm" style={{ color: 'rgba(34,33,31,0.36)' }}>
              No articles found.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
              <Pagination />
              <div className="mt-16 text-center">
                <p className="font-mono text-xs" style={{ color: 'rgba(34,33,31,0.30)' }}>
                  For informational purposes only — not medical advice. Always consult a qualified professional.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Torn paper: vanilla → soft sand (Footer transition) ─────────────── */}
      <TornPaper from={VANILLA} to={SOFT_SAND} height={72} />
    </div>
  );
};

export default Blog;
