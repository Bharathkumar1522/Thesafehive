// src/components/layout/Navbar.tsx
import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Leaf, Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { routePrefetchers } from '../../routes/prefetch';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

// ─── Colour tokens (hero bg is warm cream so nav is always dark) ──────────────
const C_BRAND = '#22211F';          // charcoal
const C_ACTIVE = '#B85C38';          // terracotta
const C_MUTED = 'rgba(15, 23, 42,0.42)';
const C_HOVER = 'rgba(15, 23, 42,0.75)';
const C_GLASS = 'rgba(248, 250, 252,0.86)'; // warm cream scroll glass

const Navbar = ({ isLoggedIn, onLogout }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shopHovered, setShopHovered] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => setIsOpen(v => !v);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsOpen(false); toggleBtnRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [isOpen]);

  const prefetch = (path: string) => { routePrefetchers[path]?.().catch(() => { }); };

  useEffect(() => {
    const idle =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback
      || ((cb: () => void) => setTimeout(cb, 400));
    const handles = [idle(() => prefetch('/learn'))];
    return () => {
      const cancel =
        (window as unknown as { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback
        || clearTimeout;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handles.forEach(h => cancel(h as any));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/learn', label: 'Hub' },
    { to: '/sva', label: 'SVA' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* ── Desktop / main bar ─────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'
          }`}
        style={
          isScrolled
            ? {
              background: C_GLASS,
              backdropFilter: 'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',
              borderBottom: '1px solid rgba(15, 23, 42,0.07)',
              boxShadow: '0 1px 20px rgba(15, 23, 42,0.05)',
            }
            : {}
        }
        role="banner"
      >
        <nav className="container mx-auto px-6 flex justify-between items-center" aria-label="Primary">

          {/* Brand ─────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group no-underline select-none"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              closeMenu();
            }}
            onMouseEnter={() => prefetch('/')}
          >
            <Leaf
              className="h-6 w-6 group-hover:rotate-12 transition-transform duration-500"
              style={{ color: '#B85C38' }}
              aria-hidden="true"
              strokeWidth={1.5}
            />
            <span
              className="font-display text-2xl md:text-[1.65rem] tracking-[0.2em] transition-opacity duration-300 group-hover:opacity-75"
              style={{ color: C_BRAND }}
            >
              THESAFEHIVE
            </span>
          </Link>

          {/* Desktop links ──────────────────────────── */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {/* Home link — always first */}
            <li key="/">
              <NavLink
                to="/"
                end
                onMouseEnter={() => prefetch('/')}
                className="no-underline relative block"
                style={({ isActive }) => ({
                  fontFamily: 'inherit',
                  fontSize: '0.78rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  color: isActive ? C_ACTIVE : C_MUTED,
                  transition: 'color 0.25s',
                })}
                onMouseOver={e => { const el = e.currentTarget as HTMLElement; if (el.style.color !== C_ACTIVE) el.style.color = C_HOVER; }}
                onMouseOut={e => { const el = e.currentTarget as HTMLElement; if (el.style.color !== C_ACTIVE) el.style.color = C_MUTED; }}
              >
                {({ isActive }) => (
                  <>
                    Home
                    {isActive && (
                      <motion.div layoutId="nav-indicator-desktop" className="absolute left-0 right-0 -bottom-1.5 h-0.5 rounded-full" style={{ background: C_ACTIVE }} transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                    )}
                  </>
                )}
              </NavLink>
            </li>

            {/* Shop — Coming Soon (2nd position) */}
            <li className="relative" onMouseEnter={() => setShopHovered(true)} onMouseLeave={() => setShopHovered(false)}>
              <button
                style={{ fontFamily: 'inherit', fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, color: shopHovered ? C_HOVER : C_MUTED, transition: 'color 0.25s', background: 'none', border: 'none', cursor: 'default', padding: 0, lineHeight: 1, verticalAlign: 'middle', display: 'block' }}
                aria-label="Shop — Coming Soon"
                tabIndex={-1}
              >
                Shop
              </button>
              <AnimatePresence>
                {shopHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 mt-4 w-64 rounded-2xl z-[80] pointer-events-none"
                    style={{ background: '#ffffff', boxShadow: '0 12px 48px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06)', border: '1px solid rgba(15,23,42,0.07)' }}
                  >
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <ShoppingBag className="h-4 w-4" style={{ color: C_ACTIVE }} strokeWidth={1.5} />
                        <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: C_ACTIVE }}>Shop</span>
                      </div>
                      <p className="font-light text-sm leading-relaxed mb-4" style={{ color: 'rgba(15,23,42,0.65)' }}>
                        We're curating the brands and products.
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border" style={{ borderColor: C_ACTIVE, color: C_ACTIVE }}>Coming Soon</span>
                        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(15,23,42,0.38)' }}>Stay Tuned</span>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute -top-2 left-6 w-3.5 h-3.5 rotate-45" style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.07)', borderBottom: 'none', borderRight: 'none' }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Remaining nav links */}
            {NAV_LINKS.filter(l => l.to !== '/').map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onMouseEnter={() => prefetch(to)}
                  className="no-underline relative block"
                  style={({ isActive }) => ({ fontFamily: 'inherit', fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, color: isActive ? C_ACTIVE : C_MUTED, transition: 'color 0.25s' })}
                  onMouseOver={e => { const el = e.currentTarget as HTMLElement; if (el.style.color !== C_ACTIVE) el.style.color = C_HOVER; }}
                  onMouseOut={e => { const el = e.currentTarget as HTMLElement; if (el.style.color !== C_ACTIVE) el.style.color = C_MUTED; }}
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <motion.div layoutId="nav-indicator-desktop" className="absolute left-0 right-0 -bottom-1.5 h-0.5 rounded-full" style={{ background: C_ACTIVE }} transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger ───────────────────────── */}
          <button
            ref={toggleBtnRef}
            className="md:hidden transition-opacity duration-200 hover:opacity-60"
            style={{ color: C_BRAND, background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header >

      {/* ── Mobile drawer ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {
          isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[60] flex flex-col"
              style={{ background: C_BRAND }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col h-full px-8 py-6">
                {/* Drawer header */}
                <div className="flex justify-between items-center mb-14">
                  <Link to="/" className="flex items-center gap-2.5 no-underline" onClick={closeMenu}>
                    <Leaf className="h-6 w-6" style={{ color: '#B85C38' }} strokeWidth={1.5} />
                    <span className="font-display text-3xl tracking-[0.2em]" style={{ color: '#FAF5E4' }}>THESAFEHIVE</span>
                  </Link>
                  <button
                    onClick={toggleMenu}
                    className="transition-opacity hover:opacity-60"
                    style={{ color: '#FAF5E4', background: 'none', border: 'none', cursor: 'pointer' }}
                    aria-label="Close menu"
                  >
                    <X className="h-7 w-7" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Links */}
                <ul className="space-y-1 list-none m-0 p-0 flex-1">
                  {/* Home — always first */}
                  <motion.li
                    key="/"
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <NavLink
                      to="/"
                      end
                      onClick={closeMenu}
                      className="relative inline-block no-underline py-3 font-display tracking-[0.15em] uppercase transition-colors duration-200"
                      style={({ isActive }) => ({ fontSize: 'clamp(2.5rem, 7vw, 3.5rem)', color: isActive ? '#B85C38' : 'rgba(248, 250, 252,0.72)' })}
                    >
                      {({ isActive }) => (
                        <>
                          Home
                          {isActive && (
                            <motion.div layoutId="nav-indicator-mobile" className="absolute left-0 right-0 bottom-1 h-[3px] rounded-full" style={{ background: '#B85C38' }} transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.li>

                  {/* Shop — Coming Soon (2nd position) */}
                  <motion.li
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.145, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="py-3 font-display tracking-[0.15em] uppercase"
                      style={{ fontSize: 'clamp(2.5rem, 7vw, 3.5rem)', color: 'rgba(248, 250, 252,0.28)', cursor: 'default' }}
                    >
                      Shop
                    </span>
                    <span
                      className="font-mono text-[9px] tracking-widest uppercase px-2 py-1 rounded-full border self-center"
                      style={{ borderColor: 'rgba(248,250,252,0.18)', color: 'rgba(248,250,252,0.35)' }}
                    >
                      Soon
                    </span>
                  </motion.li>

                  {/* Remaining links */}
                  {NAV_LINKS.filter(l => l.to !== '/').map(({ to, label }, i) => (
                    <motion.li
                      key={to}
                      initial={{ opacity: 0, x: 32 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.21 + i * 0.065, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <NavLink
                        to={to}
                        onClick={closeMenu}
                        className="relative inline-block no-underline py-3 font-display tracking-[0.15em] uppercase transition-colors duration-200"
                        style={({ isActive }) => ({ fontSize: 'clamp(2.5rem, 7vw, 3.5rem)', color: isActive ? '#B85C38' : 'rgba(248, 250, 252,0.72)' })}
                      >
                        {({ isActive }) => (
                          <>
                            {label}
                            {isActive && (
                              <motion.div layoutId="nav-indicator-mobile" className="absolute left-0 right-0 bottom-1 h-[3px] rounded-full" style={{ background: '#B85C38' }} transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                            )}
                          </>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>

                {/* Footer note */}
                <div className="pt-8 border-t" style={{ borderColor: 'rgba(248, 250, 252,0.08)' }}>
                  <p className="font-mono text-xs tracking-widest" style={{ color: 'rgba(248, 250, 252,0.22)' }}>
                    SVA · Chemical Safety Platform
                  </p>
                </div>
              </div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </>
  );
};

export default Navbar;
