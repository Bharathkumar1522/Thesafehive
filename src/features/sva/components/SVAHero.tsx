import { motion } from 'framer-motion';
import { Database, Binary } from 'lucide-react';

export default function SVAHero() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20 bg-transparent">

            {/* Background Tech Grid */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(34, 33, 31, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 33, 31, 0.8) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Subtle Data Stream Animation */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
                <motion.div
                    animate={{ y: [0, 1000] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-[10%] top-[-50%] w-px h-full bg-gradient-to-b from-transparent via-terracotta to-transparent"
                />
                <motion.div
                    animate={{ y: [0, 1000] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: 2 }}
                    className="absolute left-[50%] top-[-50%] w-px h-full bg-gradient-to-b from-transparent via-charcoal to-transparent"
                />
                <motion.div
                    animate={{ y: [0, 1000] }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 5 }}
                    className="absolute left-[85%] top-[-50%] w-px h-full bg-gradient-to-b from-transparent via-terracotta to-transparent"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">

                {/* Development Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-charcoal/10 bg-white/50 mb-8 shadow-sm"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta"></span>
                    </span>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-charcoal/60">
                        Currently under development by TheSafeHive LTD.
                    </span>
                </motion.div>

                {/* Headlines */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-center gap-3 text-terracotta mb-4">
                        <Database className="w-5 h-5 opacity-40" />
                        <span className="font-mono text-xs tracking-[0.3em] uppercase opacity-80">Introducing SVA-1</span>
                        <Binary className="w-5 h-5 opacity-40" />
                    </div>

                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none text-charcoal tracking-wider">
                        TRUST, <span className="text-terracotta">ENGINEERED.</span>
                    </h1>

                    <p className="font-light text-lg md:text-xl text-charcoal/70 max-w-2xl mx-auto leading-relaxed mt-8">
                        The world’s first <span className="text-charcoal font-medium">Executable Safety Governance</span> layer—transforming regulatory logic into deterministic marketplace controls.
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="mt-20 flex flex-col items-center justify-center gap-2 opacity-50"
                >
                    <span className="font-mono text-[9px] tracking-widest uppercase text-charcoal">Initialize Architecture</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-0.5 h-12 bg-gradient-to-b from-terracotta to-transparent"
                    />
                </motion.div>

            </div>
        </section>
    );
}
