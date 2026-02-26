// src/components/layout/Footer.tsx — Soft Sand Palette
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Leaf, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../animations/MagneticButton';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../animations/ScrollReveal';
import { SVGPathDraw } from '../animations/SVGPathDraw';

// ── Palette ────────────────────────────────────────────────────────────────────
const VANILLA = '#FAF5E4';
const SOFT_SAND = '#F0E7DB';
const TERRACOTTA = '#B85C38';
const CHARCOAL = '#22211F';

// ── Inline paper texture ───────────────────────────────────────────────────────
const paperStyle: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'repeat',
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      console.log('Newsletter signup:', email);
      setSubmitted(true);
    }
  };

  return (
    <footer className="relative overflow-hidden" aria-label="Site footer"
      style={{ backgroundColor: SOFT_SAND }}>

      {/* Paper texture overlay */}
      <div className="absolute inset-0 pointer-events-none" style={paperStyle} />

      {/* Subtle warm glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(184,92,56,0.08)' }} />

      <div className="relative z-10 container mx-auto px-6 pt-20 pb-12">

        {/* ── Big headline ── */}
        <ScrollReveal variant="fade">
          <div className="text-center mb-16">
            <h2 className="font-display leading-none tracking-widest"
              style={{ fontSize: 'clamp(3.5rem,10vw,9rem)', color: CHARCOAL }}>
              GET IN <span className="text-terracotta">TOUCH</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Decorative path */}
        <div className="flex justify-center mb-14">
          <SVGPathDraw
            d="M 0 5 Q 100 0 200 5 Q 300 10 400 5"
            width={400} height={20}
            strokeColor="rgba(34,33,31,0.15)"
            strokeWidth={1}
          />
        </div>

        {/* ── CTA + Newsletter ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-center">
          {/* Left: CTA */}
          <ScrollReveal variant="slide-right">
            <p className="text-lg font-light mb-8 leading-relaxed max-w-md"
              style={{ color: 'rgba(34,33,31,0.60)' }}>
              Questions about chemical safety? Want to verify a product?
              Reach out — we're a real team that actually responds.
            </p>
            <MagneticButton strength={0.4}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 font-display tracking-widest text-xl px-10 py-5 rounded-full no-underline group transition-all duration-300"
                style={{
                  background: TERRACOTTA,
                  color: VANILLA,
                  boxShadow: '0 8px 36px rgba(184,92,56,0.22)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#A34E2F';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = TERRACOTTA;
                }}
              >
                CONTACT US
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </MagneticButton>
          </ScrollReveal>

          {/* Right: Newsletter */}
          <ScrollReveal variant="slide-up" delay={0.15}>
            <div className="rounded-2xl p-8 border"
              style={{ background: 'white', borderColor: 'rgba(34,33,31,0.07)', boxShadow: '0 4px 22px rgba(0,0,0,0.03)' }}>
              <h3 className="font-heading text-charcoal text-2xl mb-2">Stay informed.</h3>
              <p className="text-sm mb-6 font-light" style={{ color: 'rgba(34,33,31,0.60)' }}>
                SVA-1 updates, safety research, and clean living guides.
              </p>
              {submitted ? (
                <p className="font-mono text-sm" style={{ color: TERRACOTTA }}>✓ You're on the list.</p>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 rounded-xl font-mono text-sm focus:outline-none transition-colors duration-300"
                    style={{
                      border: '1px solid rgba(34,33,31,0.10)',
                      color: CHARCOAL,
                      background: 'transparent'
                    }}
                    onFocus={e => (e.target.style.borderColor = TERRACOTTA)}
                    onBlur={e => (e.target.style.borderColor = 'rgba(34,33,31,0.10)')}
                  />
                  <button
                    type="submit"
                    className="font-display tracking-widest justify-center px-5 py-3 rounded-xl text-sm whitespace-nowrap w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: CHARCOAL, color: VANILLA }}
                  >
                    JOIN
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* ── Bottom grid ── */}
        <div className="pt-10 border-t" style={{ borderColor: 'rgba(34,33,31,0.08)' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2.5 mb-6 no-underline group">
                <Leaf className="h-5 w-5 group-hover:rotate-12 transition-transform duration-500"
                  style={{ color: TERRACOTTA }} strokeWidth={1.5} />
                <span className="font-display text-2xl tracking-widest" style={{ color: CHARCOAL }}>SAFEHIVE</span>
              </Link>
              <p className="text-sm leading-relaxed max-w-xs font-light" style={{ color: 'rgba(34,33,31,0.60)' }}>
                Evidence-based chemical safety for conscious families.<br />
                Powered by the SVA-1 verification protocol.
              </p>
              <div className="flex gap-4 mt-6">
                {[
                  { href: 'https://www.instagram.com/thesafehive', Icon: Instagram, label: 'Instagram' },
                  { href: 'https://www.linkedin.com/company/thesafehive', Icon: Linkedin, label: 'LinkedIn' },
                ].map(({ href, Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="no-underline transition-colors duration-300"
                    style={{ color: 'rgba(34,33,31,0.40)' }}
                    whileHover={{ scale: 1.12, color: TERRACOTTA }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Pages */}
            <StaggerContainer>
              <h4 className="font-mono text-xs tracking-widest uppercase mb-5"
                style={{ color: 'rgba(34,33,31,0.70)' }}>Pages</h4>
              <ul className="space-y-3 list-none m-0 p-0">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/about', label: 'About' },
                  { to: '/blog', label: 'Blog' },
                  { to: '/learn', label: 'Hub' },
                  { to: '/contact', label: 'Contact' },
                ].map(({ to, label }) => (
                  <StaggerItem key={to}>
                    <Link to={to} className="text-sm no-underline transition-colors duration-300"
                      style={{ color: 'rgba(34,33,31,0.50)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = TERRACOTTA)}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(34,33,31,0.50)')}>
                      {label}
                    </Link>
                  </StaggerItem>
                ))}
              </ul>
            </StaggerContainer>

            {/* Legal */}
            <StaggerContainer>
              <h4 className="font-mono text-xs tracking-widest uppercase mb-5"
                style={{ color: 'rgba(34,33,31,0.70)' }}>Legal</h4>
              <ul className="space-y-3 list-none m-0 p-0">
                {[
                  { to: '/privacy-policy', label: 'Privacy Policy' },
                  { to: '/terms-of-service', label: 'Terms of Service' },
                  { to: '/cookie-policy', label: 'Cookie Policy' },
                ].map(({ to, label }) => (
                  <StaggerItem key={to}>
                    <Link to={to} className="text-sm no-underline transition-colors duration-300"
                      style={{ color: 'rgba(34,33,31,0.50)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = TERRACOTTA)}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(34,33,31,0.50)')}>
                      {label}
                    </Link>
                  </StaggerItem>
                ))}
              </ul>
            </StaggerContainer>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t"
            style={{ borderColor: 'rgba(34,33,31,0.08)' }}>
            <p className="font-mono text-xs" style={{ color: 'rgba(34,33,31,0.40)' }}>
              © {currentYear} THESAFEHIVE · SVA-1 Protocol
            </p>
            <p className="font-mono text-xs tracking-wider" style={{ color: 'rgba(34,33,31,0.40)' }}>
              SANCTUARY, NOT SPECULATION
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
