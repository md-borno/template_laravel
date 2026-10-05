import { Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

/** Height of the curve (px) when the footer first appears. Change this to make the dome taller or flatter. */
const MAX_CURVE = 160;

/** The name shown in the footer. */
const NAME = 'company';

/** Width the name should fill, in SVG units (the SVG box is 1000 wide = full footer width). */
const FILL = 1012;

export default function SiteFooter() {
    const footerRef = useRef<HTMLElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const arcRef = useRef<SVGPathElement>(null);
    const textRef = useRef<SVGTextElement>(null);
    const baseline = useRef(240);

    useEffect(() => {
        const el = footerRef.current;
        const svg = svgRef.current;
        const text = textRef.current;
        if (!el || !svg || !text) return;

        const reduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        let frame = 0;

        // size the name so it spans the whole width, edge to edge
        const fit = () => {
            text.setAttribute('font-size', '100');
            const len = text.getComputedTextLength();
            if (!len) return;
            const fs = (100 * FILL) / len;
            text.setAttribute('font-size', String(fs));
            baseline.current = fs * 0.74; // roughly the cap height
            svg.setAttribute(
                'viewBox',
                `0 0 1000 ${baseline.current + fs * 0.04}`,
            );
        };

        const update = () => {
            frame = 0;
            const vh = window.innerHeight;
            const remaining =
                document.documentElement.scrollHeight - vh - window.scrollY;
            const span = Math.min(el.offsetHeight, vh);

            // 0 = footer just starting to appear, 1 = scrolled to the very bottom
            const p = reduced
                ? 1
                : 1 - Math.min(Math.max(remaining / span, 0), 1);
            const eased = p * p * (3 - 2 * p); // smoothstep: flattens slowly near the bottom
            const curve = MAX_CURVE * (1 - eased);

            el.style.borderRadius = `50% 50% 0 0 / ${curve}px ${curve}px 0 0`;

            // bend the name with the same curve (px -> SVG units)
            const arc = arcRef.current;
            if (arc) {
                const width = svg.getBoundingClientRect().width || 1000;
                const rise = Math.min(curve * (1000 / width), 140);
                const b = baseline.current;
                arc.setAttribute(
                    'd',
                    `M 0 ${b} Q 500 ${b - 2 * rise} 1000 ${b}`,
                );
            }
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        fit();
        update();
        document.fonts?.ready.then(() => {
            fit();
            update();
        });
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative overflow-hidden bg-[#f1f1ed] text-[#1b1a19] will-change-[border-radius]"
            style={{
                borderRadius: `50% 50% 0 0 / ${MAX_CURVE}px ${MAX_CURVE}px 0 0`,
            }}
        >
            {/* the name: full width, bends with the footer curve, straight at the bottom */}
            <svg
                ref={svgRef}
                aria-hidden="true"
                viewBox="0 0 1000 260"
                className="block h-auto w-full overflow-visible select-none"
                style={{ marginTop: MAX_CURVE + 8 }}
            >
                <defs>
                    <path
                        ref={arcRef}
                        id="footer-name-arc"
                        d="M 0 240 Q 500 10 1000 240"
                        fill="none"
                    />
                </defs>
                <text
                    ref={textRef}
                    fill="currentColor"
                    fontSize="300"
                    fontWeight="800"
                    style={{ fontFamily: 'inherit', letterSpacing: '-0.03em' }}
                >
                    <textPath
                        href="#footer-name-arc"
                        startOffset="50%"
                        textAnchor="middle"
                    >
                        {NAME}
                    </textPath>
                </text>
            </svg>

            {/* bottom row */}
            <div className="mx-auto max-w-[1400px] px-6 pb-5 sm:px-10">
                <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#dcdcd6] pt-5 text-sm opacity-70 sm:flex-row">
                    <p>
                        © {new Date().getFullYear()} {NAME}. All rights
                        reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:underline">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:underline">
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
