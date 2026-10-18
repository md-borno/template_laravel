import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

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
        title: 'Laravel Developer',
        department: 'Engineering',
        location: 'Dhaka, Bangladesh',
        type: 'Full-time',
        experience: '1–3 years',
        description:
            'Build reliable web applications, develop REST APIs, and work with our engineering team to deliver quality software.',
        skills: ['Laravel', 'PHP', 'MySQL', 'REST API'],
    },
    {
        id: 2,
        title: 'Frontend Developer',
        department: 'Engineering',
        location: 'Dhaka, Bangladesh',
        type: 'Full-time',
        experience: '1–3 years',
        description:
            'Create responsive, accessible user interfaces using modern frontend tools and collaborate closely with designers.',
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Inertia.js'],
    },
    {
        id: 3,
        title: 'UI/UX Designer',
        department: 'Design',
        location: 'Dhaka, Bangladesh',
        type: 'Full-time',
        experience: '1–2 years',
        description:
            'Design intuitive digital experiences, create prototypes, and help turn complex requirements into simple interfaces.',
        skills: ['Figma', 'Wireframing', 'Prototyping', 'UI Design'],
    },
];

export default function SiteCareer() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [submitted, setSubmitted] = useState(false);

    return (
        <>
            <Head title="Careers | CODLEXA" />

            <main className="min-h-screen bg-white text-slate-900">
                {/* Hero */}
                <section className="relative isolate overflow-hidden bg-[#0F172A] px-6 py-24 text-white sm:py-32">
                    <div className="absolute -right-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#004DEB]/30 blur-3xl" />
                    <div className="absolute -bottom-32 left-1/4 -z-10 h-80 w-80 rounded-full bg-[#00D0F4]/20 blur-3xl" />

                    <div className="mx-auto max-w-7xl">
                        <Link
                            href="/"
                            className="text-sm font-semibold text-[#00D0F4] hover:text-white"
                        >
                            ← Back to home
                        </Link>

                        <div className="mt-12 max-w-3xl">
                            <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[#00D0F4]">
                                Careers at CODLEXA
                            </p>

                            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                                Build the future.
                                <span className="block text-[#00D0F4]">
                                    Grow with us.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                                We believe great people build great technology.
                                Join our team, solve meaningful problems, and
                                make an impact through code, logic, excellence,
                                and AI.
                            </p>

                            <a
                                href="#open-positions"
                                className="mt-9 inline-flex items-center rounded-xl bg-[#004DEB] px-7 py-4 font-bold text-white transition hover:bg-blue-600"
                            >
                                Explore open positions
                                <span className="ml-3">↓</span>
                            </a>
                        </div>

                        <div className="mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
                            {[
                                ['Innovation', 'Build meaningful solutions'],
                                ['Collaboration', 'Achieve more together'],
                                ['Growth', 'Learn something every day'],
                            ].map(([title, description]) => (
                                <div
                                    key={title}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                                >
                                    <h2 className="font-bold text-white">
                                        {title}
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-slate-300">
                                        {description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Jobs */}
                <section
                    id="open-positions"
                    className="px-6 py-20 sm:py-24"
                >
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#004DEB]">
                                    Find your opportunity
                                </p>
                                <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                                    Open positions
                                </h2>
                                <p className="mt-4 max-w-xl leading-7 text-slate-600">
                                    Find a role that matches your skills and
                                    help us create something exceptional.
                                </p>
                            </div>

                            <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-[#004DEB]">
                                {jobs.length} sample openings
                            </span>
                        </div>

                        <div className="mt-10 grid gap-6 lg:grid-cols-2">
                            {jobs.map((job) => (
                                <article
                                    key={job.id}
                                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#004DEB]/40 hover:shadow-xl sm:p-8"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <span className="text-sm font-semibold text-[#004DEB]">
                                                {job.department}
                                            </span>
                                            <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                                                {job.title}
                                            </h3>
                                        </div>

                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-[#004DEB]">
                                            ↗
                                        </div>
                                    </div>

                                    <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600">
                                        {[job.location, job.type, job.experience].map(
                                            (item) => (
                                                <span
                                                    key={item}
                                                    className="rounded-full bg-slate-100 px-3 py-1.5"
                                                >
                                                    {item}
                                                </span>
                                            ),
                                        )}
                                    </div>

                                    <p className="mt-5 leading-7 text-slate-600">
                                        {job.description}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {job.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedJob(job);
                                            setSubmitted(false);
                                            document
                                                .getElementById('application-form')
                                                ?.scrollIntoView({
                                                    behavior: 'smooth',
                                                });
                                        }}
                                        className="mt-7 inline-flex items-center gap-2 font-bold text-[#004DEB] transition hover:gap-3"
                                    >
                                        Apply for this position <span>→</span>
                                    </button>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Application form */}
                <section
                    id="application-form"
                    className="bg-slate-50 px-6 py-20 sm:py-24"
                >
                    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#004DEB]">
                                Take the next step
                            </p>
                            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                                Your next chapter starts here.
                            </h2>
                            <p className="mt-5 leading-8 text-slate-600">
                                Tell us about yourself, share your experience,
                                and upload your CV. Our hiring team can review
                                your application and get in touch.
                            </p>

                            <div className="mt-8 space-y-5">
                                {[
                                    'A team that values ideas and initiative',
                                    'Opportunities to learn and develop',
                                    'Work on practical, real-world technology',
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-[#004DEB]">
                                            ✓
                                        </span>
                                        <p className="text-slate-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
                            {submitted ? (
                                <div className="py-12 text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
                                        ✓
                                    </div>
                                    <h3 className="mt-5 text-2xl font-bold">
                                        Thank you for your interest!
                                    </h3>
                                    <p className="mt-3 text-slate-600">
                                        This is a demo form. Connect it to your
                                        Laravel backend to submit and store
                                        applications.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setSubmitted(false)}
                                        className="mt-6 font-semibold text-[#004DEB]"
                                    >
                                        Submit another application
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold">
                                        Apply now
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Fields marked * are required.
                                    </p>

                                    <form
                                        className="mt-7 space-y-5"
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            setSubmitted(true);
                                        }}
                                    >
                                        <div>
                                            <label
                                                htmlFor="job"
                                                className="mb-2 block text-sm font-semibold"
                                            >
                                                Position *
                                            </label>
                                            <select
                                                id="job"
                                                required
                                                value={selectedJob?.title ?? ''}
                                                onChange={(event) =>
                                                    setSelectedJob(
                                                        jobs.find(
                                                            (job) =>
                                                                job.title ===
                                                                event.target.value,
                                                        ) ?? null,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#004DEB] focus:ring-2 focus:ring-blue-100"
                                            >
                                                <option value="" disabled>
                                                    Select a position
                                                </option>
                                                {jobs.map((job) => (
                                                    <option
                                                        key={job.id}
                                                        value={job.title}
                                                    >
                                                        {job.title}
                                                    </option>
                                                ))}
                                                <option value="General Application">
                                                    General Application
                                                </option>
                                            </select>
                                        </div>

                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="fullName"
                                                    className="mb-2 block text-sm font-semibold"
                                                >
                                                    Full name *
                                                </label>
                                                <input
                                                    id="fullName"
                                                    name="fullName"
                                                    required
                                                    autoComplete="name"
                                                    placeholder="Your full name"
                                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#004DEB] focus:ring-2 focus:ring-blue-100"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="mb-2 block text-sm font-semibold"
                                                >
                                                    Email address *
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    autoComplete="email"
                                                    placeholder="you@example.com"
                                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#004DEB] focus:ring-2 focus:ring-blue-100"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="phone"
                                                className="mb-2 block text-sm font-semibold"
                                            >
                                                Phone number *
                                            </label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                required
                                                autoComplete="tel"
                                                placeholder="+880 1XXXXXXXXX"
                                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#004DEB] focus:ring-2 focus:ring-blue-100"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="experience"
                                                className="mb-2 block text-sm font-semibold"
                                            >
                                                Years of experience
                                            </label>
                                            <select
                                                id="experience"
                                                name="experience"
                                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#004DEB] focus:ring-2 focus:ring-blue-100"
                                            >
                                                <option value="">
                                                    Select experience
                                                </option>
                                                <option>Fresher</option>
                                                <option>Less than 1 year</option>
                                                <option>1–3 years</option>
                                                <option>3–5 years</option>
                                                <option>5+ years</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="resume"
                                                className="mb-2 block text-sm font-semibold"
                                            >
                                                Upload CV / Resume *
                                            </label>
                                            <input
                                                id="resume"
                                                name="resume"
                                                type="file"
                                                required
                                                accept=".pdf,.doc,.docx"
                                                className="w-full rounded-xl border border-dashed border-slate-300 p-4 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-[#004DEB]"
                                            />
                                            <p className="mt-2 text-xs text-slate-500">
                                                PDF, DOC or DOCX. Maximum file
                                                size should be configured on
                                                the server.
                                            </p>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="coverLetter"
                                                className="mb-2 block text-sm font-semibold"
                                            >
                                                Why would you be a good fit?
                                            </label>
                                            <textarea
                                                id="coverLetter"
                                                name="coverLetter"
                                                rows={4}
                                                placeholder="Tell us a little about yourself..."
                                                className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#004DEB] focus:ring-2 focus:ring-blue-100"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full rounded-xl bg-[#004DEB] px-6 py-4 font-bold text-white transition hover:bg-blue-700"
                                        >
                                            Submit application →
                                        </button>

                                        <p className="text-center text-xs leading-5 text-slate-500">
                                            By applying, you agree to our{' '}
                                            <Link
                                                href="/privacy"
                                                className="text-[#004DEB] underline"
                                            >
                                                privacy policy
                                            </Link>
                                            .
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="px-6 py-16">
                    <div className="mx-auto max-w-7xl rounded-3xl bg-[#0F172A] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
                        <h2 className="text-3xl font-extrabold sm:text-4xl">
                            Don't see your role?
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
                            We are always interested in meeting talented
                            people. Submit a general application and introduce
                            yourself to our team.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedJob(null);
                                const select = document.getElementById(
                                    'job',
                                ) as HTMLSelectElement | null;
                                if (select) {
                                    select.value = 'General Application';
                                }
                                document
                                    .getElementById('application-form')
                                    ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="mt-7 rounded-xl bg-[#00D0F4] px-7 py-3.5 font-bold text-[#0F172A] transition hover:bg-cyan-300"
                        >
                            Introduce yourself →
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}
