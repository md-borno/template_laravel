import { Head } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';

export default function Portfolio() {
    return (
        <>
            <Head title="Portfolio" />
            <SiteNavbar />
            <main className="mx-auto mt-20 max-w-2xl p-6">
                <h1 className="mb-6 text-3xl font-bold">Portfolio</h1>
            </main>
            <SiteFooter />
        </>
    );
}