import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Target, RefreshCw, Eye, Scale, Server, Search, CheckCircle2, SlidersHorizontal } from 'lucide-react';

const TERRACOTTA_ACCENT = '#B85C38'; // Brand Toggle Active Color
const SAGE = '#3A6B4A'; // Sage for Consumer Toggle Active Color

const BRAND_FEATURES = [
    { title: "Structured Differentiation", desc: "Compliance becomes visible, evidence-backed, and systematically demonstrated.", icon: Target },
    { title: "Reduced Greenwashing Exposure", desc: "Transparent classification reduces reputational and regulatory risk.", icon: ShieldCheck },
    { title: "Regulatory Update Responsiveness", desc: "Products are automatically reassessed when rules or evidence change.", icon: RefreshCw },
    { title: "Early Risk Intelligence", desc: "Ingredient-level mapping identifies potential formulation vulnerabilities.", icon: Eye },
    { title: "Fair Competitive Environment", desc: "Verification precedes visibility. Marketing volume cannot override governance discipline.", icon: Scale },
    { title: "Infrastructure-Ready Positioning", desc: "As regulatory scrutiny increases, you are structurally prepared.", icon: Server }
];

const CONSUMER_FEATURES = [
    { title: "Explanation Traces", desc: "Review complete, traceable explanations of all applied safety rules.", icon: Search },
    { title: "Regulatory Alignment", desc: "Instantly understand how a product maps to global regulatory regions.", icon: GlobeIcon },
    { title: "Confidence Meters", desc: "See where data is complete, and where uncertainty has reduced confidence.", icon: CheckCircle2 },
    { title: "Personalized Filters", desc: "Apply tailored sensitivity configurations without reading complex labels.", icon: SlidersHorizontal }
];

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}

export default function SVAStakeholder() {
    const [activeTab, setActiveTab] = useState<'brands' | 'consumers'>('brands');

    return (
        <section className="relative w-full py-24 overflow-hidden bg-transparent">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

                {/* Section Divider */}
                <div className="flex items-center gap-6 mb-16">
                    <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
                    <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(15, 23, 42,0.35)' }}>Ecosystem Integration</span>
                    <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
                </div>

                {/* Toggle Switch */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex items-center p-1.5 rounded-full bg-charcoal/5 border border-charcoal/10 shadow-inner relative">
                        <div
                            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full transition-all duration-300 ease-out`}
                            style={{
                                left: activeTab === 'brands' ? '6px' : 'calc(50% + 3px)',
                                backgroundColor: activeTab === 'brands' ? TERRACOTTA_ACCENT : SAGE,
                            }}
                        />
                        <button
                            onClick={() => setActiveTab('brands')}
                            className={`relative z-10 px-8 py-3 rounded-full font-mono text-sm tracking-widest uppercase transition-colors duration-300 ${activeTab === 'brands' ? 'text-white' : 'text-charcoal/50 hover:text-charcoal'}`}
                        >
                            For Brands
                        </button>
                        <button
                            onClick={() => setActiveTab('consumers')}
                            className={`relative z-10 px-8 py-3 rounded-full font-mono text-sm tracking-widest uppercase transition-colors duration-300 ${activeTab === 'consumers' ? 'text-white' : 'text-charcoal/50 hover:text-charcoal'}`}
                        >
                            For Consumers
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'brands' ? (
                            <motion.div
                                key="brands"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="max-w-5xl mx-auto"
                            >
                                <div className="text-center mb-16">
                                    <h2 className="font-display text-4xl md:text-5xl text-charcoal tracking-wider leading-tight mb-4">
                                        COMPLIANCE, <span className="text-terracotta">OPERATIONALISED.</span>
                                    </h2>
                                    <p className="font-light text-lg text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
                                        Transform regulatory discipline into structured competitive advantage. Operational transparency becomes strategic capital.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {BRAND_FEATURES.map((feature, i) => {
                                        const Icon = feature.icon;
                                        return (
                                            <div key={i} className="bg-white/50 border border-charcoal/10 rounded-2xl p-6 hover:border-terracotta/30 transition-colors duration-300 group shadow-sm hover:shadow-md">
                                                <div className="w-10 h-10 rounded-lg bg-terracotta/10 flex items-center justify-center text-terracotta mb-4 group-hover:bg-terracotta group-hover:text-white transition-colors duration-300">
                                                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                                                </div>
                                                <h3 className="font-display text-lg text-charcoal mb-2">{feature.title}</h3>
                                                <p className="font-light text-sm text-charcoal/70">{feature.desc}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="consumers"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="max-w-4xl mx-auto"
                            >
                                <div className="text-center mb-16">
                                    <h2 className="font-display text-4xl md:text-5xl text-charcoal tracking-wider leading-tight mb-4">
                                        CLARITY <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage to-[#A2CB8B]">WITHOUT BURDEN.</span>
                                    </h2>
                                    <p className="font-light text-lg text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
                                        The system enforces verification so choice remains with the consumer. We remove the cognitive burden of validation.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {CONSUMER_FEATURES.map((feature, i) => {
                                        const Icon = feature.icon;
                                        return (
                                            <div key={i} className="bg-white/50 border border-charcoal/10 rounded-2xl p-6 hover:border-sage/40 transition-colors duration-300 group shadow-sm hover:shadow-md">
                                                <div className="w-10 h-10 rounded-lg bg-sage/10 flex items-center justify-center text-sage mb-4 group-hover:bg-sage group-hover:text-white transition-colors duration-300">
                                                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                                                </div>
                                                <h3 className="font-display text-lg text-charcoal mb-2">{feature.title}</h3>
                                                <p className="font-light text-sm text-charcoal/70">{feature.desc}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}
