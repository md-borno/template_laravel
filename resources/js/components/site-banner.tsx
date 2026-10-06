import type { CSSProperties } from 'react';

const TITLE = 'BUSINESS CONCEPT';
const DOTS = [
    '#e91e63',
    '#d01c5e',
    '#b01a62',
    '#931a60',
    '#7a1559',
    '#651250',
    '#531049',
    '#430e46',
    '#340b42',
    '#26093d',
    '#16063a',
];
const characters = TITLE.split('').map(char => ({ segment: char }));
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

// isometric keyboard keys
const A = [100, 520],
    U = [230, -120],
    V = [70, 35];
const pt = (a: number, b: number) =>
    `${(A[0] + U[0] * a + V[0] * b).toFixed(0)},${(A[1] + U[1] * a + V[1] * b).toFixed(0)}`;
const KEYS: string[] = [];
for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 12; c++) {
        const a0 = 0.04 + c * 0.08,
            a1 = a0 + 0.065,
            b0 = 0.08 + r * 0.18,
            b1 = b0 + 0.14;
        KEYS.push([pt(a0, b0), pt(a1, b0), pt(a1, b1), pt(a0, b1)].join(' '));
    }
}

export default function SiteBanner() {
    return (
        <section className="bc-root relative h-screen w-full overflow-hidden">
            <style>{css}</style>
            <div className="bc-bg absolute inset-0" />

            <div className="bc-cam absolute inset-0">
                {/* paper layers */}
                <div
                    className="bc-layer absolute inset-0"
                    style={{
                        ...delay(3.3),
                        filter: 'drop-shadow(3px 5px 5px rgba(0,0,0,.28))',
                    }}
                >
                    <div className="bc-l3 absolute inset-0 bg-white" />
                </div>
                <div
                    className="bc-layer absolute inset-0"
                    style={{
                        ...delay(3.15),
                        filter: 'drop-shadow(3px 5px 5px rgba(0,0,0,.22))',
                    }}
                >
                    <div className="bc-l2 absolute inset-0 bg-white" />
                </div>
                <div
                    className="bc-layer absolute inset-0"
                    style={{
                        ...delay(3),
                        filter: 'drop-shadow(3px 5px 5px rgba(0,0,0,.22))',
                    }}
                >
                    <div className="bc-l1 absolute inset-0 bg-white" />
                </div>

                {/* colored shape: line -> expand */}
                <div className="bc-poly absolute inset-0">
                    <div
                        className="bc-grow absolute inset-0"
                        style={{
                            background:
                                'linear-gradient(135deg,#e91e63 0%,#a0145a 25%,#5a0f55 55%,#2a0845 100%)',
                        }}
                    >
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    'linear-gradient(to top right,rgba(233,30,99,.9),transparent 55%)',
                            }}
                        />
                    </div>
                    <div className="bc-sweep absolute inset-0" />
                </div>

                {/* illustration */}
                <svg
                    className="bc-float bc-illus absolute"
                    viewBox="0 0 620 560"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="bc-scr" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#ff3c8e" />
                            <stop offset="1" stopColor="#8a1a6a" />
                        </linearGradient>
                        <linearGradient id="bc-bk" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#8a1a6a" />
                            <stop offset="1" stopColor="#3a0b50" />
                        </linearGradient>
                        <linearGradient id="bc-mug" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#ffffff" />
                            <stop offset=".6" stopColor="#e8d9ee" />
                            <stop offset="1" stopColor="#b79ac4" />
                        </linearGradient>
                    </defs>

                    {/* computer */}
                    <g className="bc-part" style={delay(3.8)}>
                        <polygon
                            points="10,230 320,40 320,310 10,500"
                            fill="#1d0a3d"
                        />
                        <polygon
                            points="28,235 312,62 312,225 28,400"
                            fill="url(#bc-scr)"
                        />
                        <polygon
                            points="28,400 312,225 312,300 28,470"
                            fill="#4a0f5c"
                        />
                        <polygon
                            points="60,300 200,215 200,225 60,310"
                            fill="#fff"
                            opacity=".12"
                        />
                        <polygon
                            points="130,470 230,418 255,440 150,500"
                            fill="#1a1020"
                        />
                        <polygon
                            points="110,500 245,430 275,450 140,520"
                            fill="#2a1535"
                        />
                    </g>

                    {/* book */}
                    <g className="bc-part" style={delay(4.2)}>
                        <polygon
                            points="300,135 400,80 445,100 345,160"
                            fill="#f4f4f4"
                        />
                        <polygon
                            points="300,135 345,160 345,175 300,150"
                            fill="#e91e7a"
                        />
                        <polygon
                            points="345,160 445,100 445,330 345,390"
                            fill="url(#bc-bk)"
                        />
                        <polygon
                            points="345,160 345,390 305,370 305,150"
                            fill="#a3186a"
                        />
                        <g stroke="#a0a0a0" strokeWidth="3">
                            <line x1="320" y1="130" x2="410" y2="82" />
                            <line x1="326" y1="136" x2="416" y2="88" />
                            <line x1="332" y1="142" x2="422" y2="94" />
                        </g>
                        <polygon
                            points="365,200 425,165 425,185 365,220"
                            fill="#fff"
                            opacity=".18"
                        />
                    </g>

                    {/* keyboard */}
                    <g className="bc-part" style={delay(4.6)}>
                        <polygon
                            points="100,532 330,412 405,447 175,567"
                            fill="#12081a"
                            opacity=".5"
                        />
                        <polygon
                            points="100,520 330,400 400,430 170,555"
                            fill="#2c2c32"
                        />
                        <polygon
                            points="100,520 170,555 170,562 100,527"
                            fill="#1a1a1f"
                        />
                        {KEYS.map((p, i) => (
                            <polygon key={i} points={p} fill="#4a4a4f" />
                        ))}
                    </g>

                    {/* mouse */}
                    <g className="bc-part" style={delay(4.9)}>
                        <ellipse
                            cx="445"
                            cy="470"
                            rx="46"
                            ry="20"
                            fill="#12081a"
                            opacity=".45"
                        />
                        <ellipse
                            cx="445"
                            cy="458"
                            rx="44"
                            ry="22"
                            fill="#3c3c42"
                            transform="rotate(-22 445 458)"
                        />
                        <path
                            d="M410,452 Q440,430 470,440"
                            stroke="#666"
                            strokeWidth="3"
                            fill="none"
                        />
                        <ellipse
                            cx="440"
                            cy="447"
                            rx="6"
                            ry="4"
                            fill="#e91e7a"
                            transform="rotate(-22 440 447)"
                        />
                    </g>

                    {/* coffee mug */}
                    <g className="bc-part" style={delay(5.2)}>
                        <ellipse
                            cx="525"
                            cy="405"
                            rx="52"
                            ry="20"
                            fill="#12081a"
                            opacity=".45"
                        />
                        <path
                            d="M562,345 C600,340 598,398 560,396"
                            stroke="#e8d9ee"
                            strokeWidth="10"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <path
                            d="M487,330 L487,392 A38,18 0 0 0 563,392 L563,330 Z"
                            fill="url(#bc-mug)"
                        />
                        <ellipse
                            cx="525"
                            cy="330"
                            rx="38"
                            ry="18"
                            fill="#fff"
                        />
                        <ellipse
                            cx="525"
                            cy="332"
                            rx="31"
                            ry="14"
                            fill="#3b1a0f"
                        />
                        <ellipse
                            cx="520"
                            cy="329"
                            rx="14"
                            ry="5"
                            fill="#6b3a22"
                            opacity=".8"
                        />
                        <path
                            d="M500,350 L500,385"
                            stroke="#e91e7a"
                            strokeWidth="5"
                            strokeLinecap="round"
                            opacity=".8"
                        />
                        <g
                            className="bc-steam"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="4"
                            strokeLinecap="round"
                        >
                            <path d="M505,305 q-10,-15 0,-28 q10,-14 0,-28" />
                            <path
                                d="M527,300 q-10,-15 0,-28 q10,-14 0,-28"
                                style={delay(0.8)}
                            />
                            <path
                                d="M549,305 q-10,-15 0,-28 q10,-14 0,-28"
                                style={delay(1.6)}
                            />
                        </g>
                    </g>

                    {/* mountains */}
                    <g className="bc-part" style={delay(5.5)}>
                        <polygon points="30,500 55,420 80,500" fill="#5a1670" />
                        <polygon points="55,420 45,455 65,455" fill="#fff" />
                        <polygon
                            points="65,510 100,400 135,510"
                            fill="#6b1a7a"
                        />
                        <polygon points="100,400 85,450 115,450" fill="#fff" />
                        <polygon
                            points="105,510 130,450 155,510"
                            fill="#4a0f5c"
                        />
                        <polygon points="130,450 122,475 138,475" fill="#fff" />
                    </g>
                </svg>

                {/* banner */}
                <div
                    className="bc-banner bc-bn absolute"
                    style={{
                        background:
                            'linear-gradient(90deg,#14003a,#5a0f55 60%,#a0145a)',
                    }}
                >
                    <h1
                        className="bc-title absolute top-1/2 -translate-y-1/2 font-extrabold tracking-wide whitespace-nowrap text-white"
                        aria-label={TITLE}
                    >
                        {characters.map(({ segment: ch }, i) => (
                            <span
                                key={i}
                                aria-hidden="true"
                                className="bc-ch"
                                style={delay(4.5 + i * 0.05)}
                            >
                                {ch === ' ' ? '\u00A0' : ch}
                            </span>
                        ))}
                    </h1>
                    <div className="absolute top-0 right-0 flex h-full gap-3 pr-1">
                        {[0, 1, 2].map((n) => (
                            <span
                                key={n}
                                className="h-full w-5 -skew-x-12 border-l-4 border-white/90"
                            />
                        ))}
                    </div>
                </div>

                {/* text */}
                <div className="bc-fade bc-text absolute" style={delay(5.4)}>
                    <h2 className="bc-h2 font-light tracking-wide text-neutral-700">
                        LOREM IPSUM
                    </h2>
                    <p className="bc-p mt-2 leading-snug text-neutral-600">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Ut wisi enim ad
                        minim veniam, quis nostrud exerci tation ullamcorper
                        suscipit lobortis nisl ut aliquip ex ea commodo
                        consequat.
                    </p>
                </div>

                {/* dots */}
                <div className="bc-dots absolute flex">
                    {DOTS.map((c, i) => (
                        <span
                            key={c}
                            className="bc-pop bc-dot rounded-full"
                            style={{
                                background: c,
                                animationDelay: `${5.7 + i * 0.08}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="bc-vig" />
            <div className="bc-grain" />
            <div className="bc-bar bc-bar-t" />
            <div className="bc-bar bc-bar-b" />
        </section>
    );
}

const css = `
.bc-root { --ease: cubic-bezier(.77,0,.18,1); --out: cubic-bezier(.16,1,.3,1); background: #07000f; }

.bc-cam { transform: scale(1.12); animation: bc-cam 7s var(--out) forwards; }
@keyframes bc-cam { to { transform: scale(1); } }

.bc-bg { background: #07000f; animation: bc-bg 1.8s var(--ease) 2.2s forwards; }
@keyframes bc-bg { to { background: #fafafa; } }

.bc-poly { clip-path: polygon(0 0, 25% 0, 62% 50%, 25% 100%, 0 100%); }

.bc-grow { transform-origin: 0 50%; transform: scale(0,.004); animation: bc-grow 3.4s var(--ease) .5s forwards; }
@keyframes bc-grow {
  0%   { transform: scale(0,.004); filter: brightness(2.2) blur(1px); }
  38%  { transform: scale(1,.004); filter: brightness(2.2) blur(0); }
  48%  { transform: scale(1,.004); }
  100% { transform: scale(1,1); filter: brightness(1); }
}

.bc-sweep { background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.28) 50%, transparent 65%); transform: translateX(-120%); animation: bc-sweep 2.2s ease-in-out 3.6s forwards; }
@keyframes bc-sweep { to { transform: translateX(120%); } }

.bc-layer { opacity: 0; transform: translateX(-6%); animation: bc-layer 1.4s var(--out) forwards; }
@keyframes bc-layer { to { opacity: 1; transform: none; } }

.bc-part { opacity: 0; filter: blur(14px); transform: translateY(40px) scale(.96); transform-box: fill-box; transform-origin: center; animation: bc-focus 1.5s var(--out) forwards; }
@keyframes bc-focus { to { opacity: 1; filter: blur(0); transform: none; } }
.bc-float { animation: bc-float 6s ease-in-out 5s infinite; }
@keyframes bc-float { 50% { transform: translateY(-10px); } }

.bc-steam path { stroke-dasharray: 60; stroke-dashoffset: 60; animation: bc-steam 3.2s ease-in-out infinite; }
@keyframes bc-steam { 0% { stroke-dashoffset: 60; opacity: 0; } 30% { opacity: .8; } 100% { stroke-dashoffset: -60; opacity: 0; } }

.bc-banner { clip-path: inset(0 100% 0 0); animation: bc-wipe 1.4s var(--ease) 3.9s forwards; }
@keyframes bc-wipe { to { clip-path: inset(0 0 0 0); } }
.bc-ch { display: inline-block; opacity: 0; filter: blur(10px); transform: translateY(30px); animation: bc-focus 1s var(--out) forwards; }

.bc-fade { opacity: 0; transform: translateY(26px); filter: blur(6px); animation: bc-focus 1.3s var(--out) forwards; }
.bc-pop { opacity: 0; transform: scale(0); animation: bc-pop .6s var(--out) forwards; }
@keyframes bc-pop { to { opacity: 1; transform: scale(1); } }

.bc-bar { position: absolute; left: 0; right: 0; height: 14vh; background: #000; z-index: 50; animation: bc-bar 1.6s var(--ease) 3.4s forwards; }
.bc-bar-t { top: 0; --to: -100%; }
.bc-bar-b { bottom: 0; --to: 100%; }
@keyframes bc-bar { to { transform: translateY(var(--to)); } }

.bc-vig { position: absolute; inset: 0; z-index: 40; pointer-events: none; background: radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.28) 100%); }
.bc-grain { position: absolute; inset: -50%; z-index: 41; pointer-events: none; opacity: .07; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  animation: bc-grain .6s steps(4) infinite; }
@keyframes bc-grain { 25% { transform: translate(-3%,2%); } 50% { transform: translate(2%,-3%); } 75% { transform: translate(-2%,-1%); } }

.bc-l1 { clip-path: polygon(0 0,25% 0,62.3% 50%,26.5% 100%,0 100%); }
.bc-l2 { clip-path: polygon(0 0,25% 0,62.6% 50%,27.8% 100%,0 100%); }
.bc-l3 { clip-path: polygon(0 0,25% 0,63% 50%,29% 100%,0 100%); }
.bc-illus { left: 3%; top: 20%; height: 70%; width: auto; }
.bc-bn { left: 41%; right: 0; top: 10.5%; height: 11.5%; }
.bc-title { left: 19%; font-size: clamp(1.2rem, 3.2vw, 3.2rem); }
.bc-text { left: 65%; top: 66%; width: 27%; }
.bc-h2 { font-size: clamp(1rem, 1.8vw, 1.8rem); }
.bc-p { font-size: clamp(.55rem, .8vw, .85rem); }
.bc-dots { left: 65.5%; top: 85.5%; gap: .9vw; }
.bc-dot { width: 1.4vw; height: 1.4vw; }

/* mobile / portrait: shape on top pointing down, content stacked below */
@media (max-width: 767px) {
  .bc-poly { clip-path: polygon(0 0,100% 0,100% 45%,50% 62%,0 45%); }
  .bc-l1 { clip-path: polygon(0 0,100% 0,100% 46.2%,50% 63%,0 46.2%); }
  .bc-l2 { clip-path: polygon(0 0,100% 0,100% 46.8%,50% 63.8%,0 46.8%); }
  .bc-l3 { clip-path: polygon(0 0,100% 0,100% 47.5%,50% 65%,0 47.5%); }
  .bc-illus { left: 4%; top: 5%; width: 92%; height: auto; }
  .bc-bn { left: 0; right: 0; top: 68%; height: 8%; }
  .bc-title { left: 7%; font-size: clamp(1rem, 5.4vw, 1.7rem); }
  .bc-text { left: 8%; top: 79%; width: 84%; }
  .bc-h2 { font-size: 1.2rem; }
  .bc-p { font-size: .78rem; }
  .bc-dots { left: 8%; top: 94%; gap: 1.8vw; }
  .bc-dot { width: 3.4vw; height: 3.4vw; }
  .bc-bar { height: 8vh; }
}

@media (prefers-reduced-motion: reduce) { .bc-root *, .bc-root { animation-duration: .01ms !important; animation-delay: 0s !important; } }
`;
