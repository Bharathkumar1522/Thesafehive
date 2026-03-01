import { motion } from 'framer-motion';
import { Network, FileCode2, Scale, BarChartBig, Users } from 'lucide-react';

const ENGINE_STEPS = [
    {
        id: '01',
        title: 'Ingredient Intelligence',
        description: 'Raw disclosures mapped to canonical chemical identities. Fragmented supplier data becomes structured classification input.',
        icon: Network,
    },
    {
        id: '02',
        title: 'Codified Regulatory Logic',
        description: 'Explicit regulatory doctrine converted into executable decision trees. Rule versions enforce strict deterministic compliance.',
        icon: FileCode2,
    },
    {
        id: '03',
        title: 'Hazard & Evidence Assessment',
        description: 'Ingredients evaluated using severity-weighted logic. Established conclusions override emerging research signals.',
        icon: Scale,
    },
    {
        id: '04',
        title: 'Confidence Discipline',
        description: 'Uncertainty treated as a governance constraint. Ambiguity safely degrades confidence rather than assuming risk.',
        icon: BarChartBig,
    },
    {
        id: '05',
        title: 'Human Governance',
        description: 'Expert review paths for ambiguity resolution. All overrides are logged, version-controlled, and audit-traceable.',
        icon: Users,
    }
];

export default function SVAEngine() {
    return (
        <section className="relative w-full py-24 overflow-hidden bg-transparent">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
                {/* Section Divider */}
                <div className="flex items-center gap-6 mb-16">
                    <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
                    <span className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(15, 23, 42,0.35)' }}>Decision Architecture</span>
                    <div className="flex-1 h-px" style={{ background: 'rgba(15, 23, 42,0.07)' }} />
                </div>

                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal tracking-wider leading-tight mb-6">
                        DETERMINISTIC. <br className="hidden md:block" />
                        <span className="text-terracotta">GOVERNED. EXPLAINABLE.</span>
                    </h2>
                    <p className="font-light text-lg text-charcoal/70 leading-relaxed">
                        Identical inputs under identical rule versions always produce identical outcomes.
                        Explore the internal architecture of the SVA-1 decision pipeline.
                    </p>
                </div>

                {/* The Pipeline Visulization */}
                <div className="relative">

                    {/* Main Pipeline Track Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[50%] left-[10%] right-[10%] h-0.5 bg-charcoal/10 -translate-y-1/2 rounded-full z-0" />
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="hidden lg:block absolute top-[50%] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[rgba(184,92,56,0.1)] via-terracotta to-[rgba(184,92,56,0.1)] -translate-y-1/2 rounded-full z-0 origin-left"
                    />

                    <div className="flex flex-col lg:flex-row gap-6 relative z-10 justify-between">
                        {ENGINE_STEPS.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                                    className="flex-1 flex flex-col items-center lg:items-start relative group"
                                >

                                    {/* Vertical Connector (Mobile) - Removed as per feedback */}

                                    {/* Node Icon */}
                                    <div className="w-16 h-16 rounded-2xl bg-white border border-terracotta/30 flex items-center justify-center text-terracotta shadow-sm mb-6 z-10 group-hover:scale-110 group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                                        <Icon className="w-7 h-7" strokeWidth={1.5} />
                                    </div>

                                    {/* Node Content */}
                                    <div className="text-center lg:text-left bg-white border border-charcoal/10 p-5 rounded-2xl w-full h-full lg:min-h-[220px] shadow-sm">
                                        <span className="font-mono text-[10px] tracking-widest text-terracotta block mb-2">STEP {step.id}</span>
                                        <h3 className="font-heading font-medium text-lg text-charcoal mb-3 leading-snug">{step.title}</h3>
                                        <p className="font-light text-sm text-charcoal/70 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>

            </div>
        </section>
    );
}
