/**
 * About.tsx — Redesigned to match Home styling.
 *
 * Palette: VANILLA (#FAF5E4) content bg, TERRACOTTA (#B85C38) accents + CTA
 * Type: font-display tracking-widest (H1/H2), font-mono (labels), font-heading (cards), font-light (body)
 * Rhythm: thin hr + mono label between sections (same as Home)
 * Transitions: TornPaper vanilla → terracotta before CTA
 * Animations: ScrollReveal + StaggerContainer (no manual IntersectionObserver)
 */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { coreValues } from '../data/values';
import {
  Leaf,
  Building,
  Microscope,
  TrendingUp,
  Target,
  ShieldCheck,
  ShoppingBag,
  GraduationCap,
  CheckCircle2,
  Users,
  HeartHandshake,
  ClipboardCheck,
  BadgeCheck,
  ArrowRight,
} from 'lucide-react';
import { CoreValuesGrid } from '../components/ui/CoreValueCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/animations/ScrollReveal';
import { Parallax } from '../components/animations/Parallax';
import { TornPaper } from '../components/ui/OrganicSectionDividers';
import type { LucideIcon } from 'lucide-react';

// ─── Palette ──────────────────────────────────────────────────────────────────
const VANILLA = '#F8FAFC';
const SOFT_SAGE = '#E0E7FF';
const SOFT_SAND = '#F1F5F9';
const TERRACOTTA = '#B85C38';


// ─── Paper texture (replaced with index.css pattern) ────────
const paperStyle: React.CSSProperties = {};

// ─── Section rule helper ──────────────────────────────────────────────────────
const SectionRule = ({ label, accent = false }: { label: string; accent?: boolean }) => (
  <div className="flex items-center gap-6 mb-16">
    <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
    <span
      className="font-mono text-[10px] tracking-[0.24em] uppercase"
      style={{ color: accent ? 'rgba(6, 182, 212,0.5)' : 'rgba(15, 23, 42,0.22)' }}
    >{label}</span>
    <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
  </div>
);



const HERO_IMG =
  '/images/about_hero_image_1772254361906.png';

// ═════════════════════════════════════════════════════════════════════════════
const About = () => {
  const missionPoints: Array<{ icon: LucideIcon; title: string; description: string }> = useMemo(() => [
    {
      icon: Target,
      title: 'No More Confusion',
      description: `We translate complex chemical labels into simple grades like A, B, or F so you can shop with confidence.`,
    },
    {
      icon: ShieldCheck,
      title: 'Science, Not Marketing',
      description: `We don't care if a bottle says "organic." We check the actual ingredients against databases like EU REACH and the EPA.`,
    },
    {
      icon: ShoppingBag,
      title: 'Better Alternatives',
      description: `If your favorite product is toxic, we don't just tell you it's bad—we show you a rigorously verified safe alternative.`,
    },
    {
      icon: GraduationCap,
      title: 'Radical Transparency',
      description: `We show our work. You can see exactly which ingredient triggered a warning and why.`,
    },
  ], []);



  const customerPromise = useMemo(() => [
    {
      icon: CheckCircle2,
      title: 'The End of Decision Fatigue',
      description: `You shouldn't need a PhD in Toxicology to buy shampoo. TheSafeHive's SVA-1 protocol cross-references ingredient data against publicly available scientific and regulatory sources so you get clear, structured safety signals — without the jargon.`,
    },
    {
      icon: ClipboardCheck,
      title: 'Real-World Testing',
      description: `An algorithm can detect toxins, but it cannot verify product quality. That's why every product that passes our digital screening undergoes a physical Golden Sample check — ensuring you get exactly what's on the label.`,
    },
    {
      icon: BadgeCheck,
      title: 'No Fear Mongering, Just Facts',
      description: `We don't use scary marketing. We use data — telling you what is in a product, why it is safe, and where the evidence comes from. Transparency is the ultimate trust.`,
    },
    {
      icon: Users,
      title: 'Built for Real Families',
      description: `We listen to feedback from families, parents, and eco-conscious shoppers to continuously refine what "safe" actually means in the real world.`,
    },
  ], []);

  const futurePlans = useMemo(() => [
    {
      icon: Building,
      title: 'Brand-Level Collaboration',
      description:
        'TheSafeHive works with transparent brands to improve ingredient disclosure and formulation accountability.',
    },
    {
      icon: Microscope,
      title: 'Selective Lab Validation',
      description:
        'TheSafeHive introduces targeted third-party testing to calibrate and strengthen verification logic.',
    },
    {
      icon: TrendingUp,
      title: 'Compliance Infrastructure',
      description:
        'TheSafeHive supports safety and regulatory workflows in a tightening chemical compliance environment.',
    },
  ], []);

  return (
    <div className="pt-16" style={{ backgroundColor: VANILLA }}>
      <div className="absolute inset-0 pointer-events-none" style={paperStyle} />

      {/* ════════════════════════════════════════════════════════════════
          HERO
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden pt-12 pb-0"
        style={{ backgroundColor: VANILLA }}
        aria-labelledby="about-hero-heading"
      >
        <div className="absolute inset-0 pointer-events-none dot-grid" style={{ opacity: 0.55 }} />

        {/* Floating leaf — top-right */}
        <Parallax offset={45} className="absolute top-24 right-8 md:right-32 pointer-events-none float-bob opacity-18" aria-hidden="true">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M30 5C30 5 55 20 55 38C55 50 43.8 55 30 55C16.2 55 5 50 5 38C5 20 30 5 30 5Z" fill="rgba(184, 92, 56,0.12)" />
            <path d="M30 55V5" stroke="rgba(184, 92, 56,0.20)" strokeWidth="1" />
            <path d="M30 28C30 28 18 20 12 28" stroke="rgba(184, 92, 56,0.18)" strokeWidth="0.8" />
            <path d="M30 38C30 38 42 30 48 38" stroke="rgba(184, 92, 56,0.18)" strokeWidth="0.8" />
          </svg>
        </Parallax>

        {/* Floating small honeycomb — mid-left */}
        <Parallax offset={80} className="hidden lg:block absolute left-[8%] top-[50%] pointer-events-none drift-slow opacity-12" aria-hidden="true">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path d="M22 2L40 12V32L22 42L4 32V12L22 2Z" stroke="rgba(15, 23, 42,0.20)" strokeWidth="1" fill="none" />
          </svg>
        </Parallax>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-mono text-[10px] tracking-[0.28em] uppercase mb-6"
                style={{ color: '#0891B2' }}
              >
                About TheSafeHive
              </motion.p>

              <div className="overflow-hidden mb-2 flex flex-wrap gap-x-4">
                <motion.h1
                  id="about-hero-heading"
                  initial={{ y: '105%' }} animate={{ y: '0%' }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="font-display leading-none text-charcoal"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
                >
                  WE BELIEVE
                </motion.h1>
                <motion.h1
                  initial={{ y: '105%' }} animate={{ y: '0%' }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
                  className="font-display leading-none text-terracotta"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
                >
                  YOU DESERVE
                </motion.h1>
                <motion.h1
                  initial={{ y: '105%' }} animate={{ y: '0%' }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
                  className="font-display leading-none text-charcoal"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
                >
                  THE TRUTH.
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55 }}
                className="text-base md:text-lg font-light leading-relaxed max-w-md mb-8"
                style={{ color: 'rgba(15, 23, 42,0.65)' }}
              >
                "Clean" is unregulated. Brands greenwash. We're building the world's most transparent product safety platform — so you always know what's in your home.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.72 }}
              >
                <Link
                  to="/contact"
                  className="btn-shimmer relative overflow-hidden inline-flex items-center gap-3 font-display text-base px-8 py-4 rounded-full no-underline group transition-all duration-300"
                  style={{ background: TERRACOTTA, color: VANILLA, boxShadow: '0 6px 28px rgba(6, 182, 212,0.22)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#0891B2')}
                  onMouseLeave={e => (e.currentTarget.style.background = TERRACOTTA)}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    GET IN TOUCH <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="relative"
            >
              <div
                className="img-hover rounded-[3rem] overflow-hidden shadow-2xl"
                style={{ border: '1px solid rgba(15, 23, 42,0.06)' }}
              >
                <picture>
                  <img
                    src={HERO_IMG}
                    alt="Natural organic materials conveying chemical safety"
                    className="w-full h-[28rem] lg:h-[36rem] object-cover"
                    loading="eager"
                    fetchpriority="high"
                    width={960} height={720}
                  />
                </picture>
              </div>
              {/* Accent blob */}
              <div
                className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full blur-[80px] pointer-events-none -z-10"
                style={{ background: 'rgba(6, 182, 212,0.08)' }}
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="flex justify-center pb-10 mt-16"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
            className="w-px h-10 will-change-transform"
            style={{ background: 'linear-gradient(to bottom, rgba(184, 92, 56,0.28), transparent)' }}
          />
        </motion.div>
      </section>

      {/* ── TornPaper: VANILLA → SOFT_SAND (human story zone) ────────── */}
      <TornPaper from={VANILLA} to={SOFT_SAND} height={72} />

      {/* ════════ VISION / MISSION ════════ */}
      <section
        className="relative py-28"
        style={{ backgroundColor: SOFT_SAND }}
        aria-labelledby="vision-heading"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
        <div className="absolute inset-0 pointer-events-none honeycomb-pattern" style={{ opacity: 0.65 }} />

        {/* Floating decorative hexagon — top-right */}
        <Parallax offset={60} className="absolute top-12 right-6 lg:right-16 pointer-events-none float-bob opacity-20" aria-hidden="true">
          <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
            <path d="M40 3L77 23V67L40 87L3 67V23L40 3Z" stroke="rgba(15, 23, 42,0.20)" strokeWidth="1" fill="rgba(15, 23, 42,0.04)" />
          </svg>
        </Parallax>

        <div className="container mx-auto px-6 relative z-10">
          <SectionRule label="Our Vision" />

          <ScrollReveal variant="fade">
            <div className="text-center mb-16">
              <h2
                id="vision-heading"
                className="font-display text-charcoal leading-none mb-6"
                style={{ fontSize: 'clamp(2.4rem,6vw,5.5rem)' }}
              >
                DISCOVER OUR<br /><span className="text-terracotta">VISION</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg leading-relaxed font-light" style={{ color: 'rgba(15, 23, 42,0.70)' }}>
                TheSafeHive exists to bridge the gap between complex chemical safety data
                and everyday consumer decisions.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {missionPoints.map(({ icon: Icon, title, description }) => (
                <StaggerItem key={title} variant="slide-up">
                  <div
                    className="hover-card bg-white rounded-2xl p-8 border h-full group"
                    style={{ boxShadow: '0 2px 14px rgba(0,0,0,0.04)', borderColor: 'rgba(15, 23, 42,0.07)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: 'rgba(184, 92, 56,0.10)' }}
                    >
                      <Icon className="h-6 w-6 hover-icon" style={{ color: TERRACOTTA }} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-charcoal text-xl mb-3">{title}</h3>
                    <p className="font-light leading-relaxed" style={{ color: 'rgba(15, 23, 42,0.68)' }}>{description}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ── TornPaper: SOFT_SAND → SOFT_SAGE ────────── */}
      <TornPaper from={SOFT_SAND} to={SOFT_SAGE} height={72} />

      {/* ════════ CORE VALUES (SOFT_SAGE zone) ════════ */}
      <section
        className="relative py-24"
        style={{ backgroundColor: SOFT_SAGE }}
        aria-label="Our Values"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
        <div className="absolute inset-0 pointer-events-none honeycomb-pattern" style={{ opacity: 0.65 }} />

        {/* Floating leaf — bottom-left */}
        <div className="absolute bottom-8 left-6 lg:left-20 pointer-events-none float-bob-reverse opacity-18" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 4C24 4 44 14 44 28C44 39 34 44 24 44C14 44 4 39 4 28C4 14 24 4 24 4Z" fill="rgba(15, 23, 42,0.07)" />
            <path d="M24 44V4" stroke="rgba(15, 23, 42,0.13)" strokeWidth="0.8" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <SectionRule label="Our Values" />
          <ScrollReveal variant="fade">
            <div className="text-center mb-16">
              <h2
                className="font-display text-charcoal leading-none"
                style={{ fontSize: 'clamp(2.4rem,6vw,5.5rem)' }}
              >
                OUR <span className="text-terracotta">VALUES</span>
              </h2>
              <p className="max-w-xl mx-auto mt-5 font-light text-lg" style={{ color: 'rgba(15, 23, 42,0.46)' }}>
                Principles that guide TheSafeHive verification-first approach.
              </p>
            </div>
          </ScrollReveal>
          <CoreValuesGrid values={coreValues} />
        </div>
      </section>



      {/* ════════ CUSTOMER PROMISE (SOFT_SAND zone) ════════ */}
      <section
        className="relative py-28"
        style={{ backgroundColor: SOFT_SAGE }}
        aria-labelledby="customer-heading"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
        <div className="absolute inset-0 pointer-events-none dot-grid" style={{ opacity: 0.55 }} />
        <div className="container mx-auto px-6 relative z-10">
          <SectionRule label="The Customer View" />

          <ScrollReveal variant="fade">
            <div className="text-center mb-16">
              <h2
                id="customer-heading"
                className="font-display text-charcoal leading-none mb-6"
                style={{ fontSize: 'clamp(2.4rem,6vw,5.5rem)' }}
              >
                WHAT THIS MEANS<br /><span className="text-cyan-500">FOR YOU</span>
              </h2>
              <p className="max-w-xl mx-auto font-light text-lg" style={{ color: 'rgba(15, 23, 42,0.50)' }}>
                Technology is our engine, but safety is our destination.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {customerPromise.map(({ icon: Icon, title, description }) => (
                <StaggerItem key={title} variant="slide-up">
                  <motion.div
                    whileHover="hover"
                    initial="initial"
                    className="hover-card bg-white rounded-2xl p-8 border flex gap-6 h-full cursor-default"
                    style={{ boxShadow: '0 2px 14px rgba(0,0,0,0.04)', borderColor: 'rgba(15, 23, 42,0.07)' }}
                  >
                    <motion.div
                      variants={{
                        initial: { scale: 1, rotate: 0, backgroundColor: '#22211F' },
                        hover: { scale: 1.1, rotate: 4, backgroundColor: '#06B6D4' }
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <Icon className="h-6 w-6 flex-shrink-0" style={{ color: VANILLA }} strokeWidth={1.5} />
                    </motion.div>
                    <div>
                      <h3 className="font-heading text-charcoal text-xl mb-3">{title}</h3>
                      <p className="font-light leading-relaxed text-sm" style={{ color: 'rgba(15, 23, 42,0.68)' }}>{description}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Promise callout */}
          <ScrollReveal variant="scale" delay={0.1}>
            <div
              className="max-w-4xl mx-auto mt-14 bg-white rounded-2xl p-10 border text-center"
              style={{ boxShadow: '0 4px 22px rgba(0,0,0,0.04)', borderColor: 'rgba(15, 23, 42,0.05)' }}
            >
              <HeartHandshake
                className="h-10 w-10 mx-auto mb-6 text-cyan-500"
                strokeWidth={1.5}
              />
              <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#0891B2' }}>
                TheSafeHive Promise
              </p>
              <p className="font-light text-lg leading-relaxed" style={{ color: 'rgba(15, 23, 42,0.58)' }}>
                TheSafeHive is building a verified marketplace grounded in evidence, transparency,
                and community feedback. TheSafeHive is not here to scare you. TheSafeHive is here
                to give you clarity you can trust.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TornPaper: SOFT_SAGE → SOFT_SAND ────────── */}
      <TornPaper from={SOFT_SAGE} to={SOFT_SAND} height={72} />

      {/* ════════ LOOKING AHEAD (VANILLA zone) ════════ */}
      <section
        className="relative py-24"
        style={{ backgroundColor: SOFT_SAND }}
        aria-labelledby="future-heading"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
        <div className="absolute inset-0 pointer-events-none dot-grid" style={{ opacity: 0.55 }} />

        {/* Floating small honeycomb */}
        <Parallax offset={50} className="hidden lg:block absolute right-[8%] top-[25%] pointer-events-none drift-slow opacity-12" aria-hidden="true">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path d="M22 2L40 12V32L22 42L4 32V12L22 2Z" stroke="rgba(15, 23, 42,0.20)" strokeWidth="1" fill="none" />
          </svg>
        </Parallax>

        <div className="container mx-auto px-6 relative z-10">
          <SectionRule label="Looking Ahead" />

          <ScrollReveal variant="fade">
            <div className="text-center mb-16">
              <h2
                id="future-heading"
                className="font-display text-charcoal leading-none"
                style={{ fontSize: 'clamp(2.4rem,6vw,5.5rem)' }}
              >
                LOOKING <span className="text-terracotta">AHEAD</span>
              </h2>
              <p className="max-w-xl mx-auto mt-5 font-light text-lg" style={{ color: 'rgba(15, 23, 42,0.46)' }}>
                As TheSafeHive evolves, we aim to expand safety intelligence capabilities through:
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.12}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {futurePlans.map(({ icon: Icon, title, description }) => (
                <StaggerItem key={title} variant="scale">
                  <div
                    className="hover-card bg-white rounded-2xl p-10 border text-center h-full group"
                    style={{ boxShadow: '0 2px 14px rgba(0,0,0,0.04)', borderColor: 'rgba(15, 23, 42,0.07)' }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                      style={{ background: 'rgba(184, 92, 56,0.08)' }}
                    >
                      <Icon className="h-8 w-8 hover-icon" style={{ color: '#B85C38' }} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-charcoal text-xl mb-4">{title}</h3>
                    <p className="font-light leading-relaxed text-sm" style={{ color: 'rgba(15, 23, 42,0.68)' }}>{description}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ── TornPaper: SOFT_SAND → VANILLA ────────── */}
      <TornPaper from={SOFT_SAND} to={VANILLA} height={72} />

      {/* ════════════════════════════════════════════════════════════════
          STORY
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-24"
        style={{ backgroundColor: VANILLA }}
        aria-label="TheSafeHive Story"
      >
        <div className="absolute inset-0 pointer-events-none" style={paperStyle} />
        <div className="absolute inset-0 pointer-events-none dot-grid" style={{ opacity: 0.55 }} />
        <div className="container mx-auto px-6 relative z-10">
          <SectionRule label="The Story" />

          <div className="max-w-3xl mx-auto">
            <ScrollReveal variant="slide-up">
              <h2
                className="font-display text-charcoal leading-none mb-12"
                style={{ fontSize: 'clamp(2.4rem,6vw,5.5rem)' }}
              >
                TheSafeHive <span className="text-terracotta">STORY</span>
              </h2>
            </ScrollReveal>

            <div className="space-y-7">
              {[
                'TheSafeHive was born to solve a data problem. The £14B personal care market lacks a unified safety standard. We built the TheSafeHive Protocol to bridge the gap between complex chemical data and consumer buying decisions.',
                'When I first arrived in the UK, I was struck by the sheer number of products claiming to be "eco", "green", or "safe". But the more I looked, the more overwhelming it became. Labels were confusing, ingredient lists were full of jargon, and marketing was often designed to reassure without evidence.',
                `I realised I wasn't alone. Many people want to make healthier choices, but they get stuck in a maze of vague claims, inconsistent ingredient disclosures, and decision fatigue. TheSafeHive exists to cut through the noise and make chemical safety easier to understand, easier to compare, and easier to act on.`,
              ].map((para, i) => (
                <ScrollReveal key={i} variant="fade" delay={i * 0.1}>
                  <p className="text-lg leading-relaxed font-light" style={{ color: 'rgba(15, 23, 42,0.58)' }}>{para}</p>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal variant="scale" delay={0.2}>
              <div
                className="mt-14 rounded-2xl p-10 border"
                style={{
                  background: 'rgba(184, 92, 56,0.05)',
                  borderColor: 'rgba(184, 92, 56,0.14)',
                }}
              >
                <Leaf className="h-8 w-8 text-terracotta mb-6" strokeWidth={1.5} />
                <blockquote
                  className="font-heading italic text-charcoal leading-relaxed mb-5"
                  style={{ fontSize: 'clamp(1.2rem,2vw,1.6rem)' }}
                >
                  "TheSafeHive turns chemical safety into clear, usable decisions."
                </blockquote>
                <p className="font-mono text-xs tracking-widest" style={{ color: 'rgba(15, 23, 42,0.45)' }}>
                  — TheSafeHive Team
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


    </div>
  );
};

export default About;
