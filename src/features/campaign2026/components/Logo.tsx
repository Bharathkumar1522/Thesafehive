interface LogoProps {
    className?: string;
    variant?: 'light' | 'dark';
}

export default function Logo({ className = '', variant = 'light' }: LogoProps) {
    const textColor = variant === 'light' ? '#FFFFFF' : '#0C4023';
    const leafColor = '#59a75c';

    return (
        <svg
            viewBox="0 0 200 50"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Leaf Icon */}
            <g transform="translate(10, 10)">
                <path
                    d="M15 5 Q20 0, 25 5 Q30 10, 25 20 Q20 30, 15 25 Q10 20, 10 15 Q10 10, 15 5 Z"
                    fill={leafColor}
                    opacity="0.9"
                />
                <path
                    d="M15 10 L20 20"
                    stroke={leafColor}
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.6"
                />
            </g>

            {/* TheSafeHive Text */}
            <text
                x="45"
                y="32"
                fontFamily="'Outfit', 'Inter', sans-serif"
                fontSize="24"
                fontWeight="700"
                fill={textColor}
                letterSpacing="0.5"
            >
                TheSafeHive
            </text>
        </svg>
    );
}
