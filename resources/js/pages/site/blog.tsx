import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';
import { resolveImageUrl } from '@/lib/image-url';

interface Post {
    id: number;
    title: string;
    body: string;
    image: string | null;
}

export default function Blog({ posts }: { posts: Post[] }) {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [copied, setCopied] = useState(false);

    const featuredPost = posts.length > 0 ? posts[0] : null;
    const sidebarPosts = posts.length > 1 ? posts.slice(1) : [];

    const handleShare = (postId: number) => {
        // Construct a dummy URL based on the current origin and post ID
        const url = `${window.location.origin}/blog/${postId}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
            <Head title="Blog" />
            <SiteNavbar />

            <main className="mx-auto mt-24 w-full max-w-7xl flex-1 px-6 py-12 font-sans">
                <div className="mb-12 text-left">
                    <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl">
                        Our Latest Articles
                    </h1>
                </div>

                {posts.length === 0 ? (
                    <div className="rounded-2xl border border-[#DCE4F0] bg-white p-12 text-center text-[#64748B]">
                        No blog posts published yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                        
                        {/* Left Column: Featured Post */}
                        {featuredPost && (
                            <div className="lg:col-span-7 xl:col-span-8">
                                <article className="group relative rounded-3xl border border-[#DCE4F0] bg-white p-6 shadow-xs transition-all duration-300 hover:border-[#00D0F4] hover:shadow-xl">
                                    <Link href={`/blog/${featuredPost.id}`} className="block">
                                        <div className="overflow-hidden rounded-2xl border border-[#DCE4F0] bg-white mb-6 aspect-[16/10] md:aspect-video relative">
                                            {featuredPost.image ? (
                                                <img
                                                    src={resolveImageUrl(featuredPost.image)}
                                                    alt={featuredPost.title}
                                                    referrerPolicy="no-referrer"
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-slate-200 flex items-center justify-center text-slate-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-4 group-hover:text-[#004DEB] transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        
                                        <p className="text-base text-[#64748B] leading-relaxed line-clamp-3 mb-6">
                                            {featuredPost.body}
                                        </p>
                                    </Link>

                                    <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-[#DCE4F0] text-sm text-[#64748B]">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-[#EAF2FF] text-[#004DEB] px-3 py-1 rounded-full font-bold text-xs">
                                                Featured
                                            </span>
                                            <Link
                                                href={`/blog/${featuredPost.id}`}
                                                className="text-xs font-bold text-[#004DEB] hover:text-[#0038B8]"
                                            >
                                                Read Article →
                                            </Link>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleShare(featuredPost.id)}
                                            className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE4F0] bg-[#F8FAFC] px-3.5 py-1.5 text-xs font-semibold text-[#0F172A] transition hover:border-[#00D0F4] hover:bg-[#E0FAFF] hover:text-[#009FCE]"
                                        >
                                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                            {copied ? "Link Copied!" : "Share Link"}
                                        </button>
                                    </div>
                                </article>
                            </div>
                        )}

                        {/* Right Column: Trending / Sidebar Posts */}
                        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
                            
                            <div className="relative overflow-hidden rounded-2xl bg-[#0F172A] p-8 min-h-[140px] flex items-center shadow-lg text-white">
                                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#004DEB]/25 blur-2xl"></div>
                                <h3 className="relative z-10 text-2xl font-extrabold tracking-tight text-white leading-tight">
                                    Trending Articles & Updates
                                </h3>
                            </div>

                            <div className="flex flex-col gap-4">
                                {sidebarPosts.map((p) => (
                                    <div
                                        key={p.id} 
                                        className="group rounded-2xl border border-[#DCE4F0] bg-white p-4 shadow-xs transition-all hover:border-[#00D0F4] hover:shadow-md"
                                    >
                                        <Link 
                                            href={`/blog/${p.id}`}
                                            className="flex gap-4"
                                        >
                                            <div className="h-20 w-24 md:h-24 md:w-32 flex-shrink-0 overflow-hidden rounded-xl border border-[#DCE4F0] bg-slate-100">
                                                {p.image ? (
                                                    <img
                                                        src={resolveImageUrl(p.image)}
                                                        alt={p.title}
                                                        referrerPolicy="no-referrer"
                                                        loading="lazy"
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">No Image</div>
                                                )}
                                            </div>
                                            
                                            <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
                                                <h4 className="font-bold text-[#0F172A] leading-snug line-clamp-2 group-hover:text-[#004DEB] transition-colors text-sm sm:text-base">
                                                    {p.title}
                                                </h4>
                                                
                                                <div className="mt-2 flex items-center justify-between text-xs text-[#64748B]">
                                                    <span className="font-semibold text-[#004DEB]">Read article →</span>
                                                </div>
                                            </div>
                                        </Link>

                                        <div className="mt-3 pt-2 border-t border-[#DCE4F0] flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => handleShare(p.id)}
                                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#64748B] hover:text-[#004DEB]"
                                            >
                                                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                                {copied ? "Copied!" : "Share Link"}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <SiteFooter />

            {/* Modal Overlay for Full Post */}
            {selectedPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm sm:p-6">
                    <div 
                        className="relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Modal Header Actions */}
                        <div className="absolute right-4 top-4 z-10 flex gap-2">
                            <button
                                onClick={() => handleShare(selectedPost.id)}
                                className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:bg-slate-50 hover:text-blue-600"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                {copied ? "Copied!" : "Share Link"}
                            </button>
                            
                            <button
                                onClick={() => {
                                    setSelectedPost(null);
                                    setCopied(false);
                                }}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm backdrop-blur transition hover:bg-slate-50 hover:text-red-500"
                                aria-label="Close modal"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {/* Modal Scrollable Content */}
                        <div className="overflow-y-auto">
                            {selectedPost.image && (
                                <img
                                    src={resolveImageUrl(selectedPost.image)}
                                    alt={selectedPost.title}
                                    className="h-64 w-full object-cover sm:h-80 md:h-96"
                                />
                            )}
                            <div className="p-6 sm:p-10 text-left">
                                <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
                                    <span className="rounded bg-slate-100 px-2.5 py-0.5 font-medium text-slate-700">Article</span>
                                    <span>·</span>
                                    <span>Just now</span>
                                </div>
                                
                                <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
                                    {selectedPost.title}
                                </h2>
                                
                                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                                    {selectedPost.body}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}