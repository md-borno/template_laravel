import { useEffect, useRef } from 'react';

type Card = { 
    title: string; 
    description: string; 
    linkText: string;
    image: string;
};

const cards: Card[] = [
    { 
        title: 'EdTech', 
        description: 'LMS solutions built with Moodle: live classes, assessments, compliance & reporting to empower learners.', 
        linkText: 'Learn More',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600'
    },
    { 
        title: 'Fintech', 
        description: 'Secure, scalable fintech & blockchain platforms built to transform payments, lending, and risk management.', 
        linkText: 'Learn More',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600'
    },
    { 
        title: 'E-Commerce', 
        description: 'Transform your store with certified nopCommerce themes, plugins & custom apps for speed, UX & conversion.', 
        linkText: 'Learn More',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600'
    },
    { 
        title: 'Pharma', 
        description: 'Regulation-first pharma & healthcare software: compliant platforms supporting HCPs, education & analytics.', 
        linkText: 'Learn More',
        image: 'https://images.unsplash.com/photo-1532187863486-abf9db6147d5?auto=format&fit=crop&q=80&w=600'
    },
    { 
        title: 'Telecom', 
        description: 'Enterprise-grade telecom applications that scale securely to serve millions with reliability & speed.', 
        linkText: 'Learn More',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600'
    },
    { 
        title: 'Retail', 
        description: 'Smart retail systems streamlining inventory, customer journeys & omnichannel sales for business growth.', 
        linkText: 'Learn More',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600'
    },
    { 
        title: 'Software/ITES', 
        description: 'Cutting-edge custom software & IT-enabled solutions solving complex problems with innovation & agility.', 
        linkText: 'Learn More',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600'
    },
    { 
        title: 'Startups', 
        description: 'Lean, fast-moving digital builds for startups: MVPs, product-market fit & scalable tech from day one.', 
        linkText: 'Learn More',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=600'
    },
];

const SETS = 6; 
const SPEED = 40; 
const RESUME_AFTER = 1500; 
const START_CARD = 2; 

export default function SiteCard() {
    const trackRef = useRef<HTMLDivElement>(null);
    const nodes = useRef<(HTMLElement | null)[]>([]);
    const hover = useRef(false);
    const drag = useRef({ on: false, x: 0, left: 0 });
    const holdUntil = useRef(0);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const n = cards.length;
        const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        let lefts: number[] = [];
        let cardW = 0;
        let pitch = 1;
        let loop = 1;
        let pos = 0;
        let last = performance.now();
        let raf = 0;

        const measure = () => {
            const list = nodes.current.filter(Boolean) as HTMLElement[];
            lefts = list.map((c) => c.offsetLeft);
            cardW = list[0].offsetWidth;
            pitch = lefts[1] - lefts[0];
            loop = lefts[n] - lefts[0];
        };

        const style = () => {
            const vc = el.scrollLeft + el.clientWidth / 2;
            nodes.current.forEach((node, i) => {
                if (!node) return;
                const d = Math.abs(lefts[i] + cardW / 2 - vc) / pitch;
                const s =
                    1 -
                    0.2 * Math.min(d, 1) -
                    0.18 * Math.min(Math.max(d - 1, 0), 1); 
                node.style.transform = `scale(${s.toFixed(3)})`;
                node.style.zIndex = String(100 - Math.round(d * 10));
            });
        };

        const wrap = (v: number) => {
            const lo = loop * 2;
            const span = loop * 2;
            return lo + ((((v - lo) % span) + span) % span);
        };

        const tick = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.1);
            last = now;
            const idle = !drag.current.on && now > holdUntil.current;
            if (!reduce && idle && !hover.current) {
                pos = wrap(pos + SPEED * dt);
                el.scrollLeft = pos;
            } else {
                if (idle) {
                    const w = wrap(el.scrollLeft);
                    if (Math.abs(w - el.scrollLeft) > 1) el.scrollLeft = w;
                }
                pos = el.scrollLeft;
            }
            style();
            raf = requestAnimationFrame(tick);
        };

        measure();
        pos = wrap(lefts[n * 3 + START_CARD] + cardW / 2 - el.clientWidth / 2);
        el.scrollLeft = pos;
        style();

        el.addEventListener('scroll', style, { passive: true });

        const ro = new ResizeObserver(() => {
            const frac = (el.scrollLeft / loop) % 1; 
            measure();
            pos = wrap(loop * 3 + frac * loop);
            el.scrollLeft = pos;
            style();
        });
        ro.observe(el);
        raf = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(raf);
            el.removeEventListener('scroll', style);
            ro.disconnect();
        };
    }, []);

    const hold = () => (holdUntil.current = performance.now() + RESUME_AFTER);

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== 'mouse') return; 
        const el = trackRef.current!;
        drag.current = { on: true, x: e.clientX, left: el.scrollLeft };
        el.setPointerCapture(e.pointerId);
        el.classList.add('pc-dragging');
    };
    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (drag.current.on)
            trackRef.current!.scrollLeft =
                drag.current.left - (e.clientX - drag.current.x);
    };
    const endDrag = () => {
        if (!drag.current.on) return;
        drag.current.on = false;
        trackRef.current?.classList.remove('pc-dragging');
        hold();
    };

    let k = 0;
    return (
        <section className="pc-section" aria-label="Industries We Power">
            <style>{css}</style>
            
            <div className="pc-header">
                <h2>
                    Industries We Power <br/>
                    <span>with Innovation</span>
                </h2>
            </div>

            <div
                ref={trackRef}
                className="pc-track"
                onPointerEnter={(e) =>
                    e.pointerType === 'mouse' && (hover.current = true)
                }
                onPointerLeave={() => (hover.current = false)}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onWheel={hold}
                onTouchStart={hold}
                onTouchEnd={hold}
            >
                {Array.from({ length: SETS }).flatMap((_, set) =>
                    cards.map((c, i) => {
                        const idx = k++;
                        return (
                            <article
                                key={`${set}-${i}`}
                                ref={(node) => {
                                    nodes.current[idx] = node;
                                }}
                                className="pc-card"
                                aria-hidden={set !== 0}
                            >
                                <div className="pc-img">
                                    <img src={c.image} alt={`${c.title} industry`} loading="lazy" />
                                </div>
                                <div className="pc-info">
                                    <h3 className="pc-name">{c.title}</h3>
                                    <p className="pc-desc">{c.description}</p>
                                    
                                </div>
                            </article>
                        );
                    }),
                )}
            </div>
        </section>
    );
}

const css = `
.pc-section { position: relative; z-index: 10; isolation: isolate; background: #F8FAFC; padding: clamp(48px, 6vw, 80px) 0; overflow: hidden; font-family: system-ui, -apple-system, sans-serif; }

.pc-header { text-align: center; margin-bottom: 24px; padding: 0 24px; }
.pc-header h2 { font-size: clamp(32px, 4vw, 48px); font-weight: 700; color: #0F172A; line-height: 1.2; margin: 0; }
.pc-header h2 span { color: #3B82F6; }

.pc-track { --w: clamp(280px, 36vw, 420px); display: flex; align-items: center; overflow-x: auto;
  padding: 40px 0 72px 0; scrollbar-width: none; cursor: grab; user-select: none; overscroll-behavior-x: contain; }
.pc-track::-webkit-scrollbar { display: none; }
.pc-track.pc-dragging { cursor: grabbing; }

.pc-card { flex: 0 0 var(--w); margin-left: calc(var(--w) * -.35); aspect-ratio: 387 / 520; display: flex; flex-direction: column;
  overflow: hidden; border-radius: 16px; background: #FFFFFF; color: #0F172A; border: 1px solid #DCE4F0; box-shadow: 0 16px 40px rgba(15,23,42,.08); will-change: transform; transition: box-shadow 0.3s ease; }
.pc-card:hover { box-shadow: 0 24px 48px rgba(15,23,42,.12); }

.pc-img { flex: 0 0 45%; position: relative; overflow: hidden; background-color: #E2E8F0; }
.pc-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
.pc-card:hover .pc-img img { transform: scale(1.05); }

.pc-info { flex: 1; display: flex; flex-direction: column; padding: clamp(20px, 2.5vw, 32px); border-top: 1px solid #DCE4F0; min-width: 0; background: #FFFFFF; }

.pc-name { margin: 0; font-size: clamp(20px, 2.2vw, 26px); font-weight: 700; letter-spacing: -.02em; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pc-desc { margin: 12px 0 0; font-size: clamp(14px, 1.1vw, 15px); color: #64748B; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
.pc-link { margin-top: auto; display: inline-flex; align-items: center; gap: 6px; color: #3B82F6; font-weight: 600; font-size: 15px; text-decoration: none; transition: color 0.2s ease; }
.pc-link:hover { color: #2563EB; }
.pc-link span { transition: transform 0.2s ease; }
.pc-link:hover span { transform: translateX(4px); }
`;