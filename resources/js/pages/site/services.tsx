import { Head } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';

export default function Services() {
    return (
        <>
            <Head title="Services" />
            <SiteNavbar />
            <main className="mx-auto mt-20 max-w-2xl p-6">
                <h1 className="mb-6 text-3xl font-bold">Services</h1>
            </main>
            <SiteFooter />
        </>
    );
}