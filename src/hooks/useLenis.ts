// src/hooks/useLenis.ts
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

let lenisInstance: Lenis | null = null;

export function getLenis() {
    return lenisInstance;
}

export function useLenis() {
    const rafRef = useRef<number>(0);

    useEffect(() => {
        // ─── PERFORMANCE FIX: Disable Lenis on touch devices ─────────
        // Low-end mobile CPUs struggle with hijacking the scroll thread via JS RequestAnimationFrame.
        // It also breaks native iOS/Android momentum physics. We bypass it entirely on touch screens.
        const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

        if (isTouchDevice) {
            console.log('[TheSafeHive] Touch device detected. Bypassing Lenis for native 60fps scrolling.');
            return;
        }

        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisInstance = lenis;

        // Integrate with Framer Motion loop
        const raf = (time: number) => {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        };
        rafRef.current = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafRef.current);
            lenis.destroy();
            lenisInstance = null;
        };
    }, []);
}
