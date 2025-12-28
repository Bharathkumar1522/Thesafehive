import { useState } from 'react';
import { Search, BookOpen, Heart } from 'lucide-react';
import EmailForm from './EmailForm';
import Logo from './Logo';

interface HomeSplitProps {
    onNavigate: (side: 'dark' | 'bright') => void;
}

export default function HomeSplit({ onNavigate }: HomeSplitProps) {
    const [hoveredSide, setHoveredSide] = useState<'dark' | 'bright' | null>(null);
    const [showEmailForm, setShowEmailForm] = useState(false);

    return (
        <div className="min-h-screen bg-[#0C0C0E] relative overflow-hidden">
            {/* Fixed Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
                <div className="container mx-auto px-3 sm:px-6 py-2.5 sm:py-4">
                    <div className="flex items-center justify-between">
                        <Logo className="h-7 sm:h-10 w-auto" variant="light" />
                        <div className="flex items-center gap-1.5 sm:gap-4">
                            <a
                                href="https://www.thesafehive.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-colors"
                            >
                                Visit Main Site
                            </a>
                            <button
                                onClick={() => setShowEmailForm(true)}
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-2 bg-[#59a75c] text-white font-semibold rounded-lg hover:bg-[#6EBF73] transition-all duration-300 text-xs sm:text-sm shadow-lg min-h-[44px] sm:min-h-0"
                            >
                                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Join Community</span>
                                <span className="sm:hidden">Join</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Split Screen */}
            <div className="fixed inset-0 top-[56px] sm:top-[68px] flex flex-col sm:flex-row">
                {/* LEFT SIDE - Detective Investigation */}
                <div
                    className={`flex-1 relative transition-all duration-700 ease-out ${hoveredSide === 'dark' ? 'flex-[1.1]' : hoveredSide === 'bright' ? 'flex-[0.9]' : 'flex-1'
                        }`}
                    onMouseEnter={() => setHoveredSide('dark')}
                    onMouseLeave={() => setHoveredSide(null)}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0C0C0E] via-[#1A1A1D] to-[#2E2E32]">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#59a75c]/20 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4a542]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

                        <div className="absolute top-10 right-10 sm:right-20 text-4xl sm:text-6xl md:text-8xl opacity-10 animate-float">🔬</div>
                        <div className="absolute bottom-20 left-10 sm:left-20 text-3xl sm:text-5xl md:text-6xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>⚗️</div>
                        <div className="absolute top-1/3 left-1/4 text-2xl sm:text-3xl md:text-4xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🧪</div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl sm:max-w-2xl px-4 sm:px-6 md:px-8">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#59a75c]/20 to-[#d4a542]/20 blur-2xl rounded-full" />

                                <div className="relative text-center space-y-4 sm:space-y-6 md:space-y-8">
                                    <div className="inline-block">
                                        <div className="text-[#59a75c] text-[10px] xs:text-xs sm:text-sm font-mono tracking-widest mb-2 opacity-80">
                                            CLASSIFIED INVESTIGATION
                                        </div>
                                        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                                            Detective of
                                            <br />
                                            <span className="text-[#59a75c]">Hidden Toxins</span>
                                        </h1>
                                        <div className="mt-3 sm:mt-4 text-[#d4a542] font-mono text-[10px] xs:text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2">
                                            <div className="h-px w-4 xs:w-6 sm:w-8 bg-[#d4a542]" />
                                            <span className="whitespace-nowrap">TOXIN INVESTIGATION</span>
                                            <div className="h-px w-4 xs:w-6 sm:w-8 bg-[#d4a542]" />
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-sm xs:text-base sm:text-lg max-w-xl mx-auto leading-relaxed px-2 sm:px-4">
                                        Uncover the hidden dangers lurking in everyday products.
                                        Play detective games, solve toxin mysteries, and learn safe alternatives.
                                    </p>

                                    <button
                                        onClick={() => onNavigate('dark')}
                                        className="group relative inline-flex items-center gap-2 sm:gap-3 px-5 xs:px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-[#59a75c] text-[#59a75c] font-semibold rounded-lg hover:bg-[#59a75c] hover:text-white transition-all duration-300 overflow-hidden text-sm sm:text-base min-h-[48px] sm:min-h-0"
                                    >
                                        <div className="absolute inset-0 bg-[#59a75c] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                                        <Search className="relative z-10 w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="relative z-10">Start Investigation</span>
                                    </button>

                                    <div className="flex items-center justify-center gap-2 sm:gap-4 pt-3 sm:pt-4">
                                        <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-r from-transparent to-[#59a75c]/50" />
                                        <div className="text-[#59a75c] text-[10px] xs:text-xs font-mono animate-pulse whitespace-nowrap">ACTIVE CASE FILES: 6</div>
                                        <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-l from-transparent to-[#59a75c]/50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center Divider */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-1 h-0.5 sm:h-full bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-[#59a75c]/50 to-transparent z-20 transition-all duration-500 ${hoveredSide ? 'opacity-100 shadow-[0_0_30px_rgba(89,167,92,0.5)]' : 'opacity-50 sm:opacity-30'
                    }`} />

                {/* RIGHT SIDE - Safe Holiday Living */}
                <div
                    className={`flex-1 relative transition-all duration-700 ease-out ${hoveredSide === 'bright' ? 'flex-[1.1]' : hoveredSide === 'dark' ? 'flex-[0.9]' : 'flex-1'
                        }`}
                    onMouseEnter={() => setHoveredSide('bright')}
                    onMouseLeave={() => setHoveredSide(null)}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ECFDF5] via-[#D1FAE5] to-[#A7F3D0]">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImhvbmV5Y29tYiIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMzAgMGwxNSA4LjY2djE3LjMyTDMwIDM0LjY0ADE1IDI2VjguNjZ6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTYsMTg1LDEyOSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjaG9uZXljb21iKSIvPjwvc3ZnPg==')] opacity-40" />

                        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#59a75c]/20 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#6EBF73]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />

                        <div className="absolute top-20 left-10 sm:left-20 text-4xl sm:text-6xl md:text-8xl opacity-20 animate-float">🌿</div>
                        <div className="absolute bottom-32 right-10 sm:right-32 text-3xl sm:text-5xl md:text-6xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🍃</div>
                        <div className="absolute top-1/2 right-1/4 text-2xl sm:text-4xl md:text-5xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>💚</div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl sm:max-w-2xl px-4 sm:px-6 md:px-8">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#59a75c]/30 to-[#6EBF73]/30 blur-2xl rounded-full" />

                                <div className="relative text-center space-y-4 sm:space-y-6 md:space-y-8">
                                    <div className="inline-block">
                                        <div className="text-[#0C4023] text-[10px] xs:text-xs sm:text-sm font-mono tracking-widest mb-2 opacity-70">
                                            YOUR GUIDE TO WELLNESS
                                        </div>
                                        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-[#0C4023] tracking-tight leading-tight">
                                            Create a
                                            <br />
                                            <span className="text-[#59a75c]">Safe Home</span>
                                        </h1>
                                        <div className="mt-3 sm:mt-4 text-[#3d7a40] font-mono text-[10px] xs:text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2">
                                            <div className="h-px w-4 xs:w-6 sm:w-8 bg-[#59a75c]" />
                                            <span className="whitespace-nowrap">NATURAL LIVING</span>
                                            <div className="h-px w-4 xs:w-6 sm:w-8 bg-[#59a75c]" />
                                        </div>
                                    </div>

                                    <p className="text-[#0C4023]/70 text-sm xs:text-base sm:text-lg max-w-xl mx-auto leading-relaxed px-2 sm:px-4">
                                        Discover safe, natural alternatives for a healthy lifestyle.
                                        Read expert blogs and live toxin-free with nature's gifts.
                                    </p>

                                    <button
                                        onClick={() => onNavigate('bright')}
                                        className="group relative inline-flex items-center gap-2 sm:gap-3 px-5 xs:px-6 sm:px-8 py-3 sm:py-4 bg-[#59a75c] text-white font-semibold rounded-lg hover:bg-[#3d7a40] transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden text-sm sm:text-base min-h-[48px] sm:min-h-0"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#3d7a40] to-[#3d7a40] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <BookOpen className="relative z-10 w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="relative z-10 whitespace-nowrap">Explore Safe Living</span>
                                    </button>

                                    <div className="flex items-center justify-center gap-2 sm:gap-4 pt-3 sm:pt-4">
                                        <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-r from-transparent to-[#59a75c]/50" />
                                        <div className="text-[#0C4023] text-[10px] xs:text-xs font-mono whitespace-nowrap">EXPERT WELLNESS TIPS</div>
                                        <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-l from-transparent to-[#59a75c]/50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Email Form Modal */}
            {showEmailForm && (
                <EmailForm onClose={() => setShowEmailForm(false)} />
            )}

            <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
