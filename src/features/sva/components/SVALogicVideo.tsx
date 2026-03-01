import { motion } from 'framer-motion';
import { Play, Terminal, ShieldCheck } from 'lucide-react';

const SVALogicVideo = () => {
    return (
        <section className="relative w-full py-24 border-y border-charcoal/5 overflow-hidden bg-transparent">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

                {/* Section Divider */}
                <div className="flex items-center gap-6 mb-16">
                    <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
                    <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(15, 23, 42,0.35)' }}>SVA-1 Protocol</span>
                    <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
                </div>

                {/* Section Header */}
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal tracking-wider leading-tight mb-6">
                            VERIFICATION IN <span className="text-terracotta">ACTION.</span>
                        </h2>
                        <p className="font-light text-lg text-charcoal/70 leading-relaxed">
                            Moving beyond informational signals. Witness the transition from fragmented chemical data to enforceable, version-controlled governance.
                        </p>
                    </div>
                </div>

                {/* Dashboard Layout */}
                <div className="grid grid-cols-1 lg:grid-cols12 gap-8 lg:gap-12 items-center">

                    {/* Video Container (Left 8 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-8 relative aspect-video rounded-2xl overflow-hidden border border-charcoal/10 shadow-xl group bg-white"
                    >
                        {/* Glassmorphism Bezel overlay */}
                        <div className="absolute inset-0 z-20 pointer-events-none rounded-2xl border border-white/20 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]" />

                        {/* Mock Header for the video player */}
                        <div className="absolute top-0 left-0 w-full h-10 bg-white/80 backdrop-blur-md border-b border-charcoal/5 z-20 flex items-center px-4 gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                            <span className="ml-4 font-mono text-[10px] text-charcoal/50 tracking-widest uppercase">SVA-1 Engine Prototype</span>
                        </div>

                        {/* Video Placeholder Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                            <div className="absolute inset-0 bg-[#B85C38] opacity-20 group-hover:opacity-30 transition-opacity rounded-full blur-md" />
                            <div className="relative w-16 h-16 rounded-full bg-[#B85C38] text-white flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                                <Play className="w-8 h-8 ml-1" fill="currentColor" />
                            </div>
                            <p className="mt-6 font-mono text-xs tracking-[0.2em] text-[#B85C38] uppercase">Live Demonstration</p>
                        </div>

                        {/* Aesthetic Background Grid for Placeholder */}
                        <div
                            className="absolute inset-x-0 bottom-0 h-full opacity-10 pointer-events-none"
                            style={{
                                backgroundImage: 'radial-gradient(circle at 50% 120%, rgba(6, 182, 212, 0.4), transparent 60%)'
                            }}
                        />
                    </motion.div>
                    {/* Status Console (Right 4 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="lg:col-span-4 flex flex-col gap-6"
                    >
                        {/* Console Window */}
                        <div className="w-full rounded-2xl border border-charcoal/10 bg-white shadow-md p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 blur-[100px] opacity-10 rounded-full" style={{ backgroundColor: '#B85C38' }} />

                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-charcoal/5">
                                <Terminal className="w-5 h-5" style={{ color: '#B85C38' }} />
                                <h3 className="font-mono text-sm tracking-widest text-charcoal uppercase">System Console</h3>
                            </div>

                            <div className="space-y-8">
                                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full" style={{ '--tw-before-bg': '#B85C38', 'position': 'relative' } as any}>
                                    <style>{`.bullet-terracotta::before { background-color: #B85C38; }`}</style>
                                    <div className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#B85C38' }} />
                                    <p className="font-heading text-xl font-medium text-charcoal mb-2 pt-0.5">Regulation becomes code.</p>
                                    <p className="font-light text-sm text-charcoal/60">Frameworks codified into deterministic rule systems.</p>
                                </div>

                                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-sage before:rounded-full">
                                    <p className="font-heading text-xl font-medium text-charcoal mb-2 pt-0.5">Verification becomes enforcement.</p>
                                    <p className="font-light text-sm text-charcoal/60">Safety signals converted to executable constraints.</p>
                                </div>

                                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-sage before:rounded-full">
                                    <p className="font-heading text-xl font-medium text-charcoal mb-2 pt-0.5">Commerce becomes conditional.</p>
                                    <p className="font-light text-sm text-charcoal/60">Eligibility structurally bound to verified outcomes.</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-charcoal/5">
                                <div className="flex items-center gap-2" style={{ color: '#B85C38' }}>
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="font-mono text-[10px] tracking-widest uppercase">Infrastructure Ready</span>
                                </div>
                            </div>
                        </div>

                        {/* Code Snippet Window */}
                        <div className="w-full rounded-2xl border border-charcoal/10 bg-white shadow-md p-6 relative overflow-hidden">
                            <div className="font-mono text-xs leading-relaxed text-charcoal/70">
                                <span style={{ color: '#B85C38' }}>var</span> compliance_score = <span style={{ color: '#B85C38' }}>100</span>;<br />
                                <span style={{ color: '#B85C38' }}>if</span> (hazard_level &lt; threshold) {'{'}<br />
                                &nbsp;&nbsp;allow_listing();<br />
                                {'}'}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SVALogicVideo;
