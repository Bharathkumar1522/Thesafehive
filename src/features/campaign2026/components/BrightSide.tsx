import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, ExternalLink, Clock, Tag, Sparkles } from 'lucide-react';

interface BrightSideProps {
    onBack: () => void;
}

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    imageUrl?: string;
    slug: string;
}

// Placeholder blog posts - will be replaced with Contentful API data
const placeholderPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Natural Home Decor Ideas',
        excerpt: 'Transform your space with beautiful, toxin-free decorations inspired by nature. Learn how to create stunning displays using natural branches, dried fruits, and organic materials.',
        category: 'Home & Decor',
        readTime: '5 min read',
        imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80',
        slug: 'natural-home-decor-ideas'
    },
    {
        id: '2',
        title: 'Non-Toxic Candle Guide',
        excerpt: 'Discover the safest candles for your home. We break down the differences between beeswax, soy, and paraffin candles, plus share our top picks for clean burning.',
        category: 'Products & Reviews',
        readTime: '7 min read',
        imageUrl: 'https://images.unsplash.com/photo-1602874801006-e26f1f0f8fd7?w=800&q=80',
        slug: 'non-toxic-candle-guide'
    },
    {
        id: '3',
        title: 'Eco-Friendly Packaging Ideas',
        excerpt: 'Say goodbye to wasteful packaging! Explore creative, sustainable ways to store and present items using fabric, kraft paper, and reusable materials that look absolutely stunning.',
        category: 'Sustainability',
        readTime: '4 min read',
        imageUrl: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80',
        slug: 'eco-friendly-packaging'
    },
    {
        id: '4',
        title: 'Safe Cleaning for Your Home',
        excerpt: 'Keep your home sparkling without harsh chemicals. Our guide to natural cleaning solutions will help you maintain a healthy environment while protecting your family\'s health.',
        category: 'Home & Living',
        readTime: '6 min read',
        imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80',
        slug: 'safe-home-cleaning'
    },
    {
        id: '5',
        title: 'Toxin-Free Toy Shopping Guide',
        excerpt: 'Navigate the toy aisle with confidence! Learn which materials to avoid, what certifications to look for, and our favorite safe toy brands for children of all ages.',
        category: 'Family & Kids',
        readTime: '8 min read',
        imageUrl: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
        slug: 'toxin-free-toy-shopping'
    },
    {
        id: '6',
        title: 'Healthy Everyday Recipes',
        excerpt: 'Enjoy delicious, nutritious meals every day! From sugar-free treats to organic beverages, these recipes will delight your family without compromising on health.',
        category: 'Food & Recipes',
        readTime: '10 min read',
        imageUrl: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&q=80',
        slug: 'healthy-everyday-recipes'
    }
];

export default function BrightSide({ onBack }: BrightSideProps) {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(placeholderPosts);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [isLoading, setIsLoading] = useState(false);

    const categories = ['All', 'Home & Decor', 'Products & Reviews', 'Sustainability', 'Home & Living', 'Family & Kids', 'Food & Recipes'];

    // TODO: Replace with actual Contentful API integration
    useEffect(() => {
        // Placeholder for Contentful API call
        // const fetchBlogPosts = async () => {
        //   setIsLoading(true);
        //   try {
        //     const response = await fetch('YOUR_CONTENTFUL_API_ENDPOINT');
        //     const data = await response.json();
        //     setBlogPosts(data.items);
        //   } catch (error) {
        //     console.error('Error fetching blog posts:', error);
        //   } finally {
        //     setIsLoading(false);
        //   }
        // };
        // fetchBlogPosts();
    }, []);

    const filteredPosts = selectedCategory === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    const handleBlogClick = (slug: string) => {
        // Redirect to THESAFEHIVE blog
        window.open(`https://www.thesafehive.com/blog/${slug}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#ECFDF5] via-[#D1FAE5] to-[#A7F3D0]">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImhleGFnb24iIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTMwIDBsMTUgOC42NnYxNy4zMkwzMCAzNC42NCAxNSAyNlY4LjY2eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDE2LDE4NSwxMjksMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2hleGFnb24pIi8+PC9zdmc+')] opacity-40 pointer-events-none" />

            <div className="relative z-10">
                <header className="border-b border-[#59a75c]/30 bg-white/60 backdrop-blur-md">
                    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-[#0C4023] hover:text-[#59a75c] transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-mono text-sm">EXIT GUIDE</span>
                        </button>
                        <div className="text-center">
                            <div className="text-[#59a75c] font-mono text-sm">YOUR WELLNESS JOURNEY</div>
                            <h1 className="text-2xl font-bold text-[#0C4023]">Safe Living Guide</h1>
                        </div>
                        <div className="flex items-center gap-2 text-[#0C4023] font-mono text-sm">
                            <BookOpen className="w-4 h-4" />
                            <span>{blogPosts.length} Articles</span>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-6 py-12">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#59a75c]/10 border border-[#59a75c]/30 rounded-full mb-4">
                                <Sparkles className="w-4 h-4 text-[#59a75c]" />
                                <span className="text-[#0C4023] text-sm font-semibold">Expert Wellness Tips</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#0C4023] mb-4">
                                Your Guide to Safe Living
                            </h2>
                            <p className="text-xl text-[#0C4023]/70 max-w-3xl mx-auto leading-relaxed">
                                Discover practical tips, safe product recommendations, and expert advice for living
                                naturally and toxin-free every day.
                            </p>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-3 justify-center mb-12">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-[#59a75c] text-white shadow-lg'
                                        : 'bg-white/80 text-[#0C4023] border border-[#59a75c]/20 hover:border-[#59a75c] hover:bg-[#59a75c]/10'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Blog Grid */}
                        {isLoading ? (
                            <div className="text-center py-12">
                                <div className="inline-block w-12 h-12 border-4 border-[#59a75c]/30 border-t-[#59a75c] rounded-full animate-spin" />
                                <p className="text-[#0C4023]/70 mt-4">Loading articles...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPosts.map((post, index) => (
                                    <div
                                        key={post.id}
                                        onClick={() => handleBlogClick(post.slug)}
                                        className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden border border-[#59a75c]/20 hover:border-[#59a75c] hover:shadow-2xl hover:shadow-[#59a75c]/20 transition-all duration-300 cursor-pointer animate-fadeIn"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        {/* Image */}
                                        {post.imageUrl && (
                                            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#59a75c]/20 to-[#6EBF73]/20">
                                                <img
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute top-3 right-3">
                                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#0C4023] text-xs font-semibold rounded-full">
                                                        {post.category}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-[#0C4023] mb-3 group-hover:text-[#59a75c] transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-[#0C4023]/70 leading-relaxed mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            {/* Meta */}
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-1 text-[#0C4023]/60">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{post.readTime}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-[#59a75c] group-hover:gap-2 transition-all">
                                                    <span className="font-medium">Read More</span>
                                                    <ExternalLink className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Border */}
                                        <div className="h-1 bg-gradient-to-r from-[#59a75c]/0 via-[#59a75c] to-[#59a75c]/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* CTA Section */}
                        <div className="mt-16 bg-gradient-to-br from-white/90 to-[#ECFDF5]/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-[#59a75c]/30 shadow-xl">
                            <div className="text-center">
                                <h3 className="text-3xl font-bold text-[#0C4023] mb-4">
                                    Want More Toxin-Free Living Tips?
                                </h3>
                                <p className="text-[#0C4023]/80 leading-relaxed mb-6 max-w-2xl mx-auto">
                                    Visit THESAFEHIVE.com for our complete library of articles, product reviews,
                                    and expert guidance on living a healthier, toxin-free life all year round.
                                </p>
                                <a
                                    href="https://www.thesafehive.com/blog"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#59a75c] text-white font-semibold rounded-lg hover:bg-[#3d7a40] transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <BookOpen className="w-5 h-5" />
                                    <span>Visit THESAFEHIVE Blog</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
}
