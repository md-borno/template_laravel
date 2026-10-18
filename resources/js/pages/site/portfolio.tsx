import { Head, Link } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';
import { ArrowUpRight } from 'lucide-react';

const projects = [
    {
        title: 'Nexus Cloud Enterprise Portal',
        category: 'Web Architecture',
        description: 'Scalable multi-tenant dashboard and monitoring system handling 100k+ daily transactions.',
        tag: 'Featured',
        accent: 'from-[#004DEB] to-[#007FF5]',
    },
    {
        title: 'FinPay Decentralized Gateway',
        category: 'Fintech & Security',
        description: 'Ultra-secure payment pipeline with microsecond verification times and military-grade encryption.',
        tag: 'High Impact',
        accent: 'from-[#007FF5] to-[#00D0F4]',
    },
    {
        title: 'Aero Logistics Fleet Intelligence',
        category: 'Real-time Tracking',
        description: 'IoT telemetry processing engine delivering live route optimization and condition alerting.',
        tag: 'Enterprise',
        accent: 'from-[#00D0F4] to-[#004DEB]',
    },
    {
        title: 'Pulse Health Telemedicine Suite',
        category: 'Healthcare SaaS',
        description: 'HIPAA-compliant video consulting and patient record synchronization application.',
        tag: 'Client Success',
        accent: 'from-[#004DEB] to-[#00D0F4]',
    },
];

export default function Portfolio() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
            <Head title="Portfolio - Codlexa" />
            <SiteNavbar />

            <main className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-block rounded-full bg-[#FFFBEB] px-4 py-1 text-xs font-bold tracking-wider text-[#713F12] uppercase border border-[#EAB308]/40 mb-4">
                        Selected Works
                    </span>
                    <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl">
                        Engineered for Real-World Impact
                    </h1>
                    <p className="mt-4 text-lg text-[#64748B]">
                        Explore our portfolio of scalable web applications, enterprise platforms, and digital products.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#DCE4F0] bg-white p-8 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-[#00D0F4]/60 hover:-translate-y-1"
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <span className="rounded-full bg-[#E0FAFF] px-3.5 py-1 text-xs font-bold text-[#009FCE]">
                                    {project.category}
                                </span>
                                <span className="rounded-full bg-[#EAB308] px-3 py-1 text-xs font-bold text-[#0F172A] shadow-xs">
                                    {project.tag}
                                </span>
                            </div>

                            {/* Graphic preview mockup box */}
                            <div className={`mb-6 h-48 w-full rounded-2xl bg-gradient-to-br ${project.accent} flex items-center justify-center p-6 text-white shadow-inner relative overflow-hidden group-hover:scale-[1.01] transition-transform`}>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="text-center">
                                    <div className="font-extrabold text-2xl tracking-tight drop-shadow-sm">{project.title}</div>
                                    <div className="text-xs uppercase tracking-widest text-white/80 mt-1">Live Case Study</div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-[#0F172A] group-hover:text-[#004DEB] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
                                    {project.description}
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-[#DCE4F0]">
                                <Link
                                    href="/contact-us"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#004DEB] transition-colors group-hover:text-[#0038B8]"
                                >
                                    Explore project details <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}