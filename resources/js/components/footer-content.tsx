import { Link } from '@inertiajs/react';

type FooterLink = { label: string; href: string; external?: boolean };
type FooterColumn = { title: string; links: FooterLink[] };

/** Footer link columns. Edit these to match your real pages. */
const COLUMNS: FooterColumn[] = [
    {
        title: 'Services',
        links: [
            { label: 'All Services', href: '/services' },
            { label: 'Web Development', href: '/services' },
            { label: 'Custom Software', href: '/services' },
            { label: 'Cloud Architecture', href: '/services' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About Us', href: '/about-us' },
            { label: 'Portfolio & Projects', href: '/portfolio' },
            { label: 'Careers', href: '/career' },
            { label: 'Blog & Insights', href: '/blog' },
            { label: 'Contact Us', href: '/contact-us' },
        ],
    },
    {
        title: 'Connect',
        links: [
            { label: 'GitHub', href: 'https://github.com/codlexa', external: true },
            { label: 'LinkedIn', href: 'https://linkedin.com/company/codlexa', external: true },
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