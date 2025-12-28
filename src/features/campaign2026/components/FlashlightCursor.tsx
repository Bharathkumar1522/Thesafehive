import { useEffect, useState } from 'react';

interface FlashlightCursorProps {
    active: boolean;
}

export default function FlashlightCursor({ active }: FlashlightCursorProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!active) return;

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [active]);

    if (!active) return null;

    return (
        <>
            <div
                className="fixed pointer-events-none z-[9999] mix-blend-screen"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, rgba(245,158,11,0.2) 30%, transparent 70%)',
                    filter: 'blur(20px)',
                }}
            />
            <div
                className="fixed pointer-events-none z-[9999]"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div className="w-4 h-4 bg-amber-400 rounded-full shadow-lg shadow-amber-500/50" />
            </div>
        </>
    );
}
