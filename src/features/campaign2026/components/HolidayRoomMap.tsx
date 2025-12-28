import { ArrowLeft, MapPin } from 'lucide-react';
import { CaseData } from './DarkSide';

interface HolidayRoomMapProps {
    onBack: () => void;
    onSelectCase: (caseData: CaseData) => void;
    cases: CaseData[];
}

const roomAreas = [
    { id: 'living-room', name: 'Festive Living Room', x: '20%', y: '30%', icon: '🎄' },
    { id: 'gift-corner', name: 'Gift Corner', x: '70%', y: '25%', icon: '🎁' },
    { id: 'decoration-shelf', name: 'Decoration Shelf', x: '45%', y: '50%', icon: '✨' },
    { id: 'kitchen', name: 'Kitchen', x: '25%', y: '70%', icon: '🍪' },
    { id: 'play-area', name: 'Kids Play Area', x: '75%', y: '65%', icon: '🧸' }
];

export default function HolidayRoomMap({ onBack, onSelectCase, cases }: HolidayRoomMapProps) {
    const getCasesForLocation = (locationName: string) => {
        return cases.filter(c => c.location === locationName);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0C0C0E] via-[#1A1A1D] to-[#2E2E32] text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

            <div className="relative z-10">
                <header className="border-b border-amber-500/20 bg-black/30 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-mono text-sm">BACK TO DASHBOARD</span>
                        </button>
                        <div className="text-center">
                            <div className="text-amber-400 font-mono text-sm">INTERACTIVE MAP</div>
                            <h1 className="text-2xl font-bold">Holiday Crime Scene</h1>
                        </div>
                        <div className="w-32" />
                    </div>
                </header>

                <main className="container mx-auto px-6 py-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-8">
                            <p className="text-gray-400 text-lg">
                                Click on any room area to reveal toxin alerts and investigate suspicious items
                            </p>
                        </div>

                        <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-2 border-amber-500/30 rounded-lg p-12 min-h-[600px]">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImJsdWVwcmludCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMTAgMTBoNDBNMTAgMjBoNDBNMTAgMzBoNDBNMTAgNDBoNDBNMTAgNTBoNDBNMjAgMTB2NDBNMzAgMTB2NDBNNDAgMTB2NDBNNTAgMTB2NDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNDUsMTU4LDExLDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNibHVlcHJpbnQpIi8+PC9zdmc+')] opacity-50" />

                            {roomAreas.map((area) => {
                                const areaCases = getCasesForLocation(area.name);
                                return (
                                    <div
                                        key={area.id}
                                        className="absolute group cursor-pointer"
                                        style={{ left: area.x, top: area.y, transform: 'translate(-50%, -50%)' }}
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-pulse" />

                                            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/30 to-red-500/30 border-2 border-amber-500 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 group-hover:border-red-500">
                                                {area.icon}
                                            </div>

                                            {areaCases.length > 0 && (
                                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm animate-pulse border-2 border-white">
                                                    {areaCases.length}
                                                </div>
                                            )}
                                        </div>

                                        <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-64 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                                            <div className="bg-black/95 backdrop-blur-sm border border-amber-500 rounded-lg p-4 shadow-2xl">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <MapPin className="w-4 h-4 text-amber-400" />
                                                    <h3 className="font-bold text-amber-400">{area.name}</h3>
                                                </div>

                                                {areaCases.length > 0 ? (
                                                    <div className="space-y-2">
                                                        {areaCases.map((caseItem) => (
                                                            <button
                                                                key={caseItem.id}
                                                                onClick={() => onSelectCase(caseItem)}
                                                                className="w-full text-left p-2 bg-red-500/20 hover:bg-red-500/40 rounded border border-red-500/50 transition-colors"
                                                            >
                                                                <div className="font-mono text-xs text-amber-400 mb-1">{caseItem.id}</div>
                                                                <div className="text-sm text-white font-semibold">{caseItem.title}</div>
                                                                <div className="text-xs text-gray-400 mt-1">{caseItem.chemicals.length} chemicals detected</div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-sm text-gray-400">
                                                        No active cases in this area
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-2 text-center">
                                            <div className="text-sm font-bold text-white drop-shadow-lg">{area.name}</div>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-amber-500/50 rounded-lg p-4">
                                <h3 className="text-sm font-bold text-amber-400 mb-2">MAP LEGEND</h3>
                                <div className="space-y-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                                        <span>Active Toxin Alert</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-amber-500 rounded-full" />
                                        <span>Investigation Area</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
