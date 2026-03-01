// src/components/layout/Footer.tsx — Soft Sand Palette
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Leaf, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../animations/MagneticButton';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../animations/ScrollReveal';

// ── Palette ────────────────────────────────────────────────────────────────────
const VANILLA = '#F8FAFC';
const SOFT_SAND = '#F1F5F9';
const TERRACOTTA = '#B85C38';
const CHARCOAL = '#0F172A';

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
        style={{ background: 'rgba(184, 92, 56,0.08)' }} />

      <div className="relative z-10 container mx-auto px-6 pt-20 pb-12">

        <div className="pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">

            {/* Brand + Contact */}
            <div className="md:col-span-12 lg:col-span-4 lg:pr-8">
              <Link to="/" className="flex items-center gap-2.5 mb-6 no-underline group">
                <Leaf className="h-6 w-6 group-hover:-rotate-12 transition-transform duration-500"
                  style={{ color: TERRACOTTA }} strokeWidth={1.5} />
                <span className="font-display text-2xl" style={{ color: CHARCOAL }}>THESAFEHIVE</span>
              </Link>
              <p className="text-sm leading-relaxed max-w-sm font-light mb-8" style={{ color: 'rgba(15, 23, 42,0.60)' }}>
                Questions about chemical safety? Want to verify a product?
                Reach out — we're a real team that actually responds.
              </p>

              <MagneticButton strength={0.2}>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 font-display text-lg px-10 py-4 rounded-full no-underline group transition-all duration-300 transform hover:-translate-y-1"
                  style={{
                    background: TERRACOTTA,
                    color: VANILLA,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#8C4428';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = TERRACOTTA;
                  }}
                >
                  CONTACT US
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </MagneticButton>

              <div className="flex gap-4 mt-12">
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
                    style={{ color: 'rgba(15, 23, 42,0.40)' }}
                    whileHover={{ scale: 1.12, color: TERRACOTTA }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Pages */}
            <div className="md:col-span-6 lg:col-span-2 lg:col-start-6">
              <StaggerContainer>
                <h4 className="font-mono text-xs tracking-widest uppercase mb-6"
                  style={{ color: 'rgba(15, 23, 42,0.70)' }}>Pages</h4>
                <ul className="space-y-4 list-none m-0 p-0">
                  {[
                    { to: '/', label: 'Home' },
                    { to: '/about', label: 'About' },
                    { to: '/blog', label: 'Blog' },
                    { to: '/learn', label: 'Hub' },
                    { to: '/contact', label: 'Contact' },
                  ].map(({ to, label }) => (
                    <StaggerItem key={to}>
                      <Link to={to} className="text-sm no-underline transition-colors duration-300 font-light"
                        style={{ color: 'rgba(15, 23, 42,0.50)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = TERRACOTTA)}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(15, 23, 42,0.50)')}>
                        {label}
                      </Link>
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerContainer>
            </div>

            {/* Legal */}
            <div className="md:col-span-6 lg:col-span-2">
              <StaggerContainer>
                <h4 className="font-mono text-xs tracking-widest uppercase mb-6"
                  style={{ color: 'rgba(15, 23, 42,0.70)' }}>Legal</h4>
                <ul className="space-y-4 list-none m-0 p-0">
                  {[
                    { to: '/privacy-policy', label: 'Privacy Policy' },
                    { to: '/terms-of-service', label: 'Terms of Service' },
                    { to: '/cookie-policy', label: 'Cookie Policy' },
                  ].map(({ to, label }) => (
                    <StaggerItem key={to}>
                      <Link to={to} className="text-sm no-underline transition-colors duration-300 font-light"
                        style={{ color: 'rgba(15, 23, 42,0.50)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = TERRACOTTA)}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(15, 23, 42,0.50)')}>
                        {label}
                      </Link>
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerContainer>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-12 lg:col-span-3">
              <ScrollReveal variant="slide-up">
                <h4 className="font-mono text-xs tracking-widest uppercase mb-6"
                  style={{ color: 'rgba(15, 23, 42,0.70)' }}>Stay Informed</h4>
                <p className="text-sm mb-6 font-light leading-relaxed" style={{ color: 'rgba(15, 23, 42,0.60)' }}>
                  SVA-1 updates, safety research, and clean living guides.
                </p>
                {submitted ? (
                  <p className="font-mono text-sm" style={{ color: TERRACOTTA }}>✓ You're on the list.</p>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3.5 rounded-xl font-mono text-sm focus:outline-none transition-colors duration-300"
                      style={{
                        border: '1px solid rgba(15, 23, 42,0.12)',
                        color: CHARCOAL,
                        background: 'transparent'
                      }}
                      onFocus={e => (e.target.style.borderColor = TERRACOTTA)}
                      onBlur={e => (e.target.style.borderColor = 'rgba(15, 23, 42,0.12)')}
                    />
                    <button
                      type="submit"
                      className="font-display justify-center px-5 py-3.5 rounded-xl text-sm transition-all duration-300 hover:-translate-y-0.5"
                      style={{ background: CHARCOAL, color: VANILLA }}
                    >
                      JOIN
                    </button>
                  </form>
                )}
              </ScrollReveal>
            </div>

          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t"
            style={{ borderColor: 'rgba(15, 23, 42,0.08)' }}>
            <p className="font-mono text-xs" style={{ color: 'rgba(15, 23, 42,0.40)' }}>
              © {currentYear} THESAFEHIVE · SVA-1 Protocol
            </p>
            <p className="font-mono text-xs tracking-wider" style={{ color: 'rgba(15, 23, 42,0.40)' }}>
              SANCTUARY, NOT SPECULATION
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
