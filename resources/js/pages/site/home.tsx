import { Head } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';

export default function Home({ homePage }: { homePage: { title: string } }) {
    return (
        <>
            <Head title={homePage.title} />
            <SiteNavbar />

            <main className="mx-auto max-w-3xl p-6">
                <h1 className="text-4xl font-bold">{homePage.title}</h1>
            </main>
        </>
    );
}
