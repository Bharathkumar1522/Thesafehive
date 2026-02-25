import { motion } from "framer-motion";
import { ReactNode } from "react";

interface EditorialRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export function EditorialReveal({ children, delay = 0, className = "" }: EditorialRevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
