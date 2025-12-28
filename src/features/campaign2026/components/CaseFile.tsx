import { ArrowLeft, AlertTriangle, FileText, Microscope } from 'lucide-react';
import { CaseData } from './DarkSide';

interface CaseFileProps {
    case: CaseData;
    onBack: () => void;
}

export default function CaseFile({ case: caseData, onBack }: CaseFileProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0C0C0E] via-[#1A1A1D] to-[#2E2E32] text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

            <div className="relative z-10">
                <header className="border-b border-amber-500/20 bg-black/30 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-4">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-mono text-sm">BACK TO CASES</span>
                        </button>
                    </div>
                </header>

                <main className="container mx-auto px-6 py-12 max-w-5xl">
                    <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 p-8 md:p-12 rounded-lg shadow-2xl border-4 border-amber-900/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />

                        <div className="relative">
                            <div className="flex items-start justify-between mb-6 border-b-2 border-amber-900/20 pb-4">
                                <div>
                                    <div className="font-mono text-sm text-amber-900 mb-2">{caseData.id}</div>
                                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{caseData.title}</h1>
                                    <p className="text-xl text-gray-700">{caseData.subtitle}</p>
                                </div>
                                <div className="flex flex-col gap-2 items-end">
                                    <div className={`px-4 py-2 rounded font-bold text-sm ${caseData.status === 'URGENT' ? 'bg-red-500 text-white' :
                                        caseData.status === 'ACTIVE' ? 'bg-amber-500 text-black' :
                                            'bg-gray-600 text-white'
                                        }`}>
                                        {caseData.status}
                                    </div>
                                    <div className={`px-4 py-2 rounded font-bold text-sm border-2 ${caseData.dangerLevel === 'CRITICAL' ? 'border-red-500 text-red-700 bg-red-50' :
                                        caseData.dangerLevel === 'HIGH' ? 'border-orange-500 text-orange-700 bg-orange-50' :
                                            'border-yellow-500 text-yellow-700 bg-yellow-50'
                                        }`}>
                                        DANGER: {caseData.dangerLevel}
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-4">
                                    <div className="bg-white/60 p-4 rounded border border-gray-300">
                                        <div className="flex items-center gap-2 mb-3">
                                            <AlertTriangle className="w-5 h-5 text-red-600" />
                                            <h3 className="font-bold text-gray-900">Chemicals Detected</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {caseData.chemicals.map((chemical, i) => (
                                                <span key={i} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full border border-red-300 font-medium">
                                                    {chemical}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white/60 p-4 rounded border border-gray-300">
                                        <div className="flex items-center gap-2 mb-3">
                                            <FileText className="w-5 h-5 text-amber-600" />
                                            <h3 className="font-bold text-gray-900">Evidence Collected</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {caseData.evidence.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <span className="text-amber-600 font-mono">#{i + 1}</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white/60 p-4 rounded border border-gray-300">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Microscope className="w-5 h-5 text-blue-600" />
                                            <h3 className="font-bold text-gray-900">Investigation Findings</h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {caseData.findings.map((finding, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                                    <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <span className="text-xs font-bold text-white">{i + 1}</span>
                                                    </div>
                                                    <span className="leading-relaxed">{finding}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded border-2 border-red-300">
                                    <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5" />
                                        Location Flagged
                                    </h3>
                                    <p className="text-red-800 font-medium">{caseData.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-amber-900 to-red-900 text-white p-6 rounded-lg">
                            <h3 className="font-bold text-xl mb-3">Detective Notes</h3>
                            <p className="leading-relaxed opacity-90">
                                This investigation reveals significant health and environmental concerns related to common household products.
                                The detected chemicals pose various risks ranging from respiratory irritation to hormone disruption and
                                long-term environmental damage. Consumers should exercise caution and seek safer alternatives when possible.
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/20 font-mono text-sm opacity-70">
                                Case Status: Under Active Investigation | Last Updated: Dec 2024
                            </div>
                        </div>

                        <div className="absolute top-8 right-8 transform rotate-12 opacity-20 pointer-events-none">
                            <div className="text-red-600 font-bold text-6xl border-4 border-red-600 rounded-full w-32 h-32 flex items-center justify-center">
                                ALERT
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
