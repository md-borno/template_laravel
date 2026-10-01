import { Link } from '@inertiajs/react';

export default function SiteNavbar() {
    return (
        <nav className="flex items-center justify-between border-b px-6 py-4">
            <Link href="/" className="text-lg font-bold">
                My Company
            </Link>

            <div className="space-x-6">
                <Link href="/">Home</Link>
                <Link href="/blog">Blog</Link>
            </div>
        </nav>
    );
}
