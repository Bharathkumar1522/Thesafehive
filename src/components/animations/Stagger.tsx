import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerProps {
    children: ReactNode;
    staggerDelay?: number;
    className?: string;
    amount?: "some" | "all" | number;
}

export function StaggerContainer({
    children,
    staggerDelay = 0.1,
    className = "",
    amount = 0.1,
}: StaggerProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className = "",
    duration = 0.8,
}: {
    children: ReactNode;
    className?: string;
    duration?: number;
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration,
                        ease: [0.21, 0.47, 0.32, 0.98], // Soft organic easing
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
