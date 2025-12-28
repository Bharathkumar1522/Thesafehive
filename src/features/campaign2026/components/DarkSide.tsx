import { useState } from 'react';
import { ArrowLeft, AlertTriangle, Lightbulb, Send, Trophy, Star } from 'lucide-react';
import DetectiveGame from './DetectiveGame.tsx';

interface DarkSideProps {
    onBack: () => void;
}

export interface CaseData {
    id: string;
    title: string;
    subtitle: string;
    status: 'ACTIVE' | 'URGENT';
    dangerLevel: 'HIGH' | 'CRITICAL';
    chemicals: string[];
    findings: string[];
    location: string;
    evidence: string[];
    hints: string[];
    correctAnswer: string;
    alternativeAnswers: string[];
    explanation: string;
    funFact: string;
    safeAlternatives: string[];
}

const cases: CaseData[] = [
    {
        id: 'CASE-001',
        title: 'Scented Candle Conspiracy',
        subtitle: 'Synthetic Fragrances Investigation',
        status: 'ACTIVE',
        dangerLevel: 'HIGH',
        chemicals: ['Phthalates', 'VOCs', 'Paraffin Wax', 'Synthetic Fragrances'],
        findings: [
            'Most commercial candles contain synthetic fragrances with undisclosed chemicals',
            'Paraffin wax releases benzene and toluene when burned',
            'Phthalates disrupt hormones and can affect respiratory health',
            'No regulation requiring full ingredient disclosure'
        ],
        location: 'Living Room',
        evidence: ['Chemical analysis reports', 'Air quality measurements', 'Industry documents'],
        hints: [
            'Think about what candles are made from - the wax itself can be problematic',
            'The pleasant smell might not be from natural sources',
            'Consider what happens when you burn petroleum-based products'
        ],
        correctAnswer: 'paraffin',
        alternativeAnswers: ['paraffin wax', 'petroleum wax', 'synthetic wax'],
        explanation: 'Paraffin wax is the main culprit! It\'s a petroleum byproduct that releases harmful chemicals like benzene and toluene when burned. These toxins can cause respiratory issues and headaches.',
        funFact: 'Beeswax and soy candles are safe alternatives that actually purify the air instead of polluting it!',
        safeAlternatives: ['100% beeswax candles', 'Soy wax candles with essential oils', 'Coconut wax candles']
    },
    {
        id: 'CASE-002',
        title: 'Glitter Microplastic Mystery',
        subtitle: 'Environmental Contamination Alert',
        status: 'URGENT',
        dangerLevel: 'CRITICAL',
        chemicals: ['Microplastics', 'Aluminum', 'PET Film', 'Heavy Metal Coatings'],
        findings: [
            'Traditional glitter is microplastic that never biodegrades',
            'Ends up in waterways and ocean ecosystems',
            'Can contain aluminum and other metal coatings',
            'Ingested by marine life and enters food chain'
        ],
        location: 'Decoration Shelf',
        evidence: ['Environmental impact studies', 'Water contamination samples', 'Marine biology reports'],
        hints: [
            'This sparkly decoration is actually tiny pieces of plastic',
            'It never breaks down and stays in the environment forever',
            'Marine animals mistake it for food'
        ],
        correctAnswer: 'microplastic',
        alternativeAnswers: ['microplastics', 'plastic', 'pet plastic'],
        explanation: 'Glitter is made of microplastics - tiny plastic particles that never decompose. They wash down drains, enter waterways, and harm marine life who mistake them for food.',
        funFact: 'Biodegradable glitter made from plant cellulose is now available and looks just as sparkly!',
        safeAlternatives: ['Plant-based biodegradable glitter', 'Mica-based natural shimmer', 'Dried flower confetti']
    },
    {
        id: 'CASE-003',
        title: 'Fake Snow Fumes',
        subtitle: 'Aerosol Propellant Hazard',
        status: 'ACTIVE',
        dangerLevel: 'HIGH',
        chemicals: ['Propane', 'Butane', 'Isobutane', 'Dimethyl Ether'],
        findings: [
            'Spray snow contains flammable propellants',
            'Can cause respiratory irritation and asthma triggers',
            'Risk of inhalation toxicity in enclosed spaces',
            'Residue contains synthetic polymers'
        ],
        location: 'Gift Corner',
        evidence: ['Product safety data sheets', 'Toxicology reports', 'Incident records'],
        hints: [
            'The propellant that makes it spray is highly flammable',
            'Breathing it in can irritate your lungs',
            'The same chemicals are used in lighters'
        ],
        correctAnswer: 'propellant',
        alternativeAnswers: ['aerosol propellant', 'butane', 'propane'],
        explanation: 'Aerosol propellants like butane and propane are the hidden danger. They\'re highly flammable and can cause respiratory irritation, especially in enclosed spaces.',
        funFact: 'You can make safe "snow" at home using just baking soda and hair conditioner!',
        safeAlternatives: ['DIY baking soda snow', 'Cotton batting', 'White tissue paper decorations']
    },
    {
        id: 'CASE-004',
        title: 'Toxic Toy Trouble',
        subtitle: 'Child Safety Violation',
        status: 'URGENT',
        dangerLevel: 'CRITICAL',
        chemicals: ['Phthalates', 'Lead', 'Cadmium', 'BPA'],
        findings: [
            'Many imported toys contain banned substances',
            'Lead paint still found on decorative items',
            'Phthalates used to soften plastic toys',
            'Hormone-disrupting chemicals in common use'
        ],
        location: 'Kids Play Area',
        evidence: ['Lab test results', 'Recall notices', 'Medical case studies'],
        hints: [
            'This heavy metal was banned from paint decades ago but still shows up',
            'It\'s especially dangerous for children\'s developing brains',
            'Old toys and cheap imports are the biggest culprits'
        ],
        correctAnswer: 'lead',
        alternativeAnswers: ['lead paint', 'heavy metal', 'lead contamination'],
        explanation: 'Lead is the primary concern! Even small amounts can cause serious developmental issues in children. It\'s often found in paint on cheap toys and decorations.',
        funFact: 'Wooden toys with water-based finishes and organic cotton stuffed animals are safe, lead-free alternatives!',
        safeAlternatives: ['Wooden toys with water-based finishes', 'Organic cotton stuffed animals', 'Natural rubber toys']
    },
    {
        id: 'CASE-005',
        title: 'Wrapping Paper PFAS Scandal',
        subtitle: 'Forever Chemicals Detected',
        status: 'ACTIVE',
        dangerLevel: 'HIGH',
        chemicals: ['PFAS', 'Heavy Metal Inks', 'Formaldehyde', 'Bleach Residue'],
        findings: [
            'Shiny wrapping paper often contains PFAS coating',
            'Heavy metals in metallic inks pose risks',
            'Cannot be recycled due to chemical treatments',
            'PFAS accumulates in body and environment'
        ],
        location: 'Gift Corner',
        evidence: ['Chemical testing results', 'Industry whistleblower docs', 'Environmental reports'],
        hints: [
            'These chemicals are called "forever" because they never break down',
            'They\'re used to make paper shiny and water-resistant',
            'They accumulate in your body over time'
        ],
        correctAnswer: 'pfas',
        alternativeAnswers: ['forever chemicals', 'pfas chemicals', 'per- and polyfluoroalkyl substances'],
        explanation: 'PFAS (forever chemicals) are used to make wrapping paper shiny and water-resistant. They never break down and accumulate in our bodies and the environment.',
        funFact: 'Brown kraft paper tied with natural twine looks beautiful and is completely safe and recyclable!',
        safeAlternatives: ['Brown kraft paper', 'Reusable fabric wraps (furoshiki)', 'Newspaper or magazine pages']
    },
    {
        id: 'CASE-006',
        title: 'Artificial Tree Chemical Cloud',
        subtitle: 'PVC & Fire Retardant Investigation',
        status: 'ACTIVE',
        dangerLevel: 'HIGH',
        chemicals: ['PVC', 'Lead', 'Fire Retardants', 'Phthalates'],
        findings: [
            'Most artificial trees made from PVC plastic',
            'Release harmful chemicals over time',
            'Fire retardants contain toxic compounds',
            'Lead dust found in older artificial trees'
        ],
        location: 'Living Room',
        evidence: ['Material analysis', 'Indoor air quality tests', 'Consumer safety reports'],
        hints: [
            'This type of plastic is one of the most toxic commonly used',
            'It off-gases chemicals into your home air',
            'The same material is used in vinyl flooring and pipes'
        ],
        correctAnswer: 'pvc',
        alternativeAnswers: ['polyvinyl chloride', 'vinyl', 'pvc plastic'],
        explanation: 'PVC (polyvinyl chloride) is the main problem. It off-gases harmful chemicals including phthalates and can contain lead, especially in older trees.',
        funFact: 'A real tree from a sustainable farm or a high-quality PE (polyethylene) tree are much safer options!',
        safeAlternatives: ['Real trees from sustainable farms', 'PE (polyethylene) artificial trees', 'Wooden decorative trees']
    }
];

export default function DarkSide({ onBack }: DarkSideProps) {
    const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);

    if (selectedCase) {
        return <DetectiveGame case={selectedCase} onBack={() => setSelectedCase(null)} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0C0C0E] via-[#1A1A1D] to-[#2E2E32] text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

            <div className="relative z-10">
                <header className="border-b border-[#59a75c]/20 bg-black/30 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-[#59a75c] hover:text-[#6EBF73] transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-mono text-sm">EXIT INVESTIGATION</span>
                        </button>
                        <div className="text-center">
                            <div className="text-[#59a75c] font-mono text-sm">CLASSIFIED</div>
                            <h1 className="text-2xl font-bold">INVESTIGATION DASHBOARD</h1>
                        </div>
                        <div className="flex items-center gap-2 text-[#DC2626] font-mono text-sm">
                            <AlertTriangle className="w-4 h-4 animate-pulse" />
                            <span>ACTIVE CASES: {cases.length}</span>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-6 py-12">
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl font-bold mb-4">Toxin Crime Scene</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                            Select a case file to begin your investigation. Solve the mystery by uncovering the hidden toxin,
                            use hints if you need help, and learn safe alternatives for a toxin-free life!
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#59a75c]/10 border border-[#59a75c]/30 rounded-full">
                            <Trophy className="w-4 h-4 text-[#d4a542]" />
                            <span className="text-[#59a75c] text-sm font-semibold">Solve all cases to become a Master Detective!</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cases.map((caseItem, index) => (
                            <div
                                key={caseItem.id}
                                className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#59a75c]/30 rounded-lg overflow-hidden hover:border-[#59a75c] transition-all duration-300 hover:shadow-lg hover:shadow-[#59a75c]/20 cursor-pointer animate-fadeIn"
                                style={{ animationDelay: `${index * 100}ms` }}
                                onClick={() => setSelectedCase(caseItem)}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#DC2626]/10 rounded-full blur-3xl" />

                                <div className="relative p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="font-mono text-xs text-[#59a75c]">{caseItem.id}</div>
                                        <div className={`px-2 py-1 rounded text-xs font-bold ${caseItem.status === 'URGENT' ? 'bg-[#DC2626] text-white animate-pulse' :
                                            'bg-[#59a75c] text-white'
                                            }`}>
                                            {caseItem.status}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#59a75c] transition-colors">
                                        {caseItem.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4">{caseItem.subtitle}</p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-gray-500">Danger Level:</span>
                                            <span className={`font-bold ${caseItem.dangerLevel === 'CRITICAL' ? 'text-[#DC2626]' :
                                                'text-[#d4a542]'
                                                }`}>
                                                {caseItem.dangerLevel}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-gray-500">Location:</span>
                                            <span className="text-gray-300">{caseItem.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {caseItem.chemicals.slice(0, 3).map((chemical, i) => (
                                            <span key={i} className="px-2 py-1 bg-[#DC2626]/20 text-[#DC2626] text-xs rounded border border-[#DC2626]/30">
                                                {chemical}
                                            </span>
                                        ))}
                                        {caseItem.chemicals.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
                                                +{caseItem.chemicals.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-1 text-gray-500">
                                            <Lightbulb className="w-4 h-4" />
                                            <span>{caseItem.hints.length} Hints Available</span>
                                        </div>
                                        <span className="text-[#59a75c] group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#59a75c]/0 via-[#59a75c] to-[#59a75c]/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
        </div>
    );
}
