import { useEffect, useRef } from 'react';

type Card = { brand: string; name: string; badge?: string };

const cards: Card[] = [
    { brand: 'Amazon', name: 'Kindle Paperwhite' },
    { brand: 'Away', name: 'The Carry-On' },
    { brand: 'Bose', name: 'Headphones 700', badge: 'NEW' },
    { brand: 'Onsen', name: 'Towel Set' },
    { brand: 'Kinto', name: 'Travel Tumbler 500ml' },
    { brand: 'Brand', name: 'Product name' },
    { brand: 'Brand', name: 'Product name' },
    { brand: 'Brand', name: 'Product name' },
];

const SETS = 6; // the list is repeated so the loop is seamless on wide screens
const SPEED = 40; // auto-scroll speed, px per second
const RESUME_AFTER = 1500; // ms before auto-scroll resumes after wheel / touch / drag
const START_CARD = 2; // which card is centered first

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

        // coverflow: centre card is biggest, cards shrink with distance from the middle
        const style = () => {
            const vc = el.scrollLeft + el.clientWidth / 2;
            nodes.current.forEach((node, i) => {
                if (!node) return;
                const d = Math.abs(lefts[i] + cardW / 2 - vc) / pitch;
                const s =
                    1 -
                    0.2 * Math.min(d, 1) -
                    0.18 * Math.min(Math.max(d - 1, 0), 1); // centre = 1, next = .8, then .62
                node.style.transform = `scale(${s.toFixed(3)})`;
                node.style.zIndex = String(100 - Math.round(d * 10));
            });
        };

        // every set looks identical, so shifting by whole loops is invisible.
        // we only do it while idle, so it never interrupts a drag, swipe or wheel.
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
                pos = wrap(pos + SPEED * dt); // float position so slow speeds are not rounded away
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

        // keep sizes in sync with native scrolling on the same frame (no lag / wobble)
        el.addEventListener('scroll', style, { passive: true });

        const ro = new ResizeObserver(() => {
            const frac = (el.scrollLeft / loop) % 1; // same place in the loop after a resize
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
        if (e.pointerType !== 'mouse') return; // touch uses native scrolling
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
        <section className="pc-section" aria-label="Featured products">
            <style>{css}</style>
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
                                <div className="pc-img" />
                                <div className="pc-info">
                                    <p className="pc-brand">
                                        {c.badge && (
                                            <span className="pc-badge">
                                                {c.badge}
                                            </span>
                                        )}
                                        {c.brand}
                                    </p>
                                    <h3 className="pc-name">{c.name}</h3>
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
.pc-section { background: #111113; padding: clamp(24px, 5vw, 64px) 0; overflow: hidden; }

.pc-track { --w: clamp(250px, 34vw, 500px); display: flex; align-items: center; overflow-x: auto;
  padding: 72px 0; scrollbar-width: none; cursor: grab; user-select: none; overscroll-behavior-x: contain; }
.pc-track::-webkit-scrollbar { display: none; }
.pc-track.pc-dragging { cursor: grabbing; }

.pc-card { flex: 0 0 var(--w); margin-left: calc(var(--w) * -.4); aspect-ratio: 387 / 495; display: flex; flex-direction: column;
  overflow: hidden; border-radius: 14px; background: #fff; color: #111; box-shadow: 0 20px 50px rgba(0,0,0,.5); will-change: transform; }

.pc-img { flex: 0 0 78%; background: #f5f5f5; }
.pc-info { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 0 clamp(16px, 2vw, 30px); border-top: 1px solid #ececec; min-width: 0; }
.pc-brand { display: flex; align-items: center; gap: 8px; margin: 0; font-size: clamp(13px, 1.1vw, 16px); color: #9a9a9a; white-space: nowrap; }
.pc-badge { background: #efefef; color: #222; border-radius: 4px; padding: 2px 7px; font-size: clamp(11px, .95vw, 13px); font-weight: 500; }
.pc-name { margin: 4px 0 0; font-size: clamp(18px, 2.2vw, 30px); font-weight: 600; letter-spacing: -.02em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
`;
