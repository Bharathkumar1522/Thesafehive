// src/components/animations/MagneticButton.tsx
import { useRef, ReactNode, memo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number; // 0–1, default 0.35
    as?: keyof JSX.IntrinsicElements;
    onClick?: () => void;
}

export const MagneticButton = memo(function MagneticButton({
    children,
    className = '',
    strength = 0.35,
    onClick,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 150, damping: 18, mass: 0.6 });
    const springY = useSpring(y, { stiffness: 150, damping: 18, mass: 0.6 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * strength);
        y.set((e.clientY - cy) * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`magnetic-zone ${className}`}
        >
            {children}
        </motion.div>
    );
});
