import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './utils/ScrollToTop';
import Home from './pages/Home';
import { useLenis } from './hooks/useLenis';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

// ─── Lazy Loaded Routes (Code Splitting) ─────────────────────────
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Learn = lazy(() => import('./pages/learn'));

// Lazy-loaded policy/legal pages
const CookiePolicy = lazy(() => import('./pages/cookie-policy'));
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy'));
const TermsOfService = lazy(() => import('./pages/terms-of-service'));
const Campaign2026 = lazy(() => import('./features/campaign2026/Campaign2026Container'));

// Global fallback loader for lazy routes
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF5E4' }}>
    <div className="font-mono text-sm tracking-widest uppercase animate-pulse" style={{ color: 'rgba(34,33,31,0.4)' }}>
      Loading...
    </div>
  </div>
);

function AppInner() {
  useLenis(); // Initialise Lenis smooth scroll for all routes
  return null;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <ScrollToTop />
      <AppInner />

      <Routes>
        {/* Campaign Route (No Navbar/Footer) */}
        <Route path="/campaign-2026" element={
          <Suspense fallback={<div className="bg-carbon min-h-screen text-oat flex items-center justify-center font-mono text-sm">Loading...</div>}>
            <Campaign2026 />
          </Suspense>
        } />

        {/* Main Site Routes (With Navbar/Footer) */}
        <Route element={<MainLayout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
          <Route path="/blog" element={<Suspense fallback={<PageLoader />}><Blog /></Suspense>} />
          <Route path="/blog/:slug" element={<Suspense fallback={<PageLoader />}><BlogPost /></Suspense>} />
          <Route path="/learn" element={<Suspense fallback={<PageLoader />}><Learn /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
          <Route path="/login" element={<Suspense fallback={<PageLoader />}><Login onLogin={handleLogin} /></Suspense>} />

          <Route path="/privacy-policy" element={<Suspense fallback={null}><PrivacyPolicy /></Suspense>} />
          <Route path="/terms-of-service" element={<Suspense fallback={null}><TermsOfService /></Suspense>} />
          <Route path="/cookie-policy" element={<Suspense fallback={null}><CookiePolicy /></Suspense>} />
        </Route>
      </Routes>

      <SpeedInsights />
      <Analytics />
    </Router>
  );
}

export default App;
