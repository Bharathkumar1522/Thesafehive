import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-[100] p-3 rounded-full shadow-2xl transition-all duration-300 group focus:outline-none"
                    style={{ background: '#FAF5E4', border: '1px solid rgba(15, 23, 42,0.1)' }}
                    aria-label="Scroll to top"
                >
                    <div className="absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100" style={{ background: '#B85C38' }} />
                    <ArrowUp className="w-6 h-6 relative z-10 transition-colors duration-300 text-charcoal group-hover:text-[#FAF5E4]" strokeWidth={1.5} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
