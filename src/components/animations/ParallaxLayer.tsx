// src/components/animations/ParallaxLayer.tsx
import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxLayerProps {
    children: ReactNode;
    speed?: number;  // negative = faster (scrolls up), positive = slower (scrolls down), range: -1 to 1
    className?: string;
    clamp?: boolean;
}

/**
 * Creates a parallax scroll effect by moving content at a different rate
 * to the scroll speed.
 *
 * speed = 0.3  → element moves 30% slower than scroll (appears to recede into bg)
 * speed = -0.3 → element moves 30% faster than scroll (appears to come forward)
 */
export function ParallaxLayer({
    children,
    speed = 0.3,
    className = '',
    clamp = false,
}: ParallaxLayerProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const yRange = speed * 150; // px range
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        clamp ? [`-${Math.abs(yRange)}px`, `${Math.abs(yRange)}px`] : [`${-yRange}px`, `${yRange}px`]
    );

    return (
        <div ref={ref} className={`relative overflow-visible ${className}`}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
}

// Opacity parallax — element fades out as it leaves viewport
interface FadeParallaxProps {
    children: ReactNode;
    className?: string;
}

export function FadeParallax({ children, className = '' }: FadeParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start center', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ opacity, scale }}>
                {children}
            </motion.div>
        </div>
    );
}
