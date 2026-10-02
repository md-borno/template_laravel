import { Head } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';

interface Post {
    id: number;
    title: string;
    body: string;
    image: string | null;
}

export default function Blog({ posts }: { posts: Post[] }) {
    return (
        <>
            <Head title="Blog" />
            <SiteNavbar />

            <main className="mx-auto max-w-2xl p-6">
                <h1 className="mb-6 text-3xl font-bold">Blog</h1>

                {posts.map((p) => (
                    <article key={p.id} className="mb-8">
                        <h2 className="text-xl font-semibold">{p.title}</h2>
                        {p.image && (
                            <img
                                src={`/${p.image}`}
                                alt={p.title}
                                className="mt-3 w-full rounded-md"
                            />
                        )}
                        <p className="mt-2 whitespace-pre-line">{p.body}</p>
                    </article>
                ))}
            </main>
        </>
    );
}
