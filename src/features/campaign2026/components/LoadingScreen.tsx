import { useEffect, useState } from 'react';
import { Shield, Sparkles, CheckCircle, TrendingUp } from 'lucide-react';
import Logo from './Logo';

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState(0);

    const stages = [
        { text: "INITIALIZING PLATFORM", icon: Shield },
        { text: "LOADING ANALYTICS", icon: TrendingUp },
        { text: "PREPARING DASHBOARD", icon: Sparkles },
        { text: "READY TO LAUNCH", icon: CheckCircle }
    ];

    useEffect(() => {
        const duration = 2500;
        const interval = 20;
        const steps = duration / interval;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    useEffect(() => {
        const currentStageIndex = Math.min(
            Math.floor((progress / 100) * stages.length),
            stages.length - 1
        );
        setStage(currentStageIndex);
    }, [progress]);

    const CurrentIcon = stages[stage].icon;

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-[#0C0C0E] via-[#0C4023] to-[#0C0C0E] flex flex-col items-center justify-center z-50 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#59a75c]/20 via-[#0C4023]/10 to-transparent" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />

            {/* Logo */}
            <div className="relative z-10 mb-8">
                <Logo className="h-16 w-auto" variant="light" />
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-md px-8 flex flex-col items-center">

                {/* Animated Icon Container */}
                <div className="mb-12 relative">
                    <div className="absolute inset-0 bg-[#59a75c]/30 blur-3xl rounded-full animate-pulse" />
                    <div className="relative w-24 h-24 flex items-center justify-center border border-[#59a75c]/40 rounded-full bg-[#0C0C0E]/50 backdrop-blur-sm shadow-premium">
                        <CurrentIcon className="w-10 h-10 text-[#59a75c] animate-pulse" />

                        {/* Rotating Rings */}
                        <div className="absolute inset-0 border border-[#59a75c]/30 rounded-full animate-[spin_3s_linear_infinite]" />
                        <div className="absolute inset-2 border border-[#d4a542]/20 rounded-full animate-[spin_4s_linear_infinite_reverse]" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="text-center mb-8 space-y-2">
                    <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#59a75c] to-[#6EBF73] font-semibold text-xl tracking-[0.2em]">
                        {stages[stage].text}
                    </h2>
                    <div className="text-[#59a75c]/60 text-xs font-medium tracking-widest">
                        TOXIN DETECTIVE • THESAFEHIVE
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-[#0C4023]/50 relative overflow-hidden rounded-full">
                    <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#59a75c] to-[#6EBF73] shadow-[0_0_20px_rgba(89,167,92,0.5)] transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Percentage */}
                <div className="mt-4 text-[#59a75c]/80 font-semibold text-sm">
                    {Math.round(progress)}%
                </div>

            </div>

            {/* Corner Accents */}
            <div className="absolute top-8 left-8 w-32 h-32 border-l border-t border-[#59a75c]/10" />
            <div className="absolute bottom-8 right-8 w-32 h-32 border-r border-b border-[#d4a542]/10" />


        </div>
    );
}
