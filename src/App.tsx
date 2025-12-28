import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './utils/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Learn from './pages/learn';
import { Page } from './types/navigation';
// Vercel Analytics
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';


// Lazy-loaded policy/legal pages
const CookiePolicy = lazy(() => import('./pages/cookie-policy'));
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy'));

const TermsOfService = lazy(() => import('./pages/terms-of-service'));

const Campaign2026 = lazy(() => import('./features/campaign2026/Campaign2026Container'));


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* Campaign Route (No Navbar/Footer) */}
        <Route path="/campaign-2026" element={
          <Suspense fallback={<div className="bg-black min-h-screen text-white flex items-center justify-center">Loading...</div>}>
            <Campaign2026 />
          </Suspense>
        } />

        {/* Main Site Routes (With Navbar/Footer) */}
        <Route element={<MainLayout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
          {/* Core */}
          <Route path="/" element={<Home setCurrentPage={setCurrentPage} />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          {/* Optional 404 */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>

      <SpeedInsights />
      <Analytics />
    </Router>
  );
}

export default App;
