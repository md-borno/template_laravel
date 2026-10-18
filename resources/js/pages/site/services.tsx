import { Head, Link } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';
import { ArrowRight, Code, Cpu, Globe, Layers, ShieldCheck, Sparkles } from 'lucide-react';

const services = [
    {
        title: 'Custom Software Development',
        desc: 'Tailored enterprise and web solutions engineered for high performance, modularity, and scalability.',
        icon: Code,
        featured: false,
    },
    {
        title: 'Cloud Architecture & DevOps',
        desc: 'Automated CI/CD pipelines, container orchestration, and high-availability cloud infrastructure.',
        icon: Cpu,
        featured: true,
        tag: 'Popular',
    },
    {
        title: 'Web & Mobile Engineering',
        desc: 'Full-stack responsive web applications and cross-platform mobile apps with seamless UX.',
        icon: Globe,
        featured: false,
    },
    {
        title: 'System Modernization',
        desc: 'Refactor legacy codebases into modern decoupled microservices with minimal downtime.',
        icon: Layers,
        featured: false,
    },
    {
        title: 'Security & Compliance',
        desc: 'End-to-end vulnerability audits, data encryption, and compliance-driven architecture.',
        icon: ShieldCheck,
        featured: false,
    },
    {
        title: 'AI & Data Integration',
        desc: 'Deploy intelligent automation, LLM pipelines, and actionable predictive data models.',
        icon: Sparkles,
        featured: true,
        tag: 'Enterprise',
    },
];

export default function Services() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
            <Head title="Services - Codlexa" />
            <SiteNavbar />
            
            <main className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl">
                        High-Impact Digital Solutions
                    </h1>
                    <p className="mt-4 text-lg text-[#64748B]">
                        We build robust, elegant, and future-ready technology products aligned with your strategic objectives.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((svc, i) => {
                        const Icon = svc.icon;
                        return (
                            <div
                                key={i}
                                className={`relative flex flex-col justify-between rounded-2xl border bg-white p-8 shadow-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                                    svc.featured
                                        ? 'border-[#00D0F4] ring-1 ring-[#00D0F4]/40'
                                        : 'border-[#DCE4F0]'
                                }`}
                            >
                                {svc.tag && (
                                    <span className="absolute top-6 right-6 inline-block rounded-full bg-[#EAB308] px-3 py-1 text-xs font-bold text-[#0F172A] shadow-xs">
                                        {svc.tag}
                                    </span>
                                )}
                                <div>
                                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#004DEB]">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0F172A]">{svc.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
                                        {svc.desc}
                                    </p>
                                </div>
                                <div className="mt-8 pt-4 border-t border-[#DCE4F0]">
                                    <Link
                                        href="/contact-us"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#004DEB] transition-colors hover:text-[#0038B8]"
                                    >
                                        Learn more <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA Banner */}
                <div className="mt-20 overflow-hidden rounded-3xl bg-linear-to-r from-[#004DEB] via-[#007FF5] to-[#00D0F4] p-10 text-white shadow-xl sm:p-14">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-extrabold sm:text-4xl text-white">
                            Ready to accelerate your project?
                        </h2>
                        <p className="mt-4 text-white/90 text-base">
                            Partner with our dedicated team to turn technical complexity into a competitive advantage.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact-us"
                                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-bold text-[#0F172A] transition-colors hover:bg-[#EAF2FF] shadow-md"
                            >
                                Start a Conversation
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}