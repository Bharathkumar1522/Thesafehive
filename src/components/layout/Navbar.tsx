// src/components/layout/Navbar.tsx
import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import { routePrefetchers } from '../../routes/prefetch';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar = ({ isLoggedIn, onLogout }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  // Header shadow on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock & Escape to close on mobile menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
          toggleBtnRef.current?.focus();
        }
      };
      window.addEventListener('keydown', onKey);
      return () => {
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Prefetch helper
  const prefetch = (path: string) => {
    routePrefetchers[path]?.().catch(() => {});
  };

  // Auto‑prefetch top routes when idle (tiny boost)
  useEffect(() => {
    const idle = (window as any).requestIdleCallback || ((cb: Function) => setTimeout(cb, 400));
    const handles = [
      idle(() => prefetch('/blog')),
      idle(() => prefetch('/learn')),
    ];
    return () => {
      const cancel = (window as any).cancelIdleCallback || clearTimeout;
      handles.forEach(cancel);
    };
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
      role="banner"
    >
      <nav className="container mx-auto px-4 flex justify-between items-center" aria-label="Primary">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-green-600"
          onClick={closeMenu}
          onMouseEnter={() => prefetch('/')}
          onFocus={() => prefetch('/')}
        >
          <Leaf className="h-8 w-8" aria-hidden="true" />
          <span className="font-heading font-bold text-xl md:text-2xl">TheSafeHive</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => navLinkClass(isActive)}
              onMouseEnter={() => prefetch('/')}
              onFocus={() => prefetch('/')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => navLinkClass(isActive)}
              onMouseEnter={() => prefetch('/about')}
              onFocus={() => prefetch('/about')}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) => navLinkClass(isActive)}
              onMouseEnter={() => prefetch('/blog')}
              onFocus={() => prefetch('/blog')}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/learn"
              className={({ isActive }) => navLinkClass(isActive)}
              onMouseEnter={() => prefetch('/learn')}
              onFocus={() => prefetch('/learn')}
            >
              Learn
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => navLinkClass(isActive)}
              onMouseEnter={() => prefetch('/contact')}
              onFocus={() => prefetch('/contact')}
            >
              Contact
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <button
                onClick={onLogout}
                className="text-sm font-medium text-gray-800 hover:text-green-600"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Toggle Button */}
        <button
          ref={toggleBtnRef}
          className="md:hidden text-gray-800"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`fixed inset-0 z-40 bg-white transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-green-600"
              onClick={closeMenu}
              onMouseEnter={() => prefetch('/')}
              onFocus={() => prefetch('/')}
            >
              <Leaf className="h-8 w-8" aria-hidden="true" />
              <span className="font-heading font-bold text-xl">TheSafeHive</span>
            </Link>
            <button className="text-gray-800" onClick={toggleMenu} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>

          <ul className="space-y-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => mobileLinkClass(isActive)}
                onClick={closeMenu}
                onMouseEnter={() => prefetch('/')}
                onFocus={() => prefetch('/')}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => mobileLinkClass(isActive)}
                onClick={closeMenu}
                onMouseEnter={() => prefetch('/about')}
                onFocus={() => prefetch('/about')}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) => mobileLinkClass(isActive)}
                onClick={closeMenu}
                onMouseEnter={() => prefetch('/blog')}
                onFocus={() => prefetch('/blog')}
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/learn"
                className={({ isActive }) => mobileLinkClass(isActive)}
                onClick={closeMenu}
                onMouseEnter={() => prefetch('/learn')}
                onFocus={() => prefetch('/learn')}
              >
                Learn
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => mobileLinkClass(isActive)}
                onClick={closeMenu}
                onMouseEnter={() => prefetch('/contact')}
                onFocus={() => prefetch('/contact')}
              >
                Contact
              </NavLink>
            </li>

            {isLoggedIn ? (
              <li>
                <button
                  onClick={() => {
                    onLogout();
                    closeMenu();
                  }}
                  className="text-lg font-medium text-gray-800 hover:text-green-600"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/join"
                  className="block w-full text-center text-lg font-medium py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                  onClick={closeMenu}
                  onMouseEnter={() => prefetch('/join')}
                  onFocus={() => prefetch('/join')}
                >
                  Join Us
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

/* ---- styles ---- */
const navLinkClass = (isActive: boolean) =>
  `text-sm font-medium transition-colors hover:text-green-600 ${
    isActive ? 'text-green-600' : 'text-gray-800'
  }`;

const mobileLinkClass = (isActive: boolean) =>
  `block text-lg font-medium transition-colors hover:text-green-600 ${
    isActive ? 'text-green-600' : 'text-gray-800'
  }`;

export default Navbar;
