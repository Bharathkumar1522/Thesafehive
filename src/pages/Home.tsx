import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { ArrowRight, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createClient } from 'contentful';
import 'keen-slider/keen-slider.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useKeenSlider } from 'keen-slider/react';
import BlogCard from '../components/blog/BlogCard';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { SimpleBlogPost, ContentfulEntry } from '../types/blog';
import Button from '../components/ui/Button';
import { ComingSoonCTA } from "../components/layout/ComingSoonCTA";
import { DiscoverMissionCTA } from "../components/layout/DiscoverOurMissionCTA";
import type { Page } from '../types/navigation';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

const LifestyleCarousel = lazy(() => import('../components/layout/SafeLivingCarousel'));

const client = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN,
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
});

/** Build a sized, WebP Contentful URL (prevents CLS + cuts bytes) */
const cf = (url: string, w: number, h: number) => `${url}?fm=webp&w=${w}&h=${h}&fit=fill`;

// Tune these to your actual rendered slide size (match CSS height/width)
const SLIDER_W = 1000;
const SLIDER_H = 600;

const Home = ({ setCurrentPage }: HomePageProps) => {
  const [blogPosts, setBlogPosts] = useState<SimpleBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef<HTMLElement>(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 1, spacing: 0 },
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const fetchPosts = async () => {
    try {
      const entries = await client.getEntries({
        content_type: import.meta.env.VITE_CONTENT_TYPE,
        order: ['-sys.createdAt'],
        limit: 6,
        include: 2,
      });

      const posts: SimpleBlogPost[] = entries.items.map((item: ContentfulEntry) => {
        const fields = item.fields || {};
        const coverImage = fields.coverImage;
        // const imageAsset = Array.isArray(coverImage)
        //   ? coverImage[0]?.fields?.file?.url
        //   : coverImage?.fields?.file?.url;
        const imageAsset = coverImage?.[0]?.fields?.file?.url;

        const rawUrl = imageAsset ? `https:${imageAsset}` : '';
        const sizedWebp = rawUrl ? cf(rawUrl, SLIDER_W, SLIDER_H) : '/fallback.webp';

        return {
          id: item.sys.id,
          title: fields.title || 'Untitled',
          slug: fields.slug || '',
          excerpt: fields.excerpt || '',
          description: fields.description || fields.excerpt || '',
          imageUrl: sizedWebp,
          imageW: SLIDER_W as unknown as number,
          imageH: SLIDER_H as unknown as number,
          date: fields.date || item.sys.createdAt,
          category: fields.category || 'Wellness',
        } as SimpleBlogPost & { imageW: number; imageH: number };
      });

      setBlogPosts(posts);
    } catch (error) {
      console.error('❌ Error fetching blog posts:', error);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-16">
      {/* =======================
          HERO (no motion -> fixes LCP render delay)
         ======================= */}
      <section className="relative bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 pt-24 pb-16 md:pt-48 md:pb-32 flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-gray-900 mb-6 leading-tight"
          >
            You Deserve Products That <span className="text-green-600">Protect You</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8"
          >
            Join our community dedicated to chemical-free and eco-conscious living. Discover wellness tips, natural alternatives, and soon, our curated products.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button to="/about">
              Discover Our Mission
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link
              to="/blog"
              className="group px-8 py-3 bg-white text-green-600 font-medium rounded-xl border border-green-600 hover:bg-green-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center">
                Read Wellness Tips
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Decorative leaves: CSS-only spin, gated by prefers-reduced-motion */}
        <div
          className="hidden md:block absolute top-1/4 left-16 text-green-500 opacity-20 motion-safe:animate-[spin_20s_linear_infinite]"
          aria-hidden="true"
        >
          <Leaf className="h-16 w-16" />
        </div>
        <div
          className="hidden md:block absolute bottom-1/4 right-16 text-yellow-500 opacity-20 motion-safe:animate-[spin_25s_linear_infinite_reverse]"
          aria-hidden="true"
        >
          <Leaf className="h-16 w-16" />
        </div>
        {/* Bottom decorative element with animation */}
        <motion.div 
          className="absolute bottom-8 left-0 right-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex justify-center">
            <div className="flex items-center gap-4 text-gray-400">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300" />
              <Leaf className="w-6 h-6 text-[#4CAF50]" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Safe, Healthy & Happy Living Carousel */}
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50 bg-white relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4"
            >
              Safe, Healthy & Happy Living
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-700 max-w-2xl mx-auto"
            >
              Discover the joy of chemical-free living through beautiful moments of wellness, family time, and natural harmony.
            </motion.p>
          </div>
          <ErrorBoundary fallback={<p className="text-center text-red-500">Something went wrong in the carousel.</p>}>
            <Suspense fallback={<p className="text-center text-gray-500">Loading carousel...</p>}>
              <LifestyleCarousel />
            </Suspense>
          </ErrorBoundary>
        </div>
      </motion.section>

      {/* Coming Soon */}
      <ComingSoonCTA />

      {/* Wellness Tips Carousel */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-green-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="container mx-auto px-4"
        >
          <div className="flex justify-between items-center mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-heading font-bold text-gray-900"
            >
              Wellness Tips
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/blog"
                className="group flex items-center text-green-600 font-medium hover:text-green-700 transition-colors"
              >
                View All
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {loading ? (
            <p className="text-gray-600">Loading latest wellness tips...</p>
          ) : blogPosts.length === 0 ? (
            <p className="text-gray-600">No blog posts found.</p>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div
                ref={sliderRef}
                className="keen-slider w-full max-w-5xl relative overflow-hidden rounded-3xl"
                role="region"
                aria-label="Wellness tips carousel"
              >
                {blogPosts.map((post, idx) => (
                  <div
                    key={post.id}
                    className="keen-slider__slide relative w-full h-[360px] sm:h-[480px] md:h-[560px] lg:h-[600px] overflow-hidden rounded-3xl group cursor-pointer"
                  >
                    {/* Pass intrinsic dimensions so BlogCard -> Img can set width/height */}
                    <BlogCard
                      post={post}
                      variant="slider"
                      imgW={SLIDER_W}
                      imgH={SLIDER_H}
                      priority={
                        idx === currentSlide ||
                        idx === (currentSlide + 1) % blogPosts.length ||
                        idx === (currentSlide - 1 + blogPosts.length) % blogPosts.length
                      }
                    />
                  </div>
                ))}

                <button
                  onClick={() => instanceRef.current?.prev()}
                  className="hidden md:inline-flex absolute left-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center p-4 rounded-full bg-white/80 text-gray-900 hover:bg-white shadow-lg ring-1 ring-black/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/60"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={() => instanceRef.current?.next()}
                  className="hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center p-4 rounded-full bg-white/80 text-gray-900 hover:bg-white shadow-lg ring-1 ring-black/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/60"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {blogPosts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => instanceRef.current?.moveToIdx(idx)}
                    className={`rounded-full transition ${
                      currentSlide === idx
                        ? 'bg-green-600 w-3 h-3 md:scale-125 shadow'
                        : 'bg-gray-300 w-2.5 h-2.5 md:w-3 md:h-3'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                    aria-current={currentSlide === idx ? 'true' : 'false'}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Core Values */}
      {/* <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-heading font-bold text-center text-gray-900 mb-12"
          >
            Our Core Values
          </motion.h2>
          <CoreValuesGrid
            values={[
              {
                icon: Leaf,
                title: 'Sustainability',
                description: 'We are committed to sustainable practices that minimize environmental impact and preserve our planet for future generations.',
                color: 'green',
              },
              {
                icon: Heart,
                title: 'Health-Focused',
                description: 'Your wellbeing is our priority. We promote products and practices that support holistic health and chemical-free living.',
                color: 'yellow',
              },
              {
                icon: Shield,
                title: 'Transparency',
                description: "We believe in complete honesty about what goes into products and how they're made. No hidden ingredients, no secrets.",
                color: 'blue',
              },
            ]}
          />
        </div>
      </motion.section> */}

      {/* About CTA */}
      <DiscoverMissionCTA setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
