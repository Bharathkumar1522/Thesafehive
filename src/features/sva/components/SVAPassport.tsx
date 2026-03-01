import { motion } from 'framer-motion';
import { ShieldCheck, History, Fingerprint, Globe, CheckCircle2, ChevronRight } from 'lucide-react';

export default function SVAPassport() {
    return (
        <section className="relative w-full py-24 border-y border-charcoal/5 overflow-hidden bg-transparent">
            {/* Background Decor */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-terracotta blur-[120px] opacity-[0.04] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-terracotta blur-[150px] opacity-[0.03] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
                {/* Section Divider */}
                <div className="flex items-center gap-6 mb-16">
                    <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
                    <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(15, 23, 42,0.35)' }}>Immutable Artifact</span>
                    <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
                </div>

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal tracking-wider leading-tight mb-6">
                        TRUST IS NOT ASSERTED. <br />
                        EVIDENCE AS <span className="text-terracotta">IDENTITY.</span>
                    </h2>
                    <p className="font-light text-lg text-charcoal/70 leading-relaxed">
                        Every verified product generates an immutable artifact. A complete, traceable record of regulatory alignment, hazard scoring, and data confidence.
                    </p>
                </div>

                {/* The Passport UI (Bento Grid) */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full rounded-3xl border border-charcoal/10 bg-white shadow-xl overflow-hidden"
                    >
                        {/* Passport Header */}
                        <div className="border-b border-charcoal/5 bg-white/40 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B85C38] to-[#D4785A] flex items-center justify-center shadow-md">
                                    <Fingerprint className="w-6 h-6 text-white" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-medium text-xl text-charcoal">SVA-1 Safety Passport</h3>
                                    <p className="font-mono text-xs text-charcoal/50 tracking-widest uppercase mt-1">ID: SVA-8492-AXL-001</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-sage/30 bg-sage/10 text-sage font-mono text-xs tracking-widest uppercase">
                                <CheckCircle2 className="w-3.5 h-3.5" /> ANALYSED
                            </div>
                        </div>

                        {/* Grid Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/5">

                            {/* Jurisdictional Alignment */}
                            <div className="bg-white p-6 md:p-8 flex flex-col">
                                <div className="flex items-center gap-2 mb-6">
                                    <Globe className="w-4 h-4 text-terracotta" />
                                    <span className="font-mono text-[10px] tracking-[0.2em] text-charcoal/40 uppercase">Regulatory Alignment</span>
                                </div>
                                <div className="mt-auto space-y-4">
                                    <div className="flex justify-between items-center border-b border-charcoal/5 pb-3">
                                        <span className="font-light text-charcoal">EU REACH</span>
                                        <span className="font-mono text-xs text-terracotta">COMPLIANT</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-charcoal/5 pb-3">
                                        <span className="font-light text-charcoal">US EPA</span>
                                        <span className="font-mono text-xs text-terracotta">COMPLIANT</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-light text-charcoal">Prop 65 CA</span>
                                        <span className="font-mono text-[10px] tracking-widest uppercase text-terracotta">CLEARED</span>
                                    </div>
                                </div>
                            </div>

                            {/* Hazard Score */}
                            <div className="bg-white p-6 md:p-8 flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta blur-[80px] opacity-[0.08]" />
                                <div className="flex items-center gap-2 mb-6 relative z-10">
                                    <ShieldCheck className="w-4 h-4 text-terracotta" />
                                    <span className="font-mono text-[10px] tracking-[0.2em] text-charcoal/40 uppercase">Safety Rating</span>
                                </div>
                                <div className="mt-auto relative z-10 flex flex-col items-start gap-1">
                                    <div className="flex items-end gap-2">
                                        <span className="font-display text-7xl text-charcoal leading-none">A+</span>
                                        <span className="font-mono text-xs text-charcoal/40 mb-2 tracking-widest">/ SEVERITY 0</span>
                                    </div>
                                    <p className="font-light text-[10px] leading-snug text-charcoal/50 mt-1 max-w-[90%]">
                                        Based on current ingredient data and applicable regulatory standards.
                                    </p>
                                </div>
                            </div>

                            {/* Confidence Rating */}
                            <div className="bg-white p-6 md:p-8 flex flex-col lg:col-span-1 md:col-span-2">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="font-mono text-[10px] tracking-[0.2em] text-charcoal/40 uppercase">Data Confidence</span>
                                    <span className="font-mono text-sm text-terracotta">98%</span>
                                </div>
                                <div className="mt-auto">
                                    {/* Visual Confidence Meter */}
                                    <div className="h-2 w-full bg-charcoal/5 rounded-full overflow-hidden mb-3">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '98%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full w-[98%]"
                                        />
                                    </div>
                                    <p className="font-light text-xs text-charcoal/50">
                                        Confidence degrades if formulation logic is ambiguous or evidence is incomplete. This product has full disclosure parity.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Explanation Trace Link */}
                        <div className="bg-charcoal/5 p-4 flex items-center justify-center border-t border-charcoal/5 hover:bg-terracotta/5 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3 text-charcoal/60 group-hover:text-terracotta transition-colors">
                                <History className="w-4 h-4" />
                                <span className="font-mono text-xs tracking-[0.1em] uppercase">View Explanation Trace & Rule Versions</span>
                                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>

                    </motion.div>
                </div>

            </div>
        </section>
    );
}
