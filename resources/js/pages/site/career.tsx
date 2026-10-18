import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';
import { Briefcase, CheckCircle2, Clock, MapPin, Sparkles, Send } from 'lucide-react';

type Job = {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    experience: string;
    description: string;
    skills: string[];
};

const jobs: Job[] = [
    {
        id: 1,
        title: 'Senior Laravel Developer',
        department: 'Engineering',
        location: 'Dhaka, Bangladesh / Remote',
        type: 'Full-time',
        experience: '2–4 years',
        description:
            'Architect scalable backend systems, develop robust REST/GraphQL APIs, and lead database optimization using modern Laravel ecosystems.',
        skills: ['Laravel', 'PHP 8.2+', 'MySQL', 'Redis', 'Docker'],
    },
    {
        id: 2,
        title: 'Full Stack React & Inertia Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        experience: '1–3 years',
        description:
            'Craft responsive, accessible user interfaces using React, TypeScript, Tailwind CSS, and Inertia.js with ultra-fast page transitions.',
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Inertia.js'],
    },
    {
        id: 3,
        title: 'Senior UI/UX & Product Designer',
        department: 'Design',
        location: 'Remote',
        type: 'Full-time',
        experience: '2–4 years',
        description:
            'Design intuitive digital interfaces, micro-animations, and complete design systems for enterprise SaaS and high-growth mobile applications.',
        skills: ['Figma', 'Prototyping', 'Design Systems', 'Micro-interactions'],
    },
    {
        id: 4,
        title: 'Cloud DevOps & Infrastructure Engineer',
        department: 'Operations',
        location: 'Remote',
        type: 'Full-time',
        experience: '2+ years',
        description:
            'Manage automated CI/CD deployment pipelines, container orchestration, AWS/DigitalOcean cloud infrastructure, and security hardening.',
        skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
    },
];

export default function Career() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        portfolio: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
            <Head title="Careers - Join CODLEXA" />
            <SiteNavbar />

            {/* Hero Section */}
            <section className="relative isolate overflow-hidden bg-[#0F172A] px-6 pt-36 pb-24 text-white sm:pt-40 sm:pb-32">
                <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-96 w-96 rounded-full bg-[#004DEB]/30 blur-[100px]" />
                <div className="pointer-events-none absolute -bottom-32 left-1/4 -z-10 h-96 w-96 rounded-full bg-[#00D0F4]/20 blur-[100px]" />

                <div className="mx-auto max-w-7xl">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#00D0F4]/40 bg-[#00D0F4]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D0F4] mb-6">
                            <span className="h-2 w-2 rounded-full bg-[#00D0F4] animate-pulse" />
                            We Are Actively Hiring
                        </div>

                        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl text-white">
                            Build the future.
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00D0F4] to-[#007FF5]">
                                Grow with CODLEXA.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                            We believe great people build world-class technology. Join our dedicated engineering and design team to solve challenging problems and deliver impactful digital products.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="#open-positions"
                                className="inline-flex items-center gap-2 rounded-full bg-[#004DEB] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#004DEB]/30 transition hover:bg-[#0038B8]"
                            >
                                Explore {jobs.length} Open Positions ↓
                            </a>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl">
                        {[
                            { title: 'High-Impact Work', desc: 'Build products used by tens of thousands of active users worldwide.' },
                            { title: 'Remote-First Culture', desc: 'Work from anywhere with flexible hours and asynchronous clarity.' },
                            { title: 'Continuous Growth', desc: 'Annual learning stipend, conference budgets, and mentorship.' },
                        ].map((perk) => (
                            <div
                                key={perk.title}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                            >
                                <h3 className="font-bold text-white text-lg">{perk.title}</h3>
                                <p className="mt-2 text-sm text-slate-300 leading-relaxed">{perk.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section id="open-positions" className="px-6 py-24 mx-auto max-w-7xl">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end mb-12">
                    <div>
                        <span className="inline-block rounded-full bg-[#FFFBEB] px-4 py-1 text-xs font-bold tracking-wider text-[#713F12] uppercase border border-[#EAB308]/40 mb-3">
                            Current Openings
                        </span>
                        <h2 className="text-3xl font-extrabold sm:text-4xl text-[#0F172A]">
                            Find Your Next Challenge
                        </h2>
                        <p className="mt-2 text-base text-[#64748B]">
                            Select a role below to review requirements and submit your application.
                        </p>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-[#E0FAFF] px-4 py-1.5 text-sm font-bold text-[#009FCE] border border-[#00D0F4]/30">
                        {jobs.length} Active Positions
                    </span>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="group relative flex flex-col justify-between rounded-3xl border border-[#DCE4F0] bg-white p-8 shadow-xs transition-all duration-300 hover:border-[#00D0F4] hover:shadow-xl hover:-translate-y-1"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div>
                                        <span className="inline-block rounded-full bg-[#EAF2FF] px-3 py-1 text-xs font-bold text-[#004DEB] mb-2">
                                            {job.department}
                                        </span>
                                        <h3 className="text-2xl font-bold text-[#0F172A] group-hover:text-[#004DEB] transition-colors">
                                            {job.title}
                                        </h3>
                                    </div>
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#004DEB] group-hover:bg-[#004DEB] group-hover:text-white transition-colors">
                                        <Briefcase className="h-5 w-5" />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 text-xs text-[#64748B] mb-4">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-medium">
                                        <MapPin className="h-3 w-3" /> {job.location}
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-medium">
                                        <Clock className="h-3 w-3" /> {job.type}
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-medium">
                                        <Sparkles className="h-3 w-3" /> {job.experience}
                                    </span>
                                </div>

                                <p className="text-sm leading-relaxed text-[#64748B] mb-6">
                                    {job.description}
                                </p>

                                <div className="flex flex-wrap gap-1.5">
                                    {job.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-md border border-[#DCE4F0] bg-[#F8FAFC] px-2.5 py-1 text-xs font-semibold text-[#0F172A]"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-[#DCE4F0] flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedJob(job);
                                        setSubmitted(false);
                                        document
                                            .getElementById('application-form')
                                            ?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-[#004DEB] transition-colors hover:text-[#0038B8]"
                                >
                                    Apply for Position →
                                </button>
                                <span className="text-xs text-[#94A3B8] font-mono">REQ-{job.id}09</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Application Form */}
            <section id="application-form" className="bg-white px-6 py-24 border-t border-[#DCE4F0]">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <span className="inline-block rounded-full bg-[#E0FAFF] px-4 py-1 text-xs font-bold tracking-wider text-[#009FCE] uppercase border border-[#00D0F4]/40 mb-3">
                            Direct Application
                        </span>
                        <h2 className="text-3xl font-extrabold sm:text-4xl text-[#0F172A]">
                            Start Your Application
                        </h2>
                        <p className="mt-4 text-base text-[#64748B] leading-relaxed">
                            {selectedJob
                                ? `You are applying for: ${selectedJob.title} (${selectedJob.department}). Tell us about your journey and links to code or portfolio.`
                                : 'Select a position above, or submit a general inquiry to introduce yourself to our hiring team.'}
                        </p>

                        <div className="mt-8 space-y-4">
                            {[
                                'Transparent, two-stage interview process without trivial puzzle tests',
                                'Fast feedback loop — we reply to every applicant within 72 hours',
                                'Direct interaction with senior engineering leads and architects',
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-[#059669] shrink-0 mt-0.5" />
                                    <p className="text-sm text-[#0F172A] font-medium">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-[#DCE4F0] bg-[#F8FAFC] p-8 shadow-xs">
                        {submitted ? (
                            <div className="py-12 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF2FF] text-[#059669]">
                                    <CheckCircle2 className="h-10 w-10" />
                                </div>
                                <h3 className="mt-5 text-2xl font-bold text-[#0F172A]">
                                    Application Received!
                                </h3>
                                <p className="mt-3 text-sm text-[#64748B] max-w-md mx-auto">
                                    Thank you for applying to CODLEXA. Our technical recruitment team will review your submission and contact you via email shortly.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#004DEB] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#0038B8]"
                                >
                                    Submit Another Application
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-2">
                                        Selected Role
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={selectedJob ? selectedJob.title : 'General Application'}
                                        className="w-full rounded-xl border border-[#DCE4F0] bg-white px-4 py-3 text-sm font-semibold text-[#0F172A] shadow-xs"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Jane Doe"
                                            className="w-full rounded-xl border border-[#DCE4F0] bg-white px-4 py-3 text-sm text-[#0F172A] shadow-xs focus:border-[#004DEB] focus:outline-none focus:ring-1 focus:ring-[#004DEB]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="jane@example.com"
                                            className="w-full rounded-xl border border-[#DCE4F0] bg-white px-4 py-3 text-sm text-[#0F172A] shadow-xs focus:border-[#004DEB] focus:outline-none focus:ring-1 focus:ring-[#004DEB]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-2">
                                        GitHub / LinkedIn / Portfolio URL *
                                    </label>
                                    <input
                                        type="url"
                                        required
                                        value={formData.portfolio}
                                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                                        placeholder="https://github.com/username or linkedin.com/in/..."
                                        className="w-full rounded-xl border border-[#DCE4F0] bg-white px-4 py-3 text-sm text-[#0F172A] shadow-xs focus:border-[#004DEB] focus:outline-none focus:ring-1 focus:ring-[#004DEB]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-2">
                                        Cover Note / Highlighted Projects
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Briefly tell us what you enjoy building and what technologies you are currently excited about..."
                                        className="w-full rounded-xl border border-[#DCE4F0] bg-white px-4 py-3 text-sm text-[#0F172A] shadow-xs focus:border-[#004DEB] focus:outline-none focus:ring-1 focus:ring-[#004DEB]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#004DEB] py-3.5 px-6 text-sm font-bold text-white shadow-md transition hover:bg-[#0038B8]"
                                >
                                    <Send className="h-4 w-4" />
                                    Submit Application
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <SiteFooter />
        </div>
    );
}
