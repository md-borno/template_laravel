import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { resolveImageUrl } from '@/lib/image-url';

interface Post {
    id: number;
    title: string;
    body: string;
    image: string | null;
}

export default function BlogPage({ posts }: { posts: Post[] }) {
    const [editId, setEditId] = useState<number | null>(null);
const [existingImage, setExistingImage] = useState<string | null>(null);
const [preview, setPreview] = useState<string | null>(null);

const { data, setData, post, reset, processing, errors } = useForm<{
    title: string;
    body: string;
    image: File | null;
}>({
    title: '',
    body: '',
    image: null,
});

const clear = () => {
    reset();
    setEditId(null);
    setExistingImage(null);
    setPreview(null);
};

const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = editId ? `/dashboard/blog/${editId}` : '/dashboard/blog';
    post(url, { forceFormData: true, onSuccess: clear });
};

const edit = (p: Post) => {
    setEditId(p.id);
    setExistingImage(p.image);
    setPreview(null);
    setData({ title: p.title, body: p.body, image: null });
};

const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setData('image', file);
    setPreview(file ? URL.createObjectURL(file) : null);
};

    return (
        <>
            <Head title="Blog" />

            <div className="p-6">
                <h1 className="text-2xl font-bold text-[#0F172A]">Blog Settings</h1>

                <form onSubmit={submit} className="mt-6 max-w-xl">
                    <label className="mb-2 block text-sm font-semibold text-[#0F172A]">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full rounded-xl border border-[#DCE4F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#004DEB] focus:outline-none focus:ring-2 focus:ring-[#004DEB]/20"
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm font-medium text-[#DC2626]">{errors.title}</p>
                    )}

                    <label className="mt-4 mb-2 block text-sm font-semibold text-[#0F172A]">Body</label>
                    <textarea
                        rows={6}
                        value={data.body}
                        onChange={(e) => setData('body', e.target.value)}
                        className="w-full rounded-xl border border-[#DCE4F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#004DEB] focus:outline-none focus:ring-2 focus:ring-[#004DEB]/20"
                    />
                    {errors.body && (
                        <p className="mt-1 text-sm font-medium text-[#DC2626]">{errors.body}</p>
                    )}

                    <label className="mt-4 mb-2 block text-sm font-semibold text-[#0F172A]">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onFile}
                        className="w-full rounded-xl border border-[#DCE4F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A]"
                    />
                    {(preview || existingImage) && (
                        <img
                            src={preview ?? resolveImageUrl(existingImage!)}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="mt-2 h-24 rounded-lg object-cover border border-[#DCE4F0]"
                        />
                    )}
                    {errors.image && (
                        <p className="mt-1 text-sm font-medium text-[#DC2626]">{errors.image}</p>
                    )}

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-[#004DEB] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0038B8] disabled:bg-[#E2E8F0] disabled:text-[#94A3B8]"
                        >
                            {processing ? 'Saving...' : editId ? 'Update Post' : 'Add Post'}
                        </button>

                        {editId && (
                            <button
                                type="button"
                                onClick={clear}
                                className="ml-3 rounded-xl border border-[#DCE4F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#64748B] hover:bg-[#F8FAFC]"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                <div className="mt-8 max-w-xl space-y-2">
                    {posts.map((p) => (
                        <div
                            key={p.id}
                            className="flex items-center justify-between rounded-xl border border-[#DCE4F0] bg-white p-3.5 shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                {p.image && (
                                    <img
                                        src={resolveImageUrl(p.image)}
                                        alt=""
                                        referrerPolicy="no-referrer"
                                        className="h-10 w-10 rounded-lg object-cover"
                                    />
                                )}
                                <span className="font-medium text-[#0F172A]">{p.title}</span>
                            </div>
                            <div className="space-x-3 text-sm font-semibold">
                                <button onClick={() => edit(p)} className="text-[#004DEB] hover:underline">Edit</button>
                                <button
                                    onClick={() =>
                                        confirm('Delete this post?') &&
                                        router.delete(`/dashboard/blog/${p.id}`)
                                    }
                                    className="text-[#DC2626] hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}