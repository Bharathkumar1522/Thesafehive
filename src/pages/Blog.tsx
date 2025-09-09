import { useEffect, useMemo, useState, useDeferredValue, useCallback } from "react";
import { matchSorter } from "match-sorter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "../components/blog/BlogCard";
import { BlogPost, blogCategories } from "../types/blog";
import { fetchBlogPosts } from "../services/contentfulService";

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const deferredQuery = useDeferredValue(searchQuery);

  /** Load posts */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const fetched = await fetchBlogPosts(); // ← no args
        setPosts(fetched);
      } catch (e) {
        setError((e as Error).message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory((prev) => (category === prev ? "" : category));
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number, totalPages: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredByCategory = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((p) => p.category === selectedCategory);
  }, [posts, selectedCategory]);

  const filteredPosts = useMemo(() => {
    const q = deferredQuery.trim();
    if (!q) return filteredByCategory;
    return matchSorter(filteredByCategory, q, {
      keys: [
        "title",
        "excerpt",
        (item: BlogPost) => {
          const t = item.tags;
          if (!t) return "";
          return Array.isArray(t) ? t.join(" ") : String(t).replace(/[,|]+/g, " ");
        },
      ],
      threshold: matchSorter.rankings.CONTAINS,
    });
  }, [filteredByCategory, deferredQuery]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE)),
    [filteredPosts.length]
  );

  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const buttons: JSX.Element[] = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1); // ← const (eslint fix)
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

    buttons.push(
      <button
        key="prev"
        type="button"
        onClick={() => handlePageChange(currentPage - 1, totalPages)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
    );

    for (let i = start; i <= end; i++) {
      const active = i === currentPage;
      buttons.push(
        <button
          key={i}
          type="button"
          onClick={() => handlePageChange(i, totalPages)}
          className={`px-4 py-2 rounded-md border font-medium ${
            active ? "bg-green-600 text-white border-green-600" : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
          aria-current={active ? "page" : undefined}
          aria-label={`Page ${i}`}
        >
          {i}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        type="button"
        onClick={() => handlePageChange(currentPage + 1, totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    );

    return (
      <nav className="flex justify-center mt-12 gap-2" role="navigation" aria-label="Pagination">
        {buttons}
      </nav>
    );
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-[#1f2e2d] leading-tight mb-4">
              Your Guide to Safer, Healthier Living
            </h1>
            <p className="text-gray-700 mb-6">
              We decode chemicals in your home and reveal clean, safe alternatives.
            </p>
            <a
              href="#posts"
              className="inline-block bg-[#1f3e2f] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#295943] transition"
            >
              Start Reading
            </a>
          </div>

          <div className="md:w-1/2">
            <img
              src="https://res.cloudinary.com/dwmaznf4n/image/upload/f_auto,q_auto,w_640/HeroSection_Blog_z30kwi.webp"
              srcSet="
                https://res.cloudinary.com/dwmaznf4n/image/upload/f_auto,q_auto,w_480/HeroSection_Blog_z30kwi.webp 480w,
                https://res.cloudinary.com/dwmaznf4n/image/upload/f_auto,q_auto,w_640/HeroSection_Blog_z30kwi.webp 640w,
                https://res.cloudinary.com/dwmaznf4n/image/upload/f_auto,q_auto,w_960/HeroSection_Blog_z30kwi.webp 960w,
                https://res.cloudinary.com/dwmaznf4n/image/upload/f_auto,q_auto,w_1200/HeroSection_Blog_z30kwi.webp 1200w
              "
              sizes="(min-width: 1024px) 560px, (min-width: 768px) 480px, 90vw"
              alt="Mom and baby"
              className="rounded-xl shadow-lg object-cover w-full max-w-md mx-auto"
              width={960}
              height={640}
              loading="lazy"
              decoding="async"
              fetchPriority="low"   /* ← camelCase prop */
            />
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="container mx-auto px-4 mt-4">
        <div className="max-w-2xl w-full">
          <label htmlFor="blog-search" className="sr-only">Search articles</label>
          <div className="relative">
            <input
              id="blog-search"
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-300 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm placeholder:text-gray-400"
              inputMode="search"
              autoComplete="off"
              spellCheck={false}
            />
            <svg
              className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2.5a7.5 7.5 0 010 14.15z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="container mx-auto px-4" id="posts">
        <div className="flex gap-2 flex-wrap justify-center md:justify-start my-8" role="tablist" aria-label="Filter by category">
          {["All", ...blogCategories].map((category) => {
            const active = (category === "All" && !selectedCategory) || selectedCategory === category;
            const label = category === "All" ? "All categories" : category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category === "All" ? "" : category)}
                className={`px-4 py-2 rounded-full border ${
                  active ? "bg-[#dfeee3] text-[#1f3e2f] font-semibold" : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                role="tab"
                aria-selected={active}
                aria-pressed={active}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Post Grid */}
        {loading ? (
          <p className="text-center py-12 text-gray-600">Loading articles...</p>
        ) : error ? (
          <p className="text-center py-12 text-red-600">Error: {error}</p>
        ) : currentPosts.length === 0 ? (
          <p className="text-center py-12 text-gray-600">No articles found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination />

            {/* Disclaimer */}
            <div className="mt-12 text-center text-xs text-gray-500 max-w-2xl mx-auto px-4">
              <p>
                The blog is for informational purposes only. It is not medical advice. Always consult a professional.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
