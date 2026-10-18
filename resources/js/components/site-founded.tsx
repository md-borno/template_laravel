import React, { useEffect, useRef, useState } from 'react';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

function prefersReducedMotion(): boolean {
    return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/** Flips to true once the element scrolls into view. */
function useInView<T extends HTMLElement>(threshold = 0.25) {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
            setInView(true);
            return;
        }

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { threshold },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold]);

    return { ref, inView };
}

/** Eased count-up that starts when `active` becomes true. */
function useCountUp(from: number, to: number, active: boolean, duration = 1800, delay = 0) {
    const [value, setValue] = useState(from);

    useEffect(() => {
        if (!active) return;
        if (prefersReducedMotion()) {
            setValue(to);
            return;
        }

        let raf = 0;
        let start: number | null = null;

        const timer = setTimeout(() => {
            const step = (ts: number) => {
                if (start === null) start = ts;
                const p = Math.min((ts - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 4);
                setValue(Math.round(from + (to - from) * eased));
                if (p < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
        }, delay);

        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(raf);
        };
    }, [active, from, to, duration, delay]);

    return value;
}

type Stat = {
    from: number;
    to: number;
    suffix?: string;
    label: string;
};

const stats: Stat[] = [
    { from: 2000, to: 2025, label: 'Year Founded' },
    { from: 0, to: 50, suffix: '+', label: 'Global Partners' },
    { from: 0, to: 100, suffix: '%', label: 'Bootstrapped' },
    { from: 0, to: 24, suffix: '/7', label: 'Innovation Cycle' },
];

function StatItem({ stat, index, active }: { stat: Stat; index: number; active: boolean }) {
    const delay = 700 + index * 150;
    const value = useCountUp(stat.from, stat.to, active, 1800, delay);

    return (
        <div
            className="flex flex-col items-center"
            style={{
                opacity: active ? 1 : 0,
                transform: active ? 'translateY(0)' : 'translateY(32px)',
                filter: active ? 'blur(0)' : 'blur(6px)',
                transition: `opacity 0.9s ${EASE} ${delay}ms, transform 0.9s ${EASE} ${delay}ms, filter 0.9s ${EASE} ${delay}ms`,
            }}
        >
            <p className="mb-2 text-4xl font-bold tabular-nums text-slate-900 md:text-5xl">
                {value}
                {stat.suffix}
            </p>
            <div
                aria-hidden="true"
                className="mb-3 h-0.5 w-8 origin-center bg-blue-600"
                style={{
                    transform: active ? 'scaleX(1)' : 'scaleX(0)',
                    transition: `transform 0.8s ${EASE} ${delay + 500}ms`,
                }}
            />
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500 md:text-base">{stat.label}</p>
        </div>
    );
}

const SiteFounded = () => {
    const { ref, inView } = useInView<HTMLElement>(0.25);

    return (
        <section ref={ref} className="relative overflow-hidden font-sans">
            {/* Ambient glow that blooms in behind the heading */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[720px] max-w-[90vw] -translate-x-1/2 rounded-full bg-blue-500/15 blur-3xl"
                style={{
                    opacity: inView ? 1 : 0,
                    transform: `translateX(-50%) scale(${inView ? 1 : 0.6})`,
                    transition: `opacity 1.8s ${EASE}, transform 2.2s ${EASE}`,
                }}
            />

            <div className="relative mx-auto max-w-5xl px-4 py-16 text-center md:px-8 md:py-24">
                <div className="flex flex-col items-center">
                    {/* Heading: each line rises out of its own mask */}
                    <h2 className="mb-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                        <span className="block overflow-hidden pb-2">
                            <span
                                className="block"
                                style={{
                                    transform: inView ? 'translateY(0)' : 'translateY(110%)',
                                    transition: `transform 1.1s ${EASE} 0s`,
                                }}
                            >
                                Born in 2025.
                            </span>
                        </span>
                        <span className="block overflow-hidden pb-2">
                            <span
                                className="block bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 bg-clip-text text-transparent"
                                style={{
                                    backgroundSize: '220% 100%',
                                    backgroundPosition: inView ? '0% 50%' : '100% 50%',
                                    transform: inView ? 'translateY(0)' : 'translateY(110%)',
                                    transition: `transform 1.1s ${EASE} 0.15s, background-position 2.4s ${EASE} 0.4s`,
                                }}
                            >
                                Built for the Future.
                            </span>
                        </span>
                    </h2>

                    {/* Description: comes into focus */}
                    <p
                        className="mb-14 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl"
                        style={{
                            opacity: inView ? 1 : 0,
                            filter: inView ? 'blur(0)' : 'blur(10px)',
                            transform: inView ? 'translateY(0)' : 'translateY(20px)',
                            transition: `opacity 1.2s ${EASE} 0.45s, filter 1.2s ${EASE} 0.45s, transform 1.2s ${EASE} 0.45s`,
                        }}
                    >
                        Founded at the intersection of AI and enterprise technology, we started with a simple mission:
                        to eliminate tech waste and accelerate digital transformation for forward-thinking brands. Since
                        our inception in 2025, we have grown from a lean startup team into a global powerhouse of
                        innovators.
                    </p>

                    {/* Divider draws itself from the center */}
                    <div
                        aria-hidden="true"
                        className="mb-12 h-px w-full origin-center bg-gradient-to-r from-transparent via-blue-600/60 to-transparent"
                        style={{
                            transform: inView ? 'scaleX(1)' : 'scaleX(0)',
                            transition: `transform 1.6s ${EASE} 0.55s`,
                        }}
                    />

                    {/* Stats */}
                    <div className="grid w-full grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
                        {stats.map((stat, i) => (
                            <StatItem key={stat.label} stat={stat} index={i} active={inView} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SiteFounded;