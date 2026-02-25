import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ParallaxProps {
    children: ReactNode;
    /** Distance in pixels to move. Positive moves down slower (or up slower depending on scroll), negative moves up faster. */
    offset?: number;
    className?: string;
    /** If true, the parallax effect is disabled but the component still renders. Useful for mobile. */
    disabled?: boolean;
}

/**
 * A highly performant Parallax component.
 * Uses Framer Motion's MotionValues which translate directly to the DOM
 * without triggering React re-renders on scroll.
 */
export function Parallax({ children, offset = 50, className = '', disabled = false }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // If disabled or user prefers reduced motion, output 0 offset.
    const isParallaxDisabled = prefersReducedMotion || disabled;
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        isParallaxDisabled ? [0, 0] : [-offset, offset]
    );

    return (
        <motion.div
            ref={ref}
            style={{ y }}
            className={className}
        // will-change provides a hint to the browser to prepare hardware acceleration
        // but should be used sparingly. Framer handles GPU acceleration on 'y' by default.
        >
            {children}
        </motion.div>
    );
}
