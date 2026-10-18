import { useEffect, useState } from 'react';

// Default icon sets - you can easily swap these out by passing props
const DEFAULT_ROW_1 = [
    'devicon-python-plain colored',
    'devicon-javascript-plain colored',
    'devicon-typescript-plain colored',
    'devicon-go-original-wordmark colored',
    'devicon-rust-original text-black',
    'devicon-cplusplus-plain colored',
    'devicon-java-plain colored',
    'devicon-swift-plain colored',
    'devicon-docker-plain colored',
    'devicon-amazonwebservices-plain-wordmark colored',
    'devicon-linux-plain text-black',
    'devicon-github-original text-black',
];

const DEFAULT_ROW_2 = [
    'devicon-react-original colored',
    'devicon-vuejs-plain colored',
    'devicon-angularjs-plain colored',
    'devicon-svelte-plain colored',
    'devicon-nextjs-plain text-black',
    'devicon-django-plain colored',
    'devicon-spring-original colored',
    'devicon-laravel-original colored',
    'devicon-tailwindcss-original colored',
    'devicon-flutter-plain colored',
    'devicon-kubernetes-plain colored',
    'devicon-postgresql-plain colored',
];

interface SiteMovingIconProps {
    row1Icons?: string[];
    row2Icons?: string[];
    className?: string;
}

export default function SiteMovingIcon({
    row1Icons = DEFAULT_ROW_1,
    row2Icons = DEFAULT_ROW_2,
    className = '',
}: SiteMovingIconProps) {
    // Inject Devicon stylesheet if it doesn't exist yet
    useEffect(() => {
        if (!document.querySelector('link[href*="devicon.min.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
            document.head.appendChild(link);
        }
    }, []);

    return (
        <div className={`relative w-full overflow-hidden bg-[#F8FAFC] py-12 ${className}`}>
            {/* Inline styles for the marquee animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee-left {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0%); }
                }
                .animate-marquee-left {
                    display: flex;
                    width: max-content;
                    animation: marquee-left 35s linear infinite;
                }
                .animate-marquee-right {
                    display: flex;
                    width: max-content;
                    animation: marquee-right 40s linear infinite;
                }
                .group:hover .animate-marquee-left,
                .group:hover .animate-marquee-right {
                    animation-play-state: paused;
                }
                `
            }} />

            <div className="group relative w-full max-w-[100vw] space-y-12">

                {/* TRACK 1: Moves Left */}
                <div className="relative w-full overflow-hidden z-10">
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-20"></div>
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-20"></div>

                    <div className="animate-marquee-left gap-12 flex items-center">
                        <IconRow icons={row1Icons} />
                        <IconRow icons={row1Icons} ariaHidden={true} />
                    </div>
                </div>

                {/* TRACK 2: Moves Right */}
                <div className="relative w-full overflow-hidden z-10">
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-20"></div>
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-20"></div>

                    <div className="animate-marquee-right gap-12 flex items-center">
                        <IconRow icons={row2Icons} />
                        <IconRow icons={row2Icons} ariaHidden={true} />
                    </div>
                </div>

            </div>
        </div>
    );
}

/** 
 * Sub-component to render a single set of icons.
 * Reused twice per row to create the seamless loop.
 */
function IconRow({ icons, ariaHidden = false }: { icons: string[], ariaHidden?: boolean }) {
    return (
        <div className="flex items-center gap-12 shrink-0 px-6" aria-hidden={ariaHidden}>
            {icons.map((iconClass, index) => (
                <div
                    key={`${iconClass}-${index}`}
                    className="flex items-center justify-center w-[100px] h-[100px] bg-transparent cursor-pointer"
                >
                    <i
                        className={`${iconClass} text-[4rem] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-125`}
                    ></i>
                </div>
            ))}
        </div>
    );
}