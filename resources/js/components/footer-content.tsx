import { Link } from '@inertiajs/react';

type FooterLink = { label: string; href: string; external?: boolean };
type FooterColumn = { title: string; links: FooterLink[] };

/** Footer link columns. Edit these to match your real pages. */
const COLUMNS: FooterColumn[] = [
    {
        title: 'Services',
        links: [
            { label: 'Web development', href: '/services/web-development' },
            { label: 'Custom software', href: '/services/custom-software' },
            { label: 'Mobile apps', href: '/services/mobile-apps' },
            { label: 'UI/UX design', href: '/services/design' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About', href: '/about' },
            { label: 'Projects', href: '/projects' },
            { label: 'Blog', href: '/blog' },
            { label: 'Contact', href: '/contact' },
        ],
    },
    {
        title: 'Connect',
        links: [
            { label: 'GitHub', href: 'https://github.com/', external: true },
            { label: 'LinkedIn', href: 'https://linkedin.com/', external: true },
            { label: 'Facebook', href: 'https://facebook.com/', external: true },
        ],
    },
];

const EMAIL = 'hello@codlexa.com';

function FooterAnchor({ link }: { link: FooterLink }) {
    const className =
        'text-sm text-[#080808] transition hover:text-[#00D0F4] focus-visible:text-[#00D0F4] focus-visible:outline-none';

    if (link.external) {
        return (
            <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
                {link.label}
            </a>
        );
    }

    return (
        <Link href={link.href} className={className}>
            {link.label}
        </Link>
    );
}

export default function FooterContent() {
    return (
        <div className="mx-auto max-w-[1400px] px-6 pt-14 sm:px-10">
            <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
                {/* about + contact */}
                <div className="max-w-sm">
                    <p className="text-sm leading-relaxed">
                        We design and build fast, reliable software for
                        businesses that want to grow online.
                    </p>
                    <a
                        href={`mailto:${EMAIL}`}
                        className="mt-5 inline-block text-sm font-semibold text-black underline decoration-[#00D0F4]/50 underline-offset-4 transition hover:text-[#00D0F4] focus-visible:text-[#00D0F4] focus-visible:outline-none"
                    >
                        {EMAIL}
                    </a>
                </div>

                {/* link columns */}
                <nav
                    aria-label="Footer"
                    className="grid grid-cols-2 gap-8 sm:grid-cols-3"
                >
                    {COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h3 className="text-sm font-semibold text-black">
                                {col.title}
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <FooterAnchor link={link} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
}