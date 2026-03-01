// src/components/animations/SVGPathDraw.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SVGPathDrawProps {
    d: string;
    width?: number;
    height?: number;
    strokeColor?: string;
    strokeWidth?: number;
    className?: string;
}

/**
 * Draws an SVG path as the user scrolls into the viewport.
 * Animates the `pathLength` from 0 → 1 on scroll entry.
 */
export function SVGPathDraw({
    d,
    width = 400,
    height = 200,
    strokeColor = '#47FFAB',
    strokeWidth = 1.5,
    className = '',
}: SVGPathDrawProps) {
    return (
        <motion.svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
        >
            <motion.path
                d={d}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: { pathLength: { duration: 1.8, ease: 'easeInOut' }, opacity: { duration: 0.3 } },
                    },
                }}
            />
        </motion.svg>
    );
}

// ── Scroll-progress path (ties path draw to scroll position) ──────────────
interface ScrollPathProps {
    d: string;
    width?: number;
    height?: number;
    strokeColor?: string;
    strokeWidth?: number;
    className?: string;
}

export function ScrollProgressPath({
    d,
    width = 4,
    height = 300,
    strokeColor = '#47FFAB',
    strokeWidth = 2,
    className = '',
}: ScrollPathProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start center', 'end center'],
    });

    return (
        <div ref={ref} className={`relative ${className}`}>
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)' }}
            >
                {/* Track */}
                <path
                    d={`M${width / 2} 0 L${width / 2} ${height}`}
                    fill="none"
                    stroke="rgba(34, 211, 238,0.12)"
                    strokeWidth={strokeWidth}
                />
                {/* Animated fill */}
                <motion.path
                    d={`M${width / 2} 0 L${width / 2} ${height}`}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    style={{ pathLength: scrollYProgress }}
                />
            </svg>
        </div>
    );
}
