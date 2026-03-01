import { useState, FormEvent } from 'react';
import { ArrowLeft, Lightbulb, Send, Trophy, Sparkles, CheckCircle, XCircle, Star } from 'lucide-react';
import { CaseData } from './DarkSide';
import Confetti from 'react-confetti';

interface DetectiveGameProps {
    case: CaseData;
    onBack: () => void;
}

export default function DetectiveGame({ case: caseData, onBack }: DetectiveGameProps) {
    const [hintsRevealed, setHintsRevealed] = useState(0);
    const [answer, setAnswer] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleRevealHint = () => {
        if (hintsRevealed < caseData.hints.length) {
            setHintsRevealed(hintsRevealed + 1);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        const userAnswer = answer.toLowerCase().trim();
        const correct = userAnswer === caseData.correctAnswer.toLowerCase() ||
            caseData.alternativeAnswers.some(alt => alt.toLowerCase() === userAnswer);

        setIsCorrect(correct);

        if (correct) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0C0C0E] via-[#1A1A1D] to-[#2E2E32] text-white">
            {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

            <div className="relative z-10">
                <header className="border-b border-[#59a75c]/20 bg-black/30 backdrop-blur-sm sticky top-0 z-20">
                    <div className="container mx-auto px-6 py-4">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-[#59a75c] hover:text-[#6EBF73] transition-colors mb-4"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-mono text-sm">BACK TO CASES</span>
                        </button>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-[#59a75c] text-sm font-mono mb-1">{caseData.id}</div>
                                <h1 className="text-3xl font-bold text-[#59a75c]">{caseData.title}</h1>
                                <p className="text-gray-400 mt-1">{caseData.subtitle}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-400 mb-1">Danger Level</div>
                                <div className={`text-3xl font-bold ${caseData.dangerLevel === 'CRITICAL' ? 'text-[#DC2626]' : 'text-[#d4a542]'
                                    }`}>
                                    {caseData.dangerLevel}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-6 py-12 max-w-5xl">
                    {!isSubmitted ? (
                        /* Investigation Phase */
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Case Details */}
                                <div className="bg-gray-900/50 border border-[#59a75c]/20 rounded-xl p-6 backdrop-blur-sm">
                                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <span className="text-[#59a75c]">📋</span> Case Details
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-400 mb-2">Location</h3>
                                            <p className="text-white">{caseData.location}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-400 mb-2">Key Findings</h3>
                                            <ul className="space-y-2">
                                                {caseData.findings.map((finding, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-gray-300">
                                                        <span className="text-[#59a75c] mt-1">•</span>
                                                        <span>{finding}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-400 mb-2">Chemicals Detected</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {caseData.chemicals.map((chemical, i) => (
                                                    <span key={i} className="px-3 py-1 bg-[#DC2626]/20 text-[#DC2626] text-sm rounded-full border border-[#DC2626]/30">
                                                        {chemical}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Hints */}
                                <div className="bg-gray-900/50 border border-[#d4a542]/20 rounded-xl p-6 backdrop-blur-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-2xl font-bold flex items-center gap-2">
                                            <Lightbulb className="w-6 h-6 text-[#d4a542]" />
                                            Detective Hints
                                        </h2>
                                        <span className="text-sm text-gray-400">
                                            {hintsRevealed}/{caseData.hints.length} revealed
                                        </span>
                                    </div>

                                    {hintsRevealed === 0 ? (
                                        <p className="text-gray-400 mb-4">Need help solving the case? Reveal hints one at a time!</p>
                                    ) : (
                                        <div className="space-y-3 mb-4">
                                            {caseData.hints.slice(0, hintsRevealed).map((hint, i) => (
                                                <div key={i} className="p-3 bg-[#d4a542]/10 border border-[#d4a542]/30 rounded-lg">
                                                    <div className="flex items-start gap-2">
                                                        <span className="text-[#d4a542] font-bold">Hint {i + 1}:</span>
                                                        <span className="text-gray-300">{hint}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {hintsRevealed < caseData.hints.length && (
                                        <button
                                            onClick={handleRevealHint}
                                            className="w-full py-2 bg-[#d4a542]/20 border border-[#d4a542] text-[#d4a542] rounded-lg hover:bg-[#d4a542] hover:text-white transition-all duration-300"
                                        >
                                            Reveal Next Hint
                                        </button>
                                    )}
                                </div>

                                {/* Submit Answer */}
                                <div className="bg-gray-900/50 border border-[#59a75c]/20 rounded-xl p-6 backdrop-blur-sm">
                                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <Send className="w-6 h-6 text-[#59a75c]" />
                                        Submit Your Answer
                                    </h2>
                                    <p className="text-gray-400 mb-4">
                                        What is the main toxic substance or material in this case?
                                    </p>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <input
                                            type="text"
                                            id="answer"
                                            name="answer"
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            placeholder="Enter your answer..."
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#59a75c] focus:outline-none text-white placeholder-gray-500"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="w-full py-3 bg-[#59a75c] text-white font-semibold rounded-lg hover:bg-[#3d7a40] transition-all duration-300 shadow-lg hover:shadow-[#59a75c]/50 flex items-center justify-center gap-2"
                                        >
                                            <Send className="w-5 h-5" />
                                            Submit Answer
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Evidence */}
                                <div className="bg-gray-900/50 border border-[#59a75c]/20 rounded-xl p-6 backdrop-blur-sm">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <span className="text-[#59a75c]">🔍</span> Evidence
                                    </h3>
                                    <ul className="space-y-2">
                                        {caseData.evidence.map((item, i) => (
                                            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                                <span className="text-[#59a75c]">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Status */}
                                <div className="bg-gray-900/50 border border-[#59a75c]/20 rounded-xl p-6 backdrop-blur-sm text-center">
                                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-2 ${caseData.status === 'URGENT' ? 'bg-[#DC2626] text-white' : 'bg-[#59a75c] text-white'
                                        }`}>
                                        {caseData.status}
                                    </div>
                                    <p className="text-xs text-gray-400">Case Status</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Result Phase */
                        <div className="max-w-3xl mx-auto">
                            {isCorrect ? (
                                /* Correct Answer - WOW FACTOR! */
                                <div className="text-center space-y-8 animate-fadeIn">
                                    {/* Trophy Animation */}
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-[#d4a542]/20 blur-3xl rounded-full animate-pulse" />
                                        <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[#d4a542] to-[#e8b84d] rounded-full shadow-2xl animate-bounce">
                                            <Trophy className="w-16 h-16 text-white" />
                                        </div>
                                    </div>

                                    {/* Success Message */}
                                    <div>
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-8 h-8 text-[#d4a542] fill-[#d4a542] animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                                            ))}
                                        </div>
                                        <h2 className="text-5xl font-bold text-[#59a75c] mb-4">
                                            🎉 Case Solved! 🎉
                                        </h2>
                                        <p className="text-2xl text-gray-300 mb-2">
                                            Excellent detective work!
                                        </p>
                                        <p className="text-gray-400">
                                            You correctly identified: <span className="text-[#59a75c] font-bold">{caseData.correctAnswer}</span>
                                        </p>
                                    </div>

                                    {/* Explanation */}
                                    <div className="bg-[#59a75c]/10 border-2 border-[#59a75c] rounded-xl p-6 text-left">
                                        <div className="flex items-start gap-3 mb-4">
                                            <CheckCircle className="w-6 h-6 text-[#59a75c] flex-shrink-0 mt-1" />
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">The Truth Revealed</h3>
                                                <p className="text-gray-300 leading-relaxed">{caseData.explanation}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fun Fact */}
                                    <div className="bg-[#d4a542]/10 border-2 border-[#d4a542] rounded-xl p-6 text-left">
                                        <div className="flex items-start gap-3">
                                            <Sparkles className="w-6 h-6 text-[#d4a542] flex-shrink-0 mt-1" />
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">Did You Know?</h3>
                                                <p className="text-gray-300 leading-relaxed">{caseData.funFact}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Safe Alternatives */}
                                    <div className="bg-gray-900/50 border border-[#59a75c]/30 rounded-xl p-6 text-left">
                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="text-[#59a75c]">✅</span> Safe Alternatives
                                        </h3>
                                        <ul className="space-y-2">
                                            {caseData.safeAlternatives.map((alt, i) => (
                                                <li key={i} className="flex items-start gap-2 text-gray-300">
                                                    <span className="text-[#59a75c] mt-1">•</span>
                                                    <span>{alt}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={onBack}
                                            className="px-8 py-3 bg-[#59a75c] text-white font-semibold rounded-lg hover:bg-[#3d7a40] transition-all duration-300 shadow-lg"
                                        >
                                            Solve Another Case
                                        </button>
                                        <a
                                            href="https://www.thesafehive.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-8 py-3 bg-transparent border-2 border-[#59a75c] text-[#59a75c] font-semibold rounded-lg hover:bg-[#59a75c] hover:text-white transition-all duration-300"
                                        >
                                            Learn More at TheSafeHive
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                /* Incorrect Answer */
                                <div className="text-center space-y-6 animate-fadeIn">
                                    <div className="inline-flex items-center justify-center w-24 h-24 bg-[#DC2626]/20 rounded-full">
                                        <XCircle className="w-16 h-16 text-[#DC2626]" />
                                    </div>

                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-4">
                                            Not Quite Right
                                        </h2>
                                        <p className="text-gray-400 mb-6">
                                            Your answer: <span className="text-gray-300 font-semibold">{answer}</span>
                                        </p>
                                        <p className="text-gray-400">
                                            The correct answer was: <span className="text-[#59a75c] font-bold">{caseData.correctAnswer}</span>
                                        </p>
                                    </div>

                                    {/* Explanation */}
                                    <div className="bg-gray-900/50 border border-[#59a75c]/30 rounded-xl p-6 text-left">
                                        <h3 className="text-xl font-bold text-white mb-3">What You Should Know</h3>
                                        <p className="text-gray-300 leading-relaxed mb-4">{caseData.explanation}</p>
                                        <p className="text-gray-400 text-sm italic">{caseData.funFact}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={() => {
                                                setIsSubmitted(false);
                                                setAnswer('');
                                            }}
                                            className="px-8 py-3 bg-[#d4a542] text-white font-semibold rounded-lg hover:bg-[#b8902e] transition-all duration-300"
                                        >
                                            Try Again
                                        </button>
                                        <button
                                            onClick={onBack}
                                            className="px-8 py-3 bg-transparent border-2 border-[#59a75c] text-[#59a75c] font-semibold rounded-lg hover:bg-[#59a75c] hover:text-white transition-all duration-300"
                                        >
                                            Back to Cases
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
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
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
