import { useState, useEffect, lazy, Suspense } from 'react';
import LoadingScreen from './components/LoadingScreen';
import FlashlightCursor from './components/FlashlightCursor';

const HomeSplit = lazy(() => import('./components/HomeSplit'));
const DarkSide = lazy(() => import('./components/DarkSide'));
const BrightSide = lazy(() => import('./components/BrightSide'));

type View = 'loading' | 'home' | 'dark' | 'bright';

export default function Campaign2026Container() {
    const [view, setView] = useState<View>('loading');
    const [showFlashlight, setShowFlashlight] = useState(false);

    useEffect(() => {
        setShowFlashlight(view === 'dark');
    }, [view]);

    // Preload components
    useEffect(() => {
        const preloadComponents = async () => {
            await Promise.all([
                import('./components/HomeSplit'),
                import('./components/DarkSide'),
                import('./components/BrightSide')
            ]);
        };
        preloadComponents();
    }, []);

    const handleLoadingComplete = () => {
        setView('home');
    };

    const handleNavigate = (side: 'dark' | 'bright') => {
        setView(side);
    };

    const handleBack = () => {
        setView('home');
    };

    return (
        <div className="campaign-2026-root relative min-h-screen bg-[#0a0a0a] text-white font-sans">
            <FlashlightCursor active={showFlashlight} />
            {view === 'loading' && <LoadingScreen onComplete={handleLoadingComplete} />}

            <Suspense fallback={<div className="fixed inset-0 bg-[#0a0a0a]" />}>
                {view === 'home' && <HomeSplit onNavigate={handleNavigate} />}
                {view === 'dark' && <DarkSide onBack={handleBack} />}
                {view === 'bright' && <BrightSide onBack={handleBack} />}
            </Suspense>
        </div>
    );
}
