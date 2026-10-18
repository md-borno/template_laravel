import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';
import SiteBanner from '@/components/site-banner';
import SiteCard from '@/components/site-card';
import SiteCareer from '@/components/site-career';
import SiteMovingIcon from '@/components/site-movingicon';
import SiteGrowth from '@/components/site-growth';
import SiteFounded from '@/components/site-founded';
import SiteProcess from '@/components/site-process';
import FooterContent from '@/components/footer-content';

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
            <SiteGrowth/>
            <SiteCard />
            <div className="bg-[#F8FAFC] pt-16">
    <div className="mx-auto max-w-3xl text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            Our Technology Ecosystem
        </h2>
        <p className="mt-4 text-lg text-[#64748B]">
            Leveraging modern, industry-leading frameworks and tools to build scalable, high-performance solutions.
        </p>
    </div>
    
    {/* Your moving icons component goes here */}
    <SiteMovingIcon />
</div>
<SiteFounded/>
<SiteProcess/>
<FooterContent />
            <SiteFooter />
        </>
    );
}
