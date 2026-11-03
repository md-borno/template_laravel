import { useState } from 'react';
import { Link } from '@inertiajs/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Seo from '@/components/seo';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';
import { resolveImageUrl } from '@/lib/image-url';
import {
    ArrowLeft,
    Calendar,
    Check,
    Clock,
    Copy,
    Share2,
    Sparkles,
} from 'lucide-react';

interface Post {
    id: number;
    title: string;
    body: string;
    image: string | null;
    created_at?: string;
}

interface BlogDetailProps {
    post: Post;
    relatedPosts?: Post[];
}

export default function BlogDetail({ post, relatedPosts = [] }: BlogDetailProps) {
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleCopy = async () => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(window.location.href);
            } else {
                const input = document.createElement('input');
                input.value = window.location.href;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.title,
                    url: window.location.href,
                });
            } catch {
                // User cancelled or share failed, fallback to copy
                handleCopy();
            }
        } else {
            handleCopy();
        }
    };

    // Calculate approximate read time
    const words = post.body ? post.body.trim().split(/\s+/).length : 100;
    const readMinutes = Math.max(1, Math.round(words / 200));

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between">
            <Seo
                title={`${post.title} | CODLEXA Blog`}
                description={post.body ? post.body.slice(0, 155) : 'Read insights on software engineering and technology from CODLEXA.'}
                canonical={shareUrl}
                ogImage={post.image ? resolveImageUrl(post.image) : '/og-image.png'}
                ogType="article"
            />

            <SiteNavbar />

            <main className="mx-auto mt-28 w-full max-w-4xl flex-1 px-6 py-8">
                {/* Back Link */}
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#004DEB] transition-colors hover:text-[#0038B8]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to all articles
                    </Link>
                </div>

                {/* Article Header */}
                <header className="mb-10 text-left">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-[#E0FAFF] px-3.5 py-1 text-xs font-bold text-[#009FCE] border border-[#00D0F4]/40">
                            Article #{post.id}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{readMinutes} min read</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>CODLEXA Insights</span>
                        </div>
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl leading-tight">
                        {post.title}
                    </h1>

                    {/* Author & Share Bar */}
                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-[#DCE4F0]">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF2FF] font-bold text-sm text-[#004DEB] border border-[#004DEB]/20">
                                CX
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#0F172A]">CODLEXA Engineering</p>
                                <p className="text-xs text-[#64748B]">Software Architecture & Design</p>
                            </div>
                        </div>

                        {/* Interactive Share Action Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleNativeShare}
                                className="inline-flex items-center gap-2 rounded-full border border-[#DCE4F0] bg-white px-4 py-2 text-xs font-bold text-[#0F172A] shadow-xs transition-all hover:border-[#00D0F4] hover:bg-[#E0FAFF] hover:text-[#009FCE]"
                            >
                                <Share2 className="h-3.5 w-3.5" />
                                Share
                            </button>

                            <button
                                type="button"
                                onClick={handleCopy}
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold shadow-xs transition-all ${
                                    copied
                                        ? 'bg-[#059669] text-white'
                                        : 'bg-[#004DEB] text-white hover:bg-[#0038B8]'
                                }`}
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-3.5 w-3.5" />
                                        Link Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3.5 w-3.5" />
                                        Copy Link
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {post.image && (
                    <div className="mb-12 overflow-hidden rounded-3xl border border-[#DCE4F0] bg-white shadow-md">
                        <img
                            src={resolveImageUrl(post.image)}
                            alt={post.title}
                            referrerPolicy="no-referrer"
                            className="w-full max-h-[500px] object-cover"
                        />
                    </div>
                )}

                <article className="mb-16">
                    <div className="break-words text-base text-[#334155] [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-[#00D0F4] [&_blockquote]:pl-4 [&_blockquote]:italic [&_h1]:mb-5 [&_h1]:mt-10 [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-[#0F172A] [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#0F172A] [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#0F172A] [&_li]:my-1 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-6 [&_p]:leading-8 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-slate-900 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-white [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                a: ({ href, children }) => {
                                    const external = href?.startsWith('http');

                                    return (
                                        <a
                                            href={href}
                                            target={external ? '_blank' : undefined}
                                            rel={external ? 'noopener noreferrer' : undefined}
                                            className="font-semibold text-[#004DEB] underline decoration-[#00D0F4] underline-offset-4 hover:text-[#0038B8]"
                                        >
                                            {children}
                                        </a>
                                    );
                                },
                            }}
                        >
                            {post.body}
                        </ReactMarkdown>
                    </div>
                </article>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <section className="mb-16">
                        <h3 className="text-2xl font-bold tracking-tight text-[#0F172A] mb-6">
                            Related Articles
                        </h3>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                            {relatedPosts.map((r) => (
                                <Link
                                    key={r.id}
                                    href={`/blog/${r.id}`}
                                    className="group flex flex-col justify-between rounded-2xl border border-[#DCE4F0] bg-white p-6 shadow-xs transition-all hover:border-[#00D0F4] hover:shadow-md hover:-translate-y-1"
                                >
                                    <div>
                                        <h4 className="font-bold text-[#0F172A] group-hover:text-[#004DEB] transition-colors line-clamp-2">
                                            {r.title}
                                        </h4>
                                        <p className="mt-2 text-xs text-[#64748B] line-clamp-3 leading-relaxed">
                                            {r.body}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-[#DCE4F0] text-xs font-bold text-[#004DEB]">
                                        Read Story →
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <SiteFooter />
        </div>
    );
}
