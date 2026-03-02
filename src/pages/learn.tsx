/**
 * learn.tsx — TheSafeHive Hub / Learn page
 * Full redesign: 3-color architecture (VANILLA / SAGE / TERRACOTTA)
 * with TornPaper organic dividers, font-display headlines,
 * ScrollReveal animations, and the GameHub component.
 */

import { Suspense, lazy, useEffect, useMemo, useState, useDeferredValue, useCallback } from 'react';
import { matchSorter } from 'match-sorter';
import {
  Brain, Eye, AlertTriangle, Award, Search,
  CheckCircle2, XCircle,
  ScanText, FileSearch, Activity, Scale, ShieldAlert, Sliders, ChevronLeft, ChevronRight
} from 'lucide-react';
import { BlogPost, blogCategories } from '../types/blog';
import { fetchBlogPosts } from '../services/contentfulService';
import BlogCard from '../components/blog/BlogCard';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/animations/ScrollReveal';
import { TornPaper } from '../components/ui/OrganicSectionDividers';

const GameHub = lazy(() => import('../games/GameHub'));

// ─── Palette ──────────────────────────────────────────────────────────────────
const VANILLA = '#F8FAFC';
const SOFT_SAGE = '#E0E7FF';
const SOFT_SAND = '#F1F5F9';
const TERRACOTTA = '#06B6D4';
const CHARCOAL = '#0F172A';

// ─── Paper texture (replaced with index.css pattern) ────────
const paperStyle: React.CSSProperties = {};

// ────────────────────────────────────────────────────────────────────────────
// § Reusable "Eyebrow" Header Rule
// ────────────────────────────────────────────────────────────────────────────
const SectionRule = ({ label, accent = false }: { label: string; accent?: boolean }) => (
  <div className="flex items-center gap-6 mb-16">
    <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
    <span
      className="font-mono text-[10px] tracking-[0.24em] uppercase"
      style={{ color: accent ? '#0891B2' : 'rgba(15, 23, 42,0.35)' }}
    >
      {label}
    </span>
    <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
  </div>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const svaArchitecture = [
  {
    step: '1', icon: ScanText,
    title: 'Ingredient Intelligence',
    description: `Product labels and supplier information are complex and inconsistent. TheSafeHive transforms raw ingredient data into a clean, standardised format so every product is evaluated on the same basis, without relying on marketing claims.`,
  },
  {
    step: '2', icon: FileSearch,
    title: 'Evidence-Backed Safety Signals',
    description: `Safety claims should be backed by science. TheSafeHive references authoritative regulatory and scientific sources to identify known safety concerns, emerging risks, and areas where evidence is limited.`,
  },
  {
    step: '3', icon: Scale,
    title: "Safety Scoring You Can Rely On",
    description: `Using TheSafeHive's proprietary evaluation framework, each product is assessed for potential concern levels based on current scientific and regulatory understanding. Where data is incomplete, uncertainty is highlighted.`,
  },
  {
    step: '4', icon: Activity,
    title: 'Always Up to Date',
    description: `Safety information changes over time. When new research or regulatory updates emerge, relevant products are automatically reviewed so assessments stay current.`,
  },
  {
    step: '5', icon: Sliders,
    title: 'Personalised, Informational Clarity',
    description: `Everyone's needs are different. TheSafeHive allows you to view safety information through your own preferences — while remaining strictly informational and non-medical.`,
  },
];

const identifyCards = [
  {
    icon: Eye,
    title: 'Read Labels Carefully',
    accentColor: TERRACOTTA,
    items: [
      'Look for ingredient lists, not just marketing claims',
      'Avoid products with "fragrance" or "parfum"',
      'Watch for long, unpronounceable chemical names',
      'Check for warning symbols and hazard statements',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Red Flag Ingredients',
    accentColor: '#0891B2',
    items: [
      'Parabens (methylparaben, propylparaben…)',
      'Phthalates (DBP, DEHP, DEP)',
      'Formaldehyde releasers',
      'Triclosan & triclocarban',
    ],
  },
  {
    icon: Award,
    title: 'Look for Certifications',
    accentColor: '#2563EB',
    items: [
      'USDA Organic certification',
      'EWG Verified™ products',
      'Cradle to Cradle Certified™',
      'GREENGUARD Gold certification',
    ],
  },
  {
    icon: Search,
    title: 'Research Tools',
    accentColor: CHARCOAL,
    items: [
      "EWG's Skin Deep® database",
      'Think Dirty app for product scanning',
      'HEALTHYstuff.org for product testing',
      'Company websites for full ingredient lists',
    ],
  },
];


const POSTS_PER_PAGE = 6;

export default function Learn() {
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

    // Smooth scroll to the posts section
    const postsSection = document.getElementById('hub-insights');
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
          style={{ borderColor: 'rgba(15, 23, 42,0.14)', color: 'rgba(15, 23, 42,0.54)' }}
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
                color: active ? VANILLA : 'rgba(15, 23, 42,0.54)',
                borderColor: active ? '#22211F' : 'rgba(15, 23, 42,0.14)',
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
          style={{ borderColor: 'rgba(15, 23, 42,0.14)', color: 'rgba(15, 23, 42,0.54)' }}
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

      {/* ══════════════════════════════════════════════════════════════
          HERO — VANILLA
         ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[72vh] flex flex-col justify-center overflow-hidden pt-12 pb-0"
        style={{ backgroundColor: VANILLA }}
        aria-labelledby="hub-hero-heading"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
        {/* Decorative sage blob */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none"
          style={{ background: 'rgba(186, 230, 253,0.14)' }}
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-mono text-[10px] tracking-[0.28em] uppercase mb-6"
            style={{ color: '#0891B2' }}
          >
            <Brain className="inline h-3.5 w-3.5 mr-2 -mt-0.5" />
            Interactive Learning Hub
          </motion.p>

          <div className="overflow-hidden mb-2">
            <motion.h1
              id="hub-hero-heading"
              initial={{ y: '105%' }} animate={{ y: '0%' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display leading-none"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', color: CHARCOAL }}
            >
              LEARN &
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
              className="font-display leading-none"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', color: TERRACOTTA }}
            >
              VERIFY
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="max-w-xl mx-auto text-lg leading-relaxed font-light mb-12"
            style={{ color: 'rgba(15, 23, 42,0.50)' }}
          >
            Pick a game to practice chemical safety knowledge. Science-backed.
            No scores — just real understanding.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="flex flex-col items-center gap-2 mt-8"
          >
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(15, 23, 42,0.45)' }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
              className="w-px h-10 will-change-transform"
              style={{ background: 'linear-gradient(to bottom, rgba(6, 182, 212,0.28), transparent)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ════════ SVA-1 ARCHITECTURE (VANILLA zone) ════════ */}
      <section
        className="relative py-28"
        style={{ backgroundColor: VANILLA }}
        aria-labelledby="sva-heading"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ ...paperStyle, backgroundImage: `radial-gradient(ellipse at 0% 50%, rgba(6, 182, 212,0.03) 0%, transparent 60%)` }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <SectionRule label="SVA-1 Architecture" accent />

          <ScrollReveal variant="fade">
            <div className="text-center mb-16">
              <h2
                id="sva-heading"
                className="font-display text-charcoal leading-none mb-6"
                style={{ fontSize: 'clamp(2rem,5vw,4.5rem)' }}
              >
                HOW WE COMPUTE<br /><span className="text-terracotta">SAFETY</span>
              </h2>
              <p className="max-w-2xl mx-auto font-light text-lg leading-relaxed" style={{ color: 'rgba(15, 23, 42,0.50)' }}>
                SVA-1 combines AI-assisted processing with defined evaluation rules to assess
                product safety consistently. Automated, auditable, and source-linked.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {svaArchitecture.map(({ step, icon: Icon, title, description }) => (
                <StaggerItem key={title} variant="slide-up">
                  <div
                    className="hover-card bg-white rounded-2xl p-8 border h-full group"
                    style={{ boxShadow: '0 2px 14px rgba(0,0,0,0.04)', borderColor: 'rgba(15, 23, 42,0.07)' }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300"
                        style={{ background: '#22211F' }}
                      >
                        <Icon className="h-6 w-6 hover-icon" style={{ color: VANILLA }} strokeWidth={1.5} />
                      </div>
                      <span
                        className="font-mono text-xs tracking-widest px-3 py-1 rounded-full border"
                        style={{ borderColor: 'rgba(15, 23, 42,0.10)', color: 'rgba(15, 23, 42,0.40)' }}
                      >
                        Stage {step}
                      </span>
                    </div>
                    <h3 className="font-heading text-charcoal text-xl mb-3">{title}</h3>
                    <p className="font-light leading-relaxed text-sm" style={{ color: 'rgba(15, 23, 42,0.68)' }}>{description}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Non-medical boundary notice */}
          <ScrollReveal variant="scale" delay={0.1}>
            <div
              className="max-w-4xl mx-auto mt-14 bg-white rounded-2xl p-8 border"
              style={{ boxShadow: '0 4px 22px rgba(0,0,0,0.04)', borderColor: 'rgba(6, 182, 212,0.12)' }}
            >
              <div className="flex items-start gap-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(6, 182, 212,0.08)' }}
                >
                  <ShieldAlert className="h-6 w-6 text-terracotta" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: '#0891B2' }}>
                    Non-medical boundary
                  </p>
                  <p className="font-light leading-relaxed" style={{ color: 'rgba(15, 23, 42,0.58)' }}>
                    TheSafeHive scoring and personalisation are strictly informational. TheSafeHive does
                    not provide medical advice, diagnosis, or treatment. Where evidence is incomplete,
                    TheSafeHive highlights uncertainty and applies precautionary logic.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TornPaper: VANILLA → SOFT_SAGE ───────────────────────────────── */}
      <TornPaper from={VANILLA} to={SOFT_SAGE} height={72} />

      {/* ══════════════════════════════════════════════════════════════
          GAME HUB — SOFT_SAGE zone
         ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28"
        style={{ backgroundColor: SOFT_SAGE }}
        aria-label="Interactive Games"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
        <div className="container mx-auto px-6 relative z-10">

          {/* Section label */}
          <ScrollReveal variant="fade">
            <div className="flex items-center gap-6 mb-14">
              <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.12)' }} />
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(15, 23, 42,0.55)' }}>Interactive Games</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.12)' }} />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade">
            <div className="text-center mb-16">
              <h2
                className="font-display leading-none mb-5"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', color: CHARCOAL }}
              >
                TEST YOUR <span style={{ color: TERRACOTTA }}>KNOWLEDGE</span>
              </h2>
              <p className="max-w-lg mx-auto font-light text-lg" style={{ color: 'rgba(15, 23, 42,0.56)' }}>
                Pressure-free interactive games to build your chemical safety intuition.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={0.1}>
            <div className="bg-white rounded-3xl p-6 md:p-10 border" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)', borderColor: 'rgba(15, 23, 42,0.07)' }}>
              <Suspense fallback={
                <div className="h-48 flex items-center justify-center">
                  <span className="font-mono text-sm tracking-widest" style={{ color: 'rgba(15, 23, 42,0.45)' }}>Loading Hub…</span>
                </div>
              }>
                <GameHub />
              </Suspense>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TornPaper: SOFT_SAGE → SOFT_SAND ───────────────────────────────── */}
      <TornPaper from={SOFT_SAGE} to={SOFT_SAND} height={72} />

      {/* ══════════════════════════════════════════════════════════════
          IDENTIFY HARMFUL PRODUCTS — SOFT_SAND zone
         ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28"
        style={{ backgroundColor: SOFT_SAND }}
        aria-label="How to Identify Harmful Products"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
        <div className="container mx-auto px-6 relative z-10">

          <ScrollReveal variant="fade">
            <div className="flex items-center gap-6 mb-14">
              <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: '#0891B2' }}>Safety Intelligence</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade">
            <div className="text-center mb-16">
              <h2
                className="font-display leading-none mb-5"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', color: CHARCOAL }}
              >
                HOW TO <span style={{ color: TERRACOTTA }}>IDENTIFY</span>
              </h2>
              <p className="max-w-xl mx-auto font-light text-lg" style={{ color: 'rgba(15, 23, 42,0.50)' }}>
                Four practical frameworks for spotting potentially harmful products before they reach your home.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.08}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {identifyCards.map(({ icon: Icon, title, accentColor, items }) => (
                <StaggerItem key={title} variant="slide-up">
                  <div
                    className="bg-white rounded-2xl p-8 border h-full hover:-translate-y-1 transition-all duration-300"
                    style={{ boxShadow: '0 4px 22px rgba(0,0,0,0.04)', borderColor: 'rgba(15, 23, 42,0.05)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                      style={{ background: `${accentColor}18` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: accentColor }} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-charcoal text-lg mb-5">{title}</h3>
                    <ul className="space-y-3">
                      {items.map(item => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: accentColor }} />
                          <span className="font-light text-sm leading-relaxed" style={{ color: 'rgba(15, 23, 42,0.60)' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ── TornPaper: SOFT_SAND → SOFT_SAGE ───────────────────────────────── */}
      <TornPaper from={SOFT_SAND} to={SOFT_SAGE} height={72} />

      {/* ══════════════════════════════════════════════════════════════
          ESSENTIAL GUIDELINES — SOFT_SAGE zone
         ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28"
        style={{ backgroundColor: SOFT_SAGE }}
        aria-label="Essential Safety Guidelines"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
        <div className="container mx-auto px-6 relative z-10">

          <ScrollReveal variant="fade">
            <div className="flex items-center gap-6 mb-14">
              <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.12)' }} />
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(15, 23, 42,0.55)' }}>Guidelines</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.12)' }} />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade">
            <div className="text-center mb-16">
              <h2
                className="font-display leading-none mb-5"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', color: CHARCOAL }}
              >
                ESSENTIAL <span style={{ color: TERRACOTTA }}>GUIDELINES</span>
              </h2>
              <p className="max-w-md mx-auto font-light text-lg" style={{ color: 'rgba(15, 23, 42,0.54)' }}>
                Smart daily habits that make safer choices second nature.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Smart Choices */}
            <ScrollReveal variant="slide-right">
              <div className="bg-white rounded-2xl p-10 border h-full" style={{ boxShadow: '0 4px 28px rgba(0,0,0,0.06)', borderColor: 'rgba(15, 23, 42,0.06)' }}>
                <div className="flex items-center gap-5 mb-8 pb-6 border-b" style={{ borderColor: 'rgba(15, 23, 42,0.07)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(186, 230, 253,0.25)' }}>
                    <CheckCircle2 className="h-6 w-6" style={{ color: '#2563EB' }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-2xl" style={{ color: CHARCOAL }}>SMART CHOICES</h3>
                </div>
                <div className="space-y-3">
                  {[
                    'Choose fragrance-free products',
                    'Buy organic when possible',
                    'Use glass containers for food storage',
                    'Ventilate your home regularly',
                    'Make your own cleaners where practical',
                    'Read ingredient lists completely',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 hover:bg-sage/20" style={{ background: 'rgba(186, 230, 253,0.08)' }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#2563EB' }} />
                      <span className="font-light text-sm" style={{ color: 'rgba(15, 23, 42,0.68)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Avoid These */}
            <ScrollReveal variant="slide-up" delay={0.1}>
              <div className="bg-white rounded-2xl p-10 border h-full" style={{ boxShadow: '0 4px 28px rgba(0,0,0,0.06)', borderColor: 'rgba(15, 23, 42,0.06)' }}>
                <div className="flex items-center gap-5 mb-8 pb-6 border-b" style={{ borderColor: 'rgba(15, 23, 42,0.07)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(6, 182, 212,0.10)' }}>
                    <XCircle className="h-6 w-6 text-terracotta" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-2xl" style={{ color: CHARCOAL }}>AVOID THESE</h3>
                </div>
                <div className="space-y-3">
                  {[
                    'Don\'t trust "natural" or "eco" labels alone',
                    'Don\'t microwave food in plastic containers',
                    'Avoid antibacterial soaps with triclosan',
                    'Don\'t mix cleaning products',
                    'Avoid aerosol sprays when possible',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200" style={{ background: 'rgba(6, 182, 212,0.06)' }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: TERRACOTTA }} />
                      <span className="font-light text-sm" style={{ color: 'rgba(15, 23, 42,0.68)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          INSIGHTS & GUIDES (BLOG) — SOFT_SAGE zone
         ══════════════════════════════════════════════════════════════ */}
      <section
        id="hub-insights"
        className="relative py-28 overflow-hidden"
        style={{ backgroundColor: SOFT_SAGE }}
        aria-label="Insights and Guides"
      >
        <div className="absolute inset-0 pointer-events-none" style={{ ...paperStyle, opacity: 0.5 }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(15, 23, 42,0.04) 0%, transparent 60%)' }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal variant="fade">
            <div className="flex items-center gap-6 mb-14">
              <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.12)' }} />
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(15, 23, 42,0.55)' }}>Insights Library</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.12)' }} />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade">
            <div className="text-center mb-16">
              <h2
                className="font-display leading-none mb-5"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', color: CHARCOAL }}
              >
                INSIGHTS & <span style={{ color: TERRACOTTA }}>GUIDES</span>
              </h2>
              <p className="max-w-xl mx-auto font-light text-lg" style={{ color: 'rgba(15, 23, 42,0.56)' }}>
                We decode chemicals in your home and reveal evidence-based, safer alternatives.
                Informational only — not medical advice.
              </p>
            </div>
          </ScrollReveal>

          {/* Search */}
          <ScrollReveal variant="slide-up">
            <div className="max-w-xl mb-8">
              <label htmlFor="blog-search" className="sr-only">Search articles</label>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                  style={{ color: 'rgba(15, 23, 42,0.45)' }}
                  strokeWidth={1.5}
                />
                <input
                  id="blog-search"
                  name="search"
                  type="text"
                  placeholder="Search articles…"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-5 py-3 rounded-xl font-mono text-sm bg-white border border-slate-200 focus:outline-none transition-colors duration-200"
                  style={{
                    color: '#22211F',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                  onFocus={e => (e.target.style.borderColor = TERRACOTTA)}
                  onBlur={e => (e.target.style.borderColor = 'rgba(15, 23, 42,0.10)')}
                  inputMode="search"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Category filters */}
          <ScrollReveal variant="fade" delay={0.05}>
            <div className="flex gap-2 flex-wrap mb-14" role="tablist" aria-label="Filter by category">
              {['All', ...blogCategories].map(category => {
                const active = (category === 'All' && !selectedCategory) || selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category === 'All' ? '' : category)}
                    className="px-5 py-2 rounded-full font-mono text-xs tracking-widest uppercase border transition-all duration-200"
                    style={{
                      background: active ? '#22211F' : 'transparent',
                      color: active ? VANILLA : 'rgba(15, 23, 42,0.46)',
                      borderColor: active ? '#22211F' : 'rgba(15, 23, 42,0.14)',
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
                  style={{ background: 'rgba(15, 23, 42,0.06)' }}
                />
              ))}
            </div>
          ) : error ? (
            <p className="text-center py-16 font-mono text-sm" style={{ color: TERRACOTTA }}>
              Could not load articles. Please try again later.
            </p>
          ) : currentPosts.length === 0 ? (
            <p className="text-center py-16 font-mono text-sm" style={{ color: 'rgba(15, 23, 42,0.55)' }}>
              No articles found.
            </p>
          ) : (
            <ScrollReveal variant="fade" delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 p-1">
                {currentPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
              <Pagination />
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ── TornPaper: SOFT_SAGE → SOFT_SAND (Footer Transition) ──────── */}
      <TornPaper from={SOFT_SAGE} to={SOFT_SAND} height={72} />
    </div>
  );
}
