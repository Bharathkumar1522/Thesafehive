/**
 * learn.tsx — SafeHive Hub / Learn page
 * Full redesign: 3-color architecture (VANILLA / SAGE / TERRACOTTA)
 * with TornPaper organic dividers, font-display headlines,
 * ScrollReveal animations, and the GameHub component.
 */

import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain, Eye, AlertTriangle, Award, Search,
  CheckCircle2, XCircle, ArrowRight, BookOpen,
  ScanText, FileSearch, Activity, Scale, ShieldAlert, Sliders
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/animations/ScrollReveal';
import { TornPaper } from '../components/ui/OrganicSectionDividers';
import { MagneticButton } from '../components/animations/MagneticButton';

const GameHub = lazy(() => import('../games/GameHub'));

// ─── Palette ──────────────────────────────────────────────────────────────────
const VANILLA = '#FAF5E4';
const SOFT_SAGE = '#C7EABB';
const SOFT_SAND = '#F0E7DB';
const TERRACOTTA = '#B85C38';
const CHARCOAL = '#22211F';

// ─── Paper texture (replaced with index.css pattern) ────────
const paperStyle: React.CSSProperties = {};

// ─── Section rule helper ──────────────────────────────────────────────────────
const SectionRule = ({ label, accent = false }: { label: string; accent?: boolean }) => (
  <div className="flex items-center gap-6 mb-16">
    <div className="flex-1 h-px" style={{ background: 'rgba(34,33,31,0.07)' }} />
    <span
      className="font-mono text-[10px] tracking-[0.24em] uppercase"
      style={{ color: accent ? 'rgba(184,92,56,0.5)' : 'rgba(34,33,31,0.22)' }}
    >{label}</span>
    <div className="flex-1 h-px" style={{ background: 'rgba(34,33,31,0.07)' }} />
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
    accentColor: '#C0622A',
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
    accentColor: '#5A8A3C',
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

export default function Learn() {
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
          style={{ background: 'rgba(162,203,139,0.14)' }}
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-mono text-[10px] tracking-[0.28em] uppercase mb-6"
            style={{ color: 'rgba(184,92,56,0.5)' }}
          >
            <Brain className="inline h-3.5 w-3.5 mr-2 -mt-0.5" />
            Interactive Learning Hub
          </motion.p>

          <div className="overflow-hidden mb-2">
            <motion.h1
              id="hub-hero-heading"
              initial={{ y: '105%' }} animate={{ y: '0%' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display leading-none tracking-widest"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', color: CHARCOAL }}
            >
              LEARN &
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
              className="font-display leading-none tracking-widest"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', color: TERRACOTTA }}
            >
              VERIFY
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="max-w-xl mx-auto text-lg leading-relaxed font-light mb-12"
            style={{ color: 'rgba(34,33,31,0.50)' }}
          >
            Pick a game to practice chemical safety knowledge. Science-backed.
            No scores — just real understanding.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="flex flex-col items-center gap-2 mt-8"
          >
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(34,33,31,0.16)' }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
              className="w-px h-10 will-change-transform"
              style={{ background: 'linear-gradient(to bottom, rgba(184,92,56,0.28), transparent)' }}
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
          style={{ ...paperStyle, backgroundImage: `radial-gradient(ellipse at 0% 50%, rgba(184,92,56,0.03) 0%, transparent 60%)` }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <SectionRule label="SVA-1 Architecture" accent />

          <ScrollReveal variant="fade">
            <div className="text-center mb-16">
              <h2
                id="sva-heading"
                className="font-display text-charcoal tracking-widest leading-none mb-6"
                style={{ fontSize: 'clamp(2rem,5vw,4.5rem)' }}
              >
                HOW WE COMPUTE<br /><span className="text-terracotta">SAFETY</span>
              </h2>
              <p className="max-w-2xl mx-auto font-light text-lg leading-relaxed" style={{ color: 'rgba(34,33,31,0.50)' }}>
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
                    style={{ boxShadow: '0 2px 14px rgba(0,0,0,0.04)', borderColor: 'rgba(34,33,31,0.07)' }}
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
                        style={{ borderColor: 'rgba(34,33,31,0.10)', color: 'rgba(34,33,31,0.40)' }}
                      >
                        Stage {step}
                      </span>
                    </div>
                    <h3 className="font-heading text-charcoal text-xl mb-3">{title}</h3>
                    <p className="font-light leading-relaxed text-sm" style={{ color: 'rgba(34,33,31,0.68)' }}>{description}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Non-medical boundary notice */}
          <ScrollReveal variant="scale" delay={0.1}>
            <div
              className="max-w-4xl mx-auto mt-14 bg-white rounded-2xl p-8 border"
              style={{ boxShadow: '0 4px 22px rgba(0,0,0,0.04)', borderColor: 'rgba(184,92,56,0.12)' }}
            >
              <div className="flex items-start gap-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(184,92,56,0.08)' }}
                >
                  <ShieldAlert className="h-6 w-6 text-terracotta" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(184,92,56,0.6)' }}>
                    Non-medical boundary
                  </p>
                  <p className="font-light leading-relaxed" style={{ color: 'rgba(34,33,31,0.58)' }}>
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
              <div className="flex-1 h-px" style={{ background: 'rgba(34,33,31,0.12)' }} />
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(34,33,31,0.36)' }}>Interactive Games</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(34,33,31,0.12)' }} />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade">
            <div className="text-center mb-16">
              <h2
                className="font-display tracking-widest leading-none mb-5"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', color: CHARCOAL }}
              >
                TEST YOUR <span style={{ color: TERRACOTTA }}>KNOWLEDGE</span>
              </h2>
              <p className="max-w-lg mx-auto font-light text-lg" style={{ color: 'rgba(34,33,31,0.56)' }}>
                Pressure-free interactive games to build your chemical safety intuition.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={0.1}>
            <div className="bg-white rounded-3xl p-6 md:p-10 border" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)', borderColor: 'rgba(34,33,31,0.07)' }}>
              <Suspense fallback={
                <div className="h-48 flex items-center justify-center">
                  <span className="font-mono text-sm tracking-widest" style={{ color: 'rgba(34,33,31,0.26)' }}>Loading Hub…</span>
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
              <div className="flex-1 h-px" style={{ background: 'rgba(34,33,31,0.07)' }} />
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(184,92,56,0.5)' }}>Safety Intelligence</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(34,33,31,0.07)' }} />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade">
            <div className="text-center mb-16">
              <h2
                className="font-display tracking-widest leading-none mb-5"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', color: CHARCOAL }}
              >
                HOW TO <span style={{ color: TERRACOTTA }}>IDENTIFY</span>
              </h2>
              <p className="max-w-xl mx-auto font-light text-lg" style={{ color: 'rgba(34,33,31,0.50)' }}>
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
                    style={{ boxShadow: '0 4px 22px rgba(0,0,0,0.04)', borderColor: 'rgba(34,33,31,0.05)' }}
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
                          <span className="font-light text-sm leading-relaxed" style={{ color: 'rgba(34,33,31,0.60)' }}>{item}</span>
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
              <div className="flex-1 h-px" style={{ background: 'rgba(34,33,31,0.12)' }} />
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(34,33,31,0.36)' }}>Guidelines</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(34,33,31,0.12)' }} />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade">
            <div className="text-center mb-16">
              <h2
                className="font-display tracking-widest leading-none mb-5"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', color: CHARCOAL }}
              >
                ESSENTIAL <span style={{ color: TERRACOTTA }}>GUIDELINES</span>
              </h2>
              <p className="max-w-md mx-auto font-light text-lg" style={{ color: 'rgba(34,33,31,0.54)' }}>
                Smart daily habits that make safer choices second nature.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Smart Choices */}
            <ScrollReveal variant="slide-right">
              <div className="bg-white rounded-2xl p-10 border h-full" style={{ boxShadow: '0 4px 28px rgba(0,0,0,0.06)', borderColor: 'rgba(34,33,31,0.06)' }}>
                <div className="flex items-center gap-5 mb-8 pb-6 border-b" style={{ borderColor: 'rgba(34,33,31,0.07)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(162,203,139,0.25)' }}>
                    <CheckCircle2 className="h-6 w-6" style={{ color: '#5A8A3C' }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display tracking-widest text-2xl" style={{ color: CHARCOAL }}>SMART CHOICES</h3>
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
                    <div key={item} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 hover:bg-sage/20" style={{ background: 'rgba(162,203,139,0.08)' }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#5A8A3C' }} />
                      <span className="font-light text-sm" style={{ color: 'rgba(34,33,31,0.68)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Avoid These */}
            <ScrollReveal variant="slide-up" delay={0.1}>
              <div className="bg-white rounded-2xl p-10 border h-full" style={{ boxShadow: '0 4px 28px rgba(0,0,0,0.06)', borderColor: 'rgba(34,33,31,0.06)' }}>
                <div className="flex items-center gap-5 mb-8 pb-6 border-b" style={{ borderColor: 'rgba(34,33,31,0.07)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(184,92,56,0.10)' }}>
                    <XCircle className="h-6 w-6 text-terracotta" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display tracking-widest text-2xl" style={{ color: CHARCOAL }}>AVOID THESE</h3>
                </div>
                <div className="space-y-3">
                  {[
                    'Don\'t trust "natural" or "eco" labels alone',
                    'Avoid products with unknown long chemical names',
                    'Don\'t microwave food in plastic containers',
                    'Avoid antibacterial soaps with triclosan',
                    'Don\'t mix cleaning products',
                    'Avoid aerosol sprays when possible',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200" style={{ background: 'rgba(184,92,56,0.06)' }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: TERRACOTTA }} />
                      <span className="font-light text-sm" style={{ color: 'rgba(34,33,31,0.68)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CTA — SOFT_SAGE
         ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ backgroundColor: SOFT_SAGE }}
        aria-label="Continue Learning"
      >
        <div className="absolute inset-0 pointer-events-none" style={{ ...paperStyle, opacity: 0.5 }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(34,33,31,0.04) 0%, transparent 60%)' }}
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <ScrollReveal variant="fade">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase mb-6"
              style={{ color: 'rgba(34,33,31,0.46)' }}>
              Keep Learning
            </p>
            <h2
              className="font-display tracking-widest leading-none mb-8"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', color: CHARCOAL }}
            >
              READY TO<br /><span style={{ color: 'rgba(34,33,31,0.42)' }}>DIG DEEPER?</span>
            </h2>
            <p className="max-w-md mx-auto font-light leading-relaxed text-lg mb-10"
              style={{ color: 'rgba(34,33,31,0.60)' }}>
              Explore our blog for evidence-based articles on chemical safety, ingredient analysis, and safer living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton strength={0.3}>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-3 font-display tracking-widest text-lg px-10 py-4 rounded-full no-underline group transition-all duration-300"
                  style={{ background: TERRACOTTA, color: VANILLA }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#A34E2F'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = TERRACOTTA; }}
                >
                  <BookOpen className="h-5 w-5" />
                  READ THE BLOG <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 font-display tracking-widest text-lg px-10 py-4 rounded-full border no-underline group transition-all duration-300"
                style={{ borderColor: 'rgba(34,33,31,0.30)', color: CHARCOAL }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,33,31,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                CONTACT US
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TornPaper: SOFT_SAGE → SOFT_SAND (Footer Transition) ──────── */}
      <TornPaper from={SOFT_SAGE} to={SOFT_SAND} height={72} />
    </div>
  );
}
