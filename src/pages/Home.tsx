/**
 * Home.tsx — Performance-optimised, verified-content-only version.
 *
 * Performance choices:
 *  - paperStyle defined once outside component (no re-creation on render)
 *  - parallax scroll only on hero (one useScroll hook), removed elsewhere
 *  - SVA-1 demo removed — replaces with honest "coming soon / waitlist" framing
 *  - Fake counter stats removed — replaced with verified mission statements
 *  - Fake % bar-chart data removed — replaced with real regulatory references
 *  - ScrollReveal y offset reduced 60→28 for snappier reveal
 *  - All will-change: transform applied via Tailwind .will-change-transform only
 *    on elements that actually animate in 3-D space
 *  - framer-motion `useTransform` kept only on hero blobs (one pair)
 *  - Blog carousel stays (Contentful data = real)
 *  - GameHub stays (real interactive content)
 */

import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Search, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Leaf } from 'lucide-react';
import { createClient } from 'contentful';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import { MagneticButton } from '../components/animations/MagneticButton';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { Parallax } from '../components/animations/Parallax';
import { TornPaper } from '../components/ui/OrganicSectionDividers';
import BlogCard from '../components/blog/BlogCard';
import { SimpleBlogPost } from '../types/blog';

// ─── Contentful ────────────────────────────────────────────────────────────────
const client = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN,
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
});

interface ContentfulEntry { sys: { id: string; createdAt: string }; fields: Record<string, unknown>; }
const cfUrl = (url: string, w: number, h: number) =>
  `${url}?w=${w}&h=${h}&fm=webp&fit=fill&q=80`;

const SLIDER_W = 800;
const SLIDER_H = 520;

// ─── Palette ──────────────────────────────────────────────────────────────────
const VANILLA = '#F8FAFC';    // warm cream (hero, main body)
const SOFT_SAGE = '#E0E7FF';  // soft sage green — trust + safety
const SOFT_SAND = '#F1F5F9';  // warm grounding beige
const TERRACOTTA = '#06B6D4'; // red-brown accent
const CHARCOAL = '#0F172A';

// ─── Paper grain — defined OUTSIDE component so it's never re-allocated ────────
// ─── Replaced heavy feTurbulence paper with light CSS pattern in index.css ───
const paperStyle: React.CSSProperties = {};

// ─── Typewriter (only for search placeholder — lightweight) ───────────────────
const PLACEHOLDERS = [
  'e.g. "Dove Body Wash"…',
  'e.g. "Tide Laundry Pods"…',
  'e.g. "Neutrogena Sunscreen"…',
];
function useTypewriter(strings: string[], speed = 65, pauseMs = 2000) {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = strings[idx];
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.slice(0, ci + 1));
        if (ci + 1 === cur.length) setTimeout(() => setDel(true), pauseMs);
        else setCi(c => c + 1);
      } else {
        setText(cur.slice(0, ci - 1));
        if (ci === 0) { setDel(false); setIdx(i => (i + 1) % strings.length); }
        else setCi(c => c - 1);
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, ci, del, idx, strings, speed, pauseMs]);
  return text;
}

// ═════════════════════════════════════════════════════════════════════════════
const Home = () => {
  // ── Blog state ──────────────────────────────────────────────────────────────
  const [blogPosts, setBlogPosts] = useState<SimpleBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(0);

  // ── Search UI state (product lookup — links to real future tool) ────────────
  const [query, setQuery] = useState('');
  const placeholder = useTypewriter(PLACEHOLDERS);

  // ── Hero parallax — one hook only ──────────────────────────────────────────
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  // Only translate the two decorative blobs — GPU-composited opacity/transform only
  const blobTopY = useTransform(heroScroll, [0, 1], ['0px', '-60px']);
  const blobBotY = useTransform(heroScroll, [0, 1], ['0px', '50px']);
  const textY = useTransform(heroScroll, [0, 1], ['0%', '14%']);

  // ── Blog carousel ── ────────────────────────────────────────────────────────
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 1.15, spacing: 20 },
    breakpoints: {
      '(min-width: 640px)': { slides: { perView: 1.7, spacing: 24 } },
      '(min-width: 1024px)': { slides: { perView: 2.5, spacing: 32 } },
    },
    loop: true,
    slideChanged: s => setSlide(s.track.details.rel),
  });

  useEffect(() => {
    (async () => {
      try {
        const entries = await client.getEntries({
          content_type: import.meta.env.VITE_CONTENT_TYPE,
          order: ['-sys.createdAt'], limit: 8, include: 2,
        });
        const posts: SimpleBlogPost[] = entries.items.map((item: ContentfulEntry) => {
          const f = item.fields || {};
          const cover = f.coverImage as { fields?: { file?: { url?: string } } }[] | undefined;
          const raw = cover?.[0]?.fields?.file?.url ?? '';
          return {
            id: item.sys.id,
            title: (f.title as string) || 'Untitled',
            slug: (f.slug as string) || '',
            excerpt: (f.excerpt as string) || '',
            imageUrl: raw ? cfUrl(`https:${raw}`, SLIDER_W, SLIDER_H) : '/fallback.webp',
            date: (f.date as string) || item.sys.createdAt,
            category: (f.category as string) || 'Wellness',
          } as SimpleBlogPost;
        });
        setBlogPosts(posts);
      } catch { setBlogPosts([]); }
      finally { setLoading(false); }
    })();
  }, []);

  // Removed duplicated mission points. They live on About.tsx.

  // Regulatory references — real, linkable
  const references = useMemo(() => [
    { label: 'EU REACH', href: 'https://echa.europa.eu/regulations/reach/understanding-reach' },
    { label: 'EWG', href: 'https://www.ewg.org/skindeep/' },
    { label: 'IARC', href: 'https://www.iarc.who.int/' },
    { label: 'FDA GRAS', href: 'https://www.fda.gov/food/food-ingredients-packaging/generally-recognized-safe-gras' },
  ], []);

  return (
    <div style={{ backgroundColor: VANILLA }}>

      {/* ══════════════════════════════════════════════════════════════
          §1  HERO  ·  vanilla
         ══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: VANILLA }}
        aria-label="Hero"
      >
        {/* Dot-grid overlay for texture */}
        <div className="absolute inset-0 pointer-events-none dot-grid" style={{ opacity: 0.55 }} />

        {/* Decorative blobs — GPU-composited will-change:transform */}
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none will-change-transform"
          style={{ background: 'rgba(6, 182, 212,0.08)', y: blobTopY }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full blur-[180px] pointer-events-none will-change-transform"
          style={{ background: 'rgba(186, 230, 253,0.10)', y: blobBotY }}
        />

        {/* Floating decorative leaf — top-right */}
        <Parallax offset={45} className="absolute top-24 right-8 md:right-24 pointer-events-none float-bob opacity-18" aria-hidden="true">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M30 5C30 5 55 20 55 38C55 50 43.8 55 30 55C16.2 55 5 50 5 38C5 20 30 5 30 5Z" fill="rgba(6, 182, 212,0.12)" />
            <path d="M30 55V5" stroke="rgba(6, 182, 212,0.20)" strokeWidth="1" />
            <path d="M30 28C30 28 18 20 12 28" stroke="rgba(6, 182, 212,0.18)" strokeWidth="0.8" />
            <path d="M30 38C30 38 42 30 48 38" stroke="rgba(6, 182, 212,0.18)" strokeWidth="0.8" />
          </svg>
        </Parallax>

        {/* Floating hexagon — bottom-left */}
        <Parallax offset={-35} className="absolute bottom-32 left-8 md:left-20 pointer-events-none float-bob-reverse opacity-15" aria-hidden="true">
          <svg width="72" height="80" viewBox="0 0 72 80" fill="none">
            <path d="M36 2L70 20V60L36 78L2 60V20L36 2Z" stroke="rgba(186, 230, 253,0.35)" strokeWidth="1.5" fill="rgba(186, 230, 253,0.07)" />
            <path d="M36 14L58 26V50L36 62L14 50V26L36 14Z" stroke="rgba(186, 230, 253,0.18)" strokeWidth="0.8" fill="none" />
          </svg>
        </Parallax>

        {/* Floating small honeycomb — mid-left */}
        <Parallax offset={80} className="hidden lg:block absolute left-[8%] top-[45%] pointer-events-none drift-slow opacity-12" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 2L37 11.5V29.5L20 39L3 29.5V11.5L20 2Z" stroke="rgba(15, 23, 42,0.20)" strokeWidth="1" fill="none" />
          </svg>
        </Parallax>

        <motion.div style={{ y: textY }} className="relative z-10 container mx-auto px-6 pt-28 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Column: Typography & CTA */}
            <div className="text-center lg:text-left lg:w-[110%] relative z-20">
              {/* Headline */}
              <div className="overflow-visible mb-1">
                <motion.h1
                  initial={{ y: '105%' }} animate={{ y: '0%' }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="font-display leading-none text-charcoal whitespace-nowrap"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 9rem)' }}
                >
                  SANCTUARY
                </motion.h1>
              </div>

              <div className="overflow-visible flex items-baseline justify-center lg:justify-start gap-4 md:gap-6 mb-10">
                <motion.span
                  initial={{ y: '105%' }} animate={{ y: '0%' }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
                  className="font-display whitespace-nowrap"
                  style={{ fontSize: 'clamp(1.4rem,3vw,3rem)', color: 'rgba(15, 23, 42,0.45)' }}
                >
                  NOT
                </motion.span>
                <motion.span
                  initial={{ y: '105%' }} animate={{ y: '0%' }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
                  className="font-display text-terracotta whitespace-nowrap"
                  style={{ fontSize: 'clamp(2.5rem,6vw,6rem)', lineHeight: 1 }}
                >
                  SPECULATION
                </motion.span>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="max-w-lg mx-auto lg:mx-0 text-lg md:text-xl leading-relaxed font-light mb-12"
                style={{ color: 'rgba(15, 23, 42,0.58)' }}
              >
                Evidence-based chemical safety for everyday household and personal care products.
                Science-backed. No greenwashing.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.88 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              >
                <MagneticButton strength={0.3}>
                  <Link
                    to="/learn"
                    className="inline-flex items-center gap-3 font-display text-lg px-10 py-4 rounded-full no-underline group transition-all duration-300"
                    style={{ background: TERRACOTTA, color: VANILLA, boxShadow: '0 6px 28px rgba(6, 182, 212,0.26)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#0891B2')}
                    onMouseLeave={e => (e.currentTarget.style.background = TERRACOTTA)}
                  >
                    EXPLORE HUB <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </MagneticButton>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 font-display text-lg px-10 py-4 rounded-full border no-underline group transition-all duration-300"
                  style={{ borderColor: 'rgba(15, 23, 42,0.30)', color: CHARCOAL }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(15, 23, 42,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  OUR MISSION
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Image Collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.9 }}
              className="mt-14 lg:mt-0 relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-lg h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">

                {/* Main Product Image (Skincare) */}
                <div
                  className="absolute z-10 w-[65%] h-[75%] right-[5%] top-[5%] img-hover rounded-3xl overflow-hidden shadow-2xl rotate-[3deg] transition-transform duration-700 hover:rotate-0 hover:scale-105"
                  style={{ boxShadow: '0 30px 60px rgba(6, 182, 212,0.18)' }}
                >
                  <img
                    src="/images/home_hero_skincare_1772254375977.png"
                    alt="Natural chemical-free skincare and wellness products"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchpriority="high"
                  />
                </div>

                {/* Secondary Lifestyle Image */}
                <div
                  className="absolute z-20 w-[55%] h-[60%] left-[5%] bottom-[5%] img-hover rounded-3xl overflow-hidden shadow-xl rotate-[-4deg] transition-transform duration-700 hover:rotate-0 hover:scale-105"
                  style={{ boxShadow: '0 25px 50px rgba(186, 230, 253,0.25)' }}
                >
                  <img
                    src="/images/home_hero_lifestyle_1772254392208.png"
                    alt="Clean and natural home aesthetic"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchpriority="high"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll cue (centered at bottom of container) */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            className="mt-20 flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(15, 23, 42,0.45)' }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
              className="w-px h-10 will-change-transform"
              style={{ background: 'linear-gradient(to bottom, rgba(6, 182, 212,0.28), transparent)' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── TornPaper: VANILLA → SOFT_SAGE (entering trust zone) ────────── */}
      <TornPaper from={VANILLA} to={SOFT_SAGE} height={72} />

      {/* ══════════════════════════════════════════════════════════════
          §2  PRODUCT SEARCH — honest framing (no fake API mock)
         ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28"
        style={{ backgroundColor: SOFT_SAGE }}
        aria-label="Product Safety Search"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />

        <div className="container mx-auto px-6 mb-20">
          <div className="flex items-center gap-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: '#0891B2' }}>SVA-1 Protocol</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal variant="slide-up">
            <div className="text-center mb-16">
              <h2
                className="font-display text-charcoal leading-none mb-5"
                style={{ fontSize: 'clamp(2.4rem,6vw,5.5rem)' }}
              >VERIFY ANY <span className="text-terracotta">PRODUCT</span></h2>
              <p className="max-w-md mx-auto font-light leading-relaxed text-lg" style={{ color: 'rgba(15, 23, 42,0.44)' }}>
                Our SVA-1 verification tool is launching soon. Join the waitlist to get early access.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // For programmatic navigation, we could use useNavigate, but wrapping the button in a Link or just clicking the link is fine.
                  // Since we have a Link component, let's just make sure typing Enter works.
                  const linkElement = document.getElementById('waitlist-submit-link');
                  if (linkElement) linkElement.click();
                }}
                className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl p-3 border mb-6"
                style={{ boxShadow: '0 4px 28px rgba(0,0,0,0.05)', borderColor: 'rgba(15, 23, 42,0.07)' }}
              >
                <div className="flex flex-1 items-center bg-transparent">
                  <Search className="ml-1 h-5 w-5 flex-shrink-0" style={{ color: '#B85C38' }} strokeWidth={1.5} />
                  <input
                    id="waitlist-product"
                    name="product"
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 pl-3 pr-3 py-3 font-mono text-sm bg-transparent focus:outline-none"
                    style={{ color: '#22211F' }}
                    aria-label="Product name to verify"
                  />
                </div>
                <Link
                  id="waitlist-submit-link"
                  to={`/contact${query.trim() ? `?product=${encodeURIComponent(query.trim())}` : ''}`}
                  className="font-display justify-center px-7 py-3 rounded-xl text-sm flex items-center gap-2 whitespace-nowrap no-underline transition-opacity hover:opacity-80 w-full sm:w-auto"
                  style={{ background: '#22211F', color: VANILLA }}
                >
                  <Shield className="h-4 w-4" /> JOIN WAITLIST
                </Link>
              </form>

              {/* Regulatory basis */}
              <div className="text-center">
                <p className="font-mono text-xs mb-3" style={{ color: 'rgba(15, 23, 42,0.55)' }}>
                  Verified against
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {references.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs px-3 py-1.5 rounded-full border no-underline transition-colors duration-200"
                      style={{ borderColor: 'rgba(15, 23, 42,0.12)', color: 'rgba(15, 23, 42,0.48)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = TERRACOTTA)}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(15, 23, 42,0.48)')}
                    >
                      {label} ↗
                    </a>
                  ))}
                </div>
              </div>

              {/* SVA-1 Protocol Link */}
              <div className="mt-8 flex justify-center">
                <Link
                  to="/sva"
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-2.5 rounded-full border no-underline transition-all duration-300"
                  style={{ borderColor: 'rgba(15, 23, 42,0.12)', color: 'rgba(15, 23, 42,0.68)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#B85C38';
                    e.currentTarget.style.borderColor = '#B85C38';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(15, 23, 42,0.68)';
                    e.currentTarget.style.borderColor = 'rgba(15, 23, 42,0.12)';
                  }}
                >
                  Learn about SVA-1 Protocol <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TornPaper: SOFT_SAGE → VANILLA ────────── */}
      <TornPaper from={SOFT_SAGE} to={VANILLA} height={72} />

      {/* ══════════════════════════════════════════════════════════════
          §3  MISSION — verified copy from About.tsx / brand docs
         ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28"
        style={{ backgroundColor: VANILLA }}
        aria-label="Our Mission"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
        {/* Honeycomb pattern overlay for VANILLA zone */}
        <div className="absolute inset-0 pointer-events-none honeycomb-pattern" style={{ opacity: 0.35 }} />
        {/* Floating hexagon top-right */}
        <Parallax offset={60} className="absolute -top-2 right-8 lg:right-20 pointer-events-none float-bob opacity-20" aria-hidden="true">
          <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
            <path d="M40 3L77 23V67L40 87L3 67V23L40 3Z" stroke="rgba(15, 23, 42,0.20)" strokeWidth="1" fill="rgba(15, 23, 42,0.04)" />
          </svg>
        </Parallax>
        {/* Floating leaf bottom-left */}
        <Parallax offset={-40} className="absolute bottom-10 left-6 lg:left-16 pointer-events-none float-bob-reverse opacity-18" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 4C24 4 44 14 44 28C44 39 34 44 24 44C14 44 4 39 4 28C4 14 24 4 24 4Z" fill="rgba(15, 23, 42,0.07)" />
            <path d="M24 44V4" stroke="rgba(15, 23, 42,0.13)" strokeWidth="0.8" />
          </svg>
        </Parallax>

        <div className="container mx-auto px-6 mb-16">
          <div className="flex items-center gap-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(15, 23, 42,0.45)' }}>Our Approach</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal variant="fade">
            <div className="text-center mb-20">
              <h2
                className="font-display text-charcoal leading-none mb-6"
                style={{ fontSize: 'clamp(2.4rem,6vw,5.5rem)' }}
              >
                THE LABEL<br /><span className="text-terracotta">LIES.</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg leading-relaxed font-light" style={{ color: 'rgba(15, 23, 42,0.68)' }}>
                "Natural." "Pure." "Clean." — these words have no legal definition. Brands use them freely.
                TheSafeHive exists to bridge the gap between complex chemical safety data and everyday
                consumer decisions — using only publicly available scientific and regulatory sources.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade" delay={0.2}>
            <div className="flex justify-center mb-24">
              <Link
                to="/about"
                className="font-mono text-sm tracking-widest uppercase no-underline px-8 py-4 rounded-full border transition-colors duration-300 hover:bg-white hover:border-transparent"
                style={{ color: 'rgba(15, 23, 42,0.6)', borderColor: 'rgba(15, 23, 42,0.12)' }}
              >
                Read Our Full Protocol
              </Link>
            </div>
          </ScrollReveal>

          {/* Founding principle */}
          <ScrollReveal variant="scale" delay={0.05}>
            <div className="max-w-2xl mx-auto text-center">
              <blockquote
                className="font-heading italic text-charcoal leading-relaxed mb-4"
                style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)' }}
              >
                "Evidence-based safety, not marketing-based trust."
              </blockquote>
              <p className="font-mono text-xs tracking-widest" style={{ color: 'rgba(15, 23, 42,0.45)' }}>
                — TheSafeHive Founding Principle
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TornPaper: VANILLA → SOFT_SAND (back to content zone) ──────── */}
      <TornPaper from={VANILLA} to={SOFT_SAND} height={72} />

      {/* ══════════════════════════════════════════════════════════════
          §4  BLOG CAROUSEL — Contentful data (100% real)
         ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: SOFT_SAND }}
        aria-label="Latest Articles"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />

        <div className="container mx-auto px-6 mb-10 relative z-10">
          <div className="flex items-center gap-6 mb-14">
            <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(15, 23, 42,0.45)' }}>Knowledge Base</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
          </div>

          <ScrollReveal variant="slide-right">
            <div className="flex items-end justify-between flex-wrap gap-6">
              <h2
                className="font-display text-charcoal leading-none"
                style={{ fontSize: 'clamp(2.2rem,5vw,4.5rem)' }}
              >
                LATEST<br /><span className="text-terracotta">INSIGHTS</span>
              </h2>
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => instanceRef.current?.prev()}
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-200"
                  style={{ borderColor: 'rgba(15, 23, 42,0.16)', color: 'rgba(15, 23, 42,0.42)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#B85C38'; e.currentTarget.style.color = '#B85C38'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(15, 23, 42,0.16)'; e.currentTarget.style.color = 'rgba(15, 23, 42,0.42)'; }}
                  aria-label="Previous article"
                ><ChevronLeft className="h-4 w-4" /></button>
                <button
                  onClick={() => instanceRef.current?.next()}
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-200"
                  style={{ borderColor: 'rgba(15, 23, 42,0.16)', color: 'rgba(15, 23, 42,0.42)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#B85C38'; e.currentTarget.style.color = '#B85C38'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(15, 23, 42,0.16)'; e.currentTarget.style.color = 'rgba(15, 23, 42,0.42)'; }}
                  aria-label="Next article"
                ><ChevronRight className="h-4 w-4" /></button>
                <Link
                  to="/blog"
                  className="ml-3 font-mono text-sm tracking-widest uppercase no-underline transition-colors duration-200"
                  style={{ color: 'rgba(15, 23, 42,0.55)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = TERRACOTTA)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(15, 23, 42,0.34)')}
                >View all →</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {loading ? (
          <div className="container mx-auto px-6 flex gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex-shrink-0 w-80 h-52 rounded-2xl animate-pulse"
                style={{ background: 'rgba(15, 23, 42,0.06)' }} />
            ))}
          </div>
        ) : (
          <div ref={sliderRef} className="keen-slider pl-6 md:pl-[calc((100vw-1280px)/2+1.5rem)]">
            {blogPosts.map((post, i) => (
              <div key={post.id} className="keen-slider__slide">
                <BlogCard post={post} variant="slider" imgW={SLIDER_W} imgH={SLIDER_H} priority={i < 2} />
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-2 mt-8">
          {blogPosts.map((_, i) => (
            <button
              key={i}
              onClick={() => instanceRef.current?.moveToIdx(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === slide ? 18 : 6,
                background: i === slide ? '#B85C38' : 'rgba(15, 23, 42,0.18)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── Torn paper: vanilla → soft sage ─────────────────── */}
      <TornPaper from={VANILLA} to={SOFT_SAGE} height={72} />

      {/* ══════════════════════════════════════════════════════════════
          §6  CTA  ·  soft sage
         ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ backgroundColor: SOFT_SAGE }}
        aria-label="Get started"
      >
        <div className="absolute inset-0 pointer-events-none" style={{ ...paperStyle, opacity: 0.5 }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(15, 23, 42,0.04) 0%, transparent 60%)' }}
        />

        {/* Floating background decorators */}
        <div className="absolute top-10 right-10 md:right-32 pointer-events-none float-bob opacity-10" aria-hidden="true">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path d="M50 5L95 25V75L50 95L5 75V25L50 5Z" stroke="rgba(15, 23, 42,0.2)" strokeWidth="1" fill="rgba(15, 23, 42,0.03)" />
            <path d="M50 20L75 32V68L50 80L25 68V32L50 20Z" stroke="rgba(15, 23, 42,0.15)" strokeWidth="0.8" fill="none" />
          </svg>
        </div>
        <div className="absolute bottom-20 left-10 md:left-24 pointer-events-none float-bob-reverse opacity-10" aria-hidden="true">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M30 5C30 5 55 20 55 38C55 50 43.8 55 30 55C16.2 55 5 50 5 38C5 20 30 5 30 5Z" stroke="rgba(15, 23, 42,0.15)" strokeWidth="0.8" fill="none" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="slide-right">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase mb-6" style={{ color: 'rgba(15, 23, 42,0.46)' }}>
                Ready to begin?
              </p>
              <h2
                className="font-display leading-none mb-8"
                style={{ fontSize: 'clamp(2.8rem,7vw,6.5rem)', color: CHARCOAL }}
              >
                KNOW WHAT<br />YOU'RE<br />
                <span style={{ color: 'rgba(15, 23, 42,0.42)' }}>BUYING.</span>
              </h2>
              <p className="max-w-sm font-light leading-relaxed text-lg mb-10" style={{ color: 'rgba(15, 23, 42,0.60)' }}>
                TheSafeHive helps conscious families make safer, better-informed product choices — using
                evidence, not marketing.
              </p>
              <MagneticButton strength={0.3}>
                <Link
                  to="/learn"
                  className="btn-shimmer relative overflow-hidden inline-flex items-center gap-3 font-display text-lg px-10 py-4 rounded-full border no-underline group transition-all duration-300 transform hover:-translate-y-1"
                  style={{ borderColor: 'rgba(15, 23, 42,0.12)', background: TERRACOTTA, color: VANILLA }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#0891B2'; e.currentTarget.style.borderColor = '#0891B2'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = TERRACOTTA; e.currentTarget.style.borderColor = 'rgba(15, 23, 42,0.12)'; }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    EXPLORE <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </MagneticButton>
            </ScrollReveal>

            <ScrollReveal variant="scale" delay={0.12}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: 'SVA-1 Protocol', desc: 'Algorithmic ingredient verification' },
                  { icon: CheckCircle2, title: 'Science-backed', desc: 'EU REACH, EWG & IARC referenced' },
                  { icon: Leaf, title: 'Eco-focused', desc: 'Sustainable safe alternatives' },
                  { icon: Search, title: 'Transparent', desc: 'Every claim is source-linked' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="bg-white/90 rounded-2xl p-6 border group hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
                    style={{ borderColor: 'rgba(15, 23, 42,0.06)' }}
                  >
                    <Icon className="h-7 w-7 mb-4 group-hover:scale-110 transition-transform duration-300 text-terracotta" strokeWidth={1.5} />
                    <h3 className="font-display text-base mb-1" style={{ color: CHARCOAL }}>{title}</h3>
                    <p className="font-mono text-xs" style={{ color: 'rgba(15, 23, 42,0.50)' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Torn paper: soft sage → soft sand (Footer transition) ───────── */}
      <TornPaper from={SOFT_SAGE} to={SOFT_SAND} height={72} />
    </div>
  );
};

export default Home;
