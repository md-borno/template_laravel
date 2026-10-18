import { Link, router } from '@inertiajs/react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

type NavItem = { label: string; href: string; badge?: string; count?: number };

const products: NavItem[] = [
    // home, about us, services, Portfolio, Blog, Contact, 
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Services', href: '/services', badge: 'NEW' },
    { label: 'Contact', href: '/contact-us' },
];

const explore: NavItem[] = [
    { label: 'Portfolio', href: '/portfolio', count: 12 },
    { label: 'About Us', href: '/about-us' },
    { label: 'Career', href: '/career', badge: 'HIRING' },
];

const stagger = (i: number) => ({ '--i': i }) as CSSProperties;

export default function SiteNavbar() {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);

    // keep the hidden panel out of the tab order
    useEffect(() => {
        if (panelRef.current && 'inert' in panelRef.current) {
            panelRef.current.inert = !open;
        }
    }, [open]);

    // close on Escape and on outside click
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
                toggleRef.current?.focus();
            }
        };
        const onClick = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
                setOpen(false);
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('click', onClick);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('click', onClick);
        };
    }, []);

    // start closing (reverse animation) as soon as an Inertia visit begins
    useEffect(() => router.on('start', () => setOpen(false)), []);

    return (
        <header className="fixed inset-x-0 top-4 z-[1000] flex justify-center">
            <style>{css}</style>

            <div ref={wrapRef} data-open={open} className="mn-wrap">
                <nav
                    aria-label="Main"
                    className="overflow-hidden rounded-[14px] border border-[#DCE4F0] bg-white text-[#0F172A] shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
                >
                    {/* top bar */}
                    <div className="grid h-[60px] grid-cols-[1fr_auto_1fr] items-center pr-2 pl-4">
                        <button
                            ref={toggleRef}
                            type="button"
                            onClick={() => setOpen((o) => !o)}
                            aria-expanded={open}
                            aria-controls="mega-panel"
                            className="flex items-center gap-3 justify-self-start text-[22px] font-medium tracking-tight text-[#0F172A] hover:text-[#004DEB] transition"
                        >
                            <span
                                className="relative block h-4 w-6"
                                aria-hidden="true"
                            >
                                <span className="mn-bar mn-bar1 absolute inset-x-0 top-[3px] h-[1.5px] bg-current" />
                                <span className="mn-bar mn-bar2 absolute inset-x-0 top-[9px] h-[1.5px] bg-current" />
                            </span>
                            Menu
                        </button>

                        <Link
                            href="/"
                            className="flex items-center"
                        >
                            <img
                                src="/icon/codlexa_right.png"
                                alt="CODLEXA"
                                className="h-8 w-auto object-contain"
                            />
                        </Link>

                        <div className="flex items-center gap-1 justify-self-end">
                            <Link
                                href="/login"
                                className="flex h-11 items-center rounded-lg bg-[#004DEB] px-5 text-[18px] font-semibold text-white shadow-sm transition hover:bg-[#0038B8]"
                            >
                                Join
                            </Link>
                        </div>
                    </div>

                    {/* mega panel */}
                    <div id="mega-panel" ref={panelRef} className="mn-panel">
                        <div className="min-h-0 overflow-hidden">
                            <div className="max-h-[calc(100dvh-120px)] overflow-y-auto border-t border-[#DCE4F0] px-3 pb-3">
                                <div className="grid gap-3 pt-3 lg:grid-cols-[1.15fr_1fr_.9fr]">
                                    {/* column 1 */}
                                    <div className="flex flex-col justify-between rounded-2xl border border-[#DCE4F0] bg-[#F8FAFC] p-6 sm:p-8">
                                        <div>
                                            <p
                                                className="mn-kicker mn-reveal mb-5 uppercase text-[#64748B]"
                                                style={stagger(0)}
                                            >
                                                CODLEXA
                                            </p>
                                            {products.map((item, i) => (
                                                <MenuLink
                                                    key={item.href}
                                                    item={item}
                                                    i={i + 1}
                                                />
                                            ))}
                                        </div>
                                        <div
                                            className="mn-reveal mt-10 flex gap-8 text-[20px]"
                                            style={stagger(5)}
                                        >
                                            <Link href="/docs" className="hover:text-[#004DEB] transition">Docs</Link>
                                            <Link
                                                href="/faq"
                                                className="text-[#64748B] hover:text-[#004DEB] transition"
                                            >
                                                FAQ
                                            </Link>
                                        </div>
                                    </div>

                                    {/* column 2 */}
                                    <div className="flex flex-col justify-between rounded-2xl border border-[#DCE4F0] bg-[#FFFFFF] p-6 sm:p-8">
                                        <div>
                                            <p
                                                className="mn-kicker mn-reveal mb-5 uppercase text-[#64748B]"
                                                style={stagger(1)}
                                            >
                                                Explore
                                            </p>
                                            {explore.map((item, i) => (
                                                <MenuLink
                                                    key={item.href}
                                                    item={item}
                                                    i={i + 2}
                                                />
                                            ))}
                                        </div>
                                        <div
                                            className="mn-reveal mt-10 flex gap-2"
                                            style={stagger(6)}
                                        >
                                            <a
                                                href="#"
                                                aria-label="LinkedIn"
                                                className="grid h-[50px] w-[50px] place-items-center rounded-full bg-[#EAF2FF] text-lg font-bold text-[#004DEB] transition hover:bg-[#00D0F4] hover:text-[#0F172A]"
                                            >
                                                in
                                            </a>
                                            <a
                                                href="#"
                                                aria-label="Instagram"
                                                className="grid h-[50px] w-[50px] place-items-center rounded-full bg-[#EAF2FF] text-[#004DEB] transition hover:bg-[#00D0F4] hover:text-[#0F172A]"
                                            >
                                                <svg
                                                    width="22"
                                                    height="22"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <rect
                                                        x="3"
                                                        y="3"
                                                        width="18"
                                                        height="18"
                                                        rx="5"
                                                    />
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="4"
                                                    />
                                                    <circle
                                                        cx="17.5"
                                                        cy="6.5"
                                                        r="1"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </a>
                                            <a
                                                href="#"
                                                aria-label="X"
                                                className="grid h-[50px] w-[50px] place-items-center rounded-full bg-[#EAF2FF] text-[#004DEB] transition hover:bg-[#00D0F4] hover:text-[#0F172A]"
                                            >
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>

                                    {/* column 3: promo card */}
                                    <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#DCE4F0] bg-[#EAF2FF] p-6 text-center sm:p-8">
                                        <p
                                            className="mn-kicker mn-reveal text-[#64748B]"
                                            style={stagger(2)}
                                        >
                                            START{' '}
                                            <span className="mn-badge text-[13px]">
                                                FEATURED
                                            </span>
                                        </p>
                                        <h2
                                            className="mn-reveal text-[clamp(28px,3vw,38px)] leading-[1] font-bold tracking-tight text-[#0F172A]"
                                            style={stagger(3)}
                                        >
                                            Featured Project
                                        </h2>
                                        <div
                                            className="mn-reveal relative h-32 w-48 rounded-2xl bg-white p-2 shadow-inner border border-[#DCE4F0]"
                                            style={stagger(4)}
                                        >
                                            <div className="h-full w-full rounded-xl bg-gradient-to-br from-[#004DEB] via-[#007FF5] to-[#00D0F4]" />
                                        </div>
                                        <Link
                                            href="/projects"
                                            className="mn-reveal rounded-xl bg-[#004DEB] px-6 py-3 text-[17px] font-semibold text-white shadow-sm transition hover:bg-[#0038B8]"
                                            style={stagger(5)}
                                        >
                                            More info
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

function MenuLink({ item, i }: { item: NavItem; i: number }) {
    return (
        <Link href={item.href} className="mn-item mn-reveal" style={stagger(i)}>
            <span className="mn-text">{item.label}</span>
            {item.count !== undefined && (
                <sup className="text-sm text-[#64748B] font-semibold">{item.count}</sup>
            )}
            {item.badge && <span className="mn-badge">{item.badge}</span>}
        </Link>
    );
}

const css = `
.mn-wrap { --ease: cubic-bezier(.76,0,.24,1); width: min(860px, calc(100vw - 24px)); transition: width .6s var(--ease) .6s; }
.mn-wrap[data-open="true"] { width: min(1400px, calc(100vw - 24px)); transition: width .6s var(--ease) 0s; }

.mn-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .6s var(--ease) 0s; }
.mn-wrap[data-open="true"] .mn-panel { grid-template-rows: 1fr; transition: grid-template-rows .7s var(--ease) .55s; }

.mn-reveal { opacity: 0; transform: translateY(16px); transition: opacity .4s ease, transform .6s var(--ease); }
.mn-wrap[data-open="true"] .mn-reveal { opacity: 1; transform: none; transition-delay: calc(1s + var(--i) * .05s); }

.mn-item { display: flex; align-items: center; gap: 10px; padding: 14px 0; font-size: clamp(20px, 2.2vw, 28px); letter-spacing: -.02em; border-bottom: 1px solid #DCE4F0; color: #0F172A; transition: color .2s ease; }
.mn-item:last-child { border-bottom: 0; }
.mn-item:hover { color: #004DEB; }
.mn-text { background: linear-gradient(#004DEB, #004DEB) 0 100% / 0 2px no-repeat; transition: background-size .35s var(--ease); }
.mn-item:hover .mn-text, .mn-item:focus-visible .mn-text { background-size: 100% 2px; }

.mn-badge { background: #EAB308; color: #0F172A; font: 700 11px ui-monospace, monospace; padding: 3px 6px; border-radius: 4px; letter-spacing: .05em; }
.mn-kicker { font: 600 12px ui-monospace, monospace; letter-spacing: .1em; }

.mn-bar { transition: transform .5s var(--ease); }
.mn-wrap[data-open="true"] .mn-bar1 { transform: translateY(3px) rotate(45deg); }
.mn-wrap[data-open="true"] .mn-bar2 { transform: translateY(-3px) rotate(-45deg); }

@media (prefers-reduced-motion: reduce) { .mn-wrap *, .mn-wrap { transition-duration: .01ms !important; transition-delay: 0s !important; animation: none !important; } }
`;
