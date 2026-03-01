import { Suspense } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { ScrollToTopButton } from '../ui/ScrollToTopButton';
import { getLenis } from '../../hooks/useLenis';

interface MainLayoutProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

export default function MainLayout({ isLoggedIn, onLogout }: MainLayoutProps) {
    const location = useLocation();
    const outlet = useOutlet();

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden max-w-[100vw] w-full relative" style={{ backgroundColor: '#F8FAFC' }}>
            <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
            <main className="flex-grow w-full max-w-[100vw] relative z-10">
                <AnimatePresence
                    mode="wait"
                    initial={false}
                    onExitComplete={() => {
                        window.scrollTo(0, 0);
                        getLenis()?.scrollTo(0, { immediate: true });
                    }}
                >
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                            type: 'spring',
                            damping: 24,
                            stiffness: 85,
                            mass: 1,
                        }}
                        className="w-full h-full"
                    >
                        <Suspense fallback={null}>
                            {outlet}
                        </Suspense>
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}
