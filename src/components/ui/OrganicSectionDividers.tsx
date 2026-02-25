/**
 * OrganicSectionDividers.tsx
 *
 * TornPaper — a genuine organic torn-paper edge between two sections.
 *
 * How it works:
 * - The SVG viewBox is 1440 × height.
 * - Two layered paths simulate paper depth:
 *   Path A (shadow): slightly thicker, lower opacity — gives the "paper body" below the tear.
 *   Path B (edge):   the actual torn line, drawn with cubic bezier curves (C/c) so the edge
 *                    is gently undulating — like real torn cardstock — NOT sharp triangles.
 * - flip=true mirrors vertically so the "from" colour comes from below.
 *
 * Usage:
 *   <TornPaper from="#FAF5E4" to="#B85C38" />          // vanilla → terracotta
 *   <TornPaper from="#B85C38" to="#FAF5E4" flip />     // terracotta → vanilla (mirrored)
 */
export function TornPaper({
    from,
    to,
    height = 56,
    flip = false,
}: {
    from: string;
    to: string;
    height?: number;
    flip?: boolean;
}) {
    const H = height;

    /*
     * Each segment is: C cx1,cy1 cx2,cy2 ex,ey
     * Keep amplitudes small (4–14px range in a 56px tall canvas) so the
     * edge reads as soft, organic paper — not teeth.
     *
     * The path starts at 0,H*0.45 and traces the torn edge left→right,
     * then closes down to the bottom-left corner to fill the "from" colour.
     */

    // Shadow/body layer — sits a few px lower, fills behind the top edge
    const shadow = [
        `M0,${H * 0.54}`,
        `C 36,${H * 0.46} 72,${H * 0.60} 108,${H * 0.50}`,
        `C 144,${H * 0.40} 176,${H * 0.58} 216,${H * 0.48}`,
        `C 256,${H * 0.38} 288,${H * 0.56} 324,${H * 0.46}`,
        `C 360,${H * 0.36} 396,${H * 0.54} 432,${H * 0.44}`,
        `C 468,${H * 0.34} 504,${H * 0.52} 540,${H * 0.42}`,
        `C 576,${H * 0.32} 612,${H * 0.52} 648,${H * 0.43}`,
        `C 684,${H * 0.34} 720,${H * 0.55} 756,${H * 0.45}`,
        `C 792,${H * 0.35} 828,${H * 0.54} 864,${H * 0.44}`,
        `C 900,${H * 0.34} 936,${H * 0.53} 972,${H * 0.43}`,
        `C 1008,${H * 0.33} 1044,${H * 0.52} 1080,${H * 0.42}`,
        `C 1116,${H * 0.32} 1152,${H * 0.52} 1188,${H * 0.44}`,
        `C 1224,${H * 0.36} 1260,${H * 0.54} 1296,${H * 0.46}`,
        `C 1332,${H * 0.38} 1368,${H * 0.58} 1404,${H * 0.50}`,
        `C 1416,${H * 0.47} 1428,${H * 0.50} 1440,${H * 0.48}`,
        `L 1440,0 L 0,0 Z`,
    ].join(' ');

    // Crisp torn edge — slightly higher (lower y values = higher on SVG canvas)
    const edge = [
        `M0,${H * 0.46}`,
        `C 28,${H * 0.38} 56,${H * 0.52} 90,${H * 0.43}`,
        `C 124,${H * 0.33} 156,${H * 0.50} 192,${H * 0.41}`,
        `C 228,${H * 0.32} 258,${H * 0.48} 294,${H * 0.39}`,
        `C 330,${H * 0.30} 360,${H * 0.47} 398,${H * 0.38}`,
        `C 436,${H * 0.29} 464,${H * 0.46} 504,${H * 0.37}`,
        `C 544,${H * 0.28} 572,${H * 0.45} 612,${H * 0.36}`,
        `C 652,${H * 0.27} 680,${H * 0.46} 720,${H * 0.37}`,
        `C 760,${H * 0.28} 790,${H * 0.47} 828,${H * 0.37}`,
        `C 866,${H * 0.27} 896,${H * 0.45} 936,${H * 0.36}`,
        `C 976,${H * 0.27} 1006,${H * 0.45} 1044,${H * 0.36}`,
        `C 1082,${H * 0.27} 1112,${H * 0.46} 1152,${H * 0.37}`,
        `C 1192,${H * 0.28} 1220,${H * 0.47} 1260,${H * 0.38}`,
        `C 1300,${H * 0.29} 1328,${H * 0.48} 1368,${H * 0.40}`,
        `C 1392,${H * 0.35} 1416,${H * 0.44} 1440,${H * 0.40}`,
        `L 1440,0 L 0,0 Z`,
    ].join(' ');

    // flip=true: rotate 180° so "from" comes from below (for reversed transitions)
    const transform = flip ? `rotate(180, 720, ${H / 2})` : undefined;

    return (
        <div
            aria-hidden="true"
            style={{
                position: 'relative',
                width: '100%',
                height,
                background: to,
                marginTop: -1,
                marginBottom: -1,
                zIndex: 5,
                lineHeight: 0,
                display: 'block',
            }}
        >
            <svg
                viewBox={`0 0 1440 ${H}`}
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    display: 'block',
                }}
            >
                {/* Shadow body — gives paper depth/thickness */}
                <path d={shadow} fill={from} opacity={0.35} transform={transform} />
                {/* Torn fibrous edge */}
                <path d={edge} fill={from} transform={transform} />
            </svg>
        </div>
    );
}

/* Legacy compat — other pages may import these */
export { TornPaper as TornEdgeDarkToLight };
export { TornPaper as TornEdgeLightToDark };

export function WaveTransition({ fillColor = '#FAF5E4' }: { fillColor?: string; topFillColor?: string }) {
    return <TornPaper from={fillColor} to="transparent" />;
}
export function TornPaperEdgeTop(_p: { className?: string }) { return null; }
export function TornPaperEdgeBottom(_p: { className?: string }) { return null; }
