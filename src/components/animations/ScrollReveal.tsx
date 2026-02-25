import { ReactNode } from 'react';
import { motion, Variants, useReducedMotion } from 'framer-motion';

type RevealVariant = 'fade' | 'slide-up' | 'slide-right' | 'scale' | 'clip';

interface ScrollRevealProps {
    children: ReactNode;
    variant?: RevealVariant;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
    threshold?: number; // viewport margin trigger
}

const variantMap: Record<RevealVariant, Variants> = {
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    'slide-up': {
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0 },
    },
    'slide-right': {
        hidden: { opacity: 0, x: -32 },
        visible: { opacity: 1, x: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.94 },
        visible: { opacity: 1, scale: 1 },
    },
    clip: {
        hidden: { clipPath: 'inset(0 100% 0 0)' },
        visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1 },
    },
};

export function ScrollReveal({
    children,
    variant = 'slide-up',
    delay = 0,
    className = '',
    once = true,
    threshold = -40,
}: ScrollRevealProps) {
    // Detect OS-level reduced motion preference (often enabled on low-power mode)
    const shouldReduceMotion = useReducedMotion();
    const activeVariant = shouldReduceMotion ? 'fade' : variant;

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: `${threshold}px` }}
            variants={variantMap[activeVariant]}
            transition={{
                type: 'spring',
                damping: 24,
                stiffness: 85,
                mass: 1,
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Stagger container for child animations
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    containerDelay?: number;
}

export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.1,
    containerDelay = 0,
}: StaggerContainerProps) {
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: containerDelay,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Individual stagger item (use inside StaggerContainer)
export function StaggerItem({
    children,
    className = '',
    variant = 'slide-up',
}: {
    children: ReactNode;
    className?: string;
    variant?: RevealVariant;
}) {
    // Detect OS-level reduced motion preference (often enabled on low-power mode)
    const shouldReduceMotion = useReducedMotion();
    const activeVariant = shouldReduceMotion ? 'fade' : variant;

    return (
        <motion.div
            variants={variantMap[activeVariant]}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
