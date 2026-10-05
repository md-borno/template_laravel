import { Head } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';
import SiteBanner from '@/components/site-banner';
import SiteCard from '@/components/site-card';

export default function Home({ homePage }: { homePage: { title: string } }) {
    const fakeItems = [
        {
            title: 'Modern Digital Solutions',
            description:
                'Build powerful digital experiences with modern technologies and clean design.',
        },
        {
            title: 'Fast & Reliable',
            description:
                'Create applications that are fast, reliable, scalable, and easy to maintain.',
        },
        {
            title: 'Simple Development',
            description:
                'Keep your development workflow simple with clean architecture and reusable components.',
        },
        {
            title: 'Business Growth',
            description:
                'Use technology to improve your business processes and create better customer experiences.',
        },
        {
            title: 'Secure Systems',
            description:
                'Design secure applications with modern authentication, authorization, and data protection.',
        },
        {
            title: 'Future Ready',
            description:
                'Build flexible solutions that can grow with your business and adapt to future needs.',
        },
    ];

    return (
        <>
            <SiteNavbar />
            <SiteBanner />
            <SiteCard />

            <main className="mx-auto max-w-6xl px-6 pt-32 pb-20">
                {/* Hero */}
                <section className="flex min-h-[70vh] flex-col justify-center">
                    <span className="mb-4 text-sm font-semibold tracking-widest text-gray-500 uppercase">
                        Welcome
                    </span>

                    <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
                        {homePage.title}
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                        We create simple, modern, and reliable digital solutions
                        that help businesses grow and work smarter.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <button className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white">
                            Get Started
                        </button>

                        <button className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium">
                            Learn More
                        </button>
                    </div>
                </section>

                {/* About */}
                <section className="min-h-[70vh] py-24">
                    <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                        About Us
                    </p>

                    <h2 className="mt-4 max-w-3xl text-4xl font-bold md:text-5xl">
                        Technology that makes your work easier.
                    </h2>

                    <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-600">
                        Our goal is to create useful software and digital
                        experiences that solve real-world problems. From
                        websites to business applications, we focus on
                        simplicity, performance, and usability.
                    </p>
                </section>

                {/* Features */}
                <section className="py-24">
                    <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                        What We Do
                    </p>

                    <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                        Our Services
                    </h2>

                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {fakeItems.map((item, index) => (
                            <div
                                key={index}
                                className="min-h-64 rounded-3xl border border-gray-200 p-8 transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                <h3 className="mt-8 text-xl font-semibold">
                                    {item.title}
                                </h3>

                                <p className="mt-4 leading-7 text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Large fake section */}
                <section className="min-h-[80vh] py-24">
                    <div className="rounded-[2rem] bg-gray-100 p-10 md:p-20">
                        <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                            Our Approach
                        </p>

                        <h2 className="mt-5 max-w-3xl text-4xl font-bold md:text-6xl">
                            Simple ideas. Powerful results.
                        </h2>

                        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
                            We believe great products do not need to be
                            complicated. Every feature should have a purpose and
                            every interaction should feel natural.
                        </p>

                        <div className="mt-12 grid gap-6 md:grid-cols-3">
                            <div>
                                <p className="text-4xl font-bold">01</p>
                                <p className="mt-3 text-gray-600">
                                    Understand the problem
                                </p>
                            </div>

                            <div>
                                <p className="text-4xl font-bold">02</p>
                                <p className="mt-3 text-gray-600">
                                    Build the solution
                                </p>
                            </div>

                            <div>
                                <p className="text-4xl font-bold">03</p>
                                <p className="mt-3 text-gray-600">
                                    Improve continuously
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="flex min-h-[60vh] items-center justify-center py-24 text-center">
                    <div>
                        <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                            Let's Work Together
                        </p>

                        <h2 className="mt-5 text-5xl font-bold md:text-7xl">
                            Ready to build something?
                        </h2>

                        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
                            Start with a simple idea and turn it into something
                            useful, beautiful, and powerful.
                        </p>

                        <button className="mt-8 rounded-full bg-black px-8 py-4 font-medium text-white">
                            Contact Us
                        </button>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
