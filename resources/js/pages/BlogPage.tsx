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

    const { data, setData, post, reset, processing, errors } = useForm({
        title: '',
        body: '',
        image: '',
    });

    const clear = () => {
        reset();
        setEditId(null);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = editId ? `/dashboard/blog/${editId}` : '/dashboard/blog';
        post(url, { onSuccess: clear });
    };

    const edit = (p: Post) => {
        setEditId(p.id);
        setData({ title: p.title, body: p.body, image: p.image ?? '' });
    };

    return (
        <>
            <Head title="Blog" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">Blog Settings</h1>

                <form onSubmit={submit} className="mt-6 max-w-xl">
                    <label className="mb-2 block">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                    )}

                    <label className="mt-4 mb-2 block">Body</label>
                    <textarea
                        rows={6}
                        value={data.body}
                        onChange={(e) => setData('body', e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                    />
                    {errors.body && (
                        <p className="mt-1 text-sm text-red-500">{errors.body}</p>
                    )}

                    <label className="mt-4 mb-2 block">
                        Image link (Google Drive, public)
                    </label>
                    <input
                        type="url"
                        placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                        value={data.image}
                        onChange={(e) => setData('image', e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                    />
                    {data.image && (
                        <img
                            src={resolveImageUrl(data.image)}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="mt-2 h-24 rounded-md"
                        />
                    )}
                    {errors.image && (
                        <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-4 rounded-md bg-black px-4 py-2 text-white"
                        >
                            {processing ? 'Saving...' : editId ? 'Update Post' : 'Add Post'}
                        </button>

                        {editId && (
                            <button
                                type="button"
                                onClick={clear}
                                className="mt-4 ml-2 rounded-md border px-4 py-2"
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
                            className="flex items-center justify-between rounded-md border p-3"
                        >
                            <div className="flex items-center gap-3">
                                {p.image && (
                                    <img
                                        src={resolveImageUrl(p.image)}
                                        alt=""
                                        referrerPolicy="no-referrer"
                                        className="h-10 w-10 rounded object-cover"
                                    />
                                )}
                                <span>{p.title}</span>
                            </div>
                            <div className="space-x-3">
                                <button onClick={() => edit(p)}>Edit</button>
                                <button
                                    onClick={() =>
                                        confirm('Delete this post?') &&
                                        router.delete(`/dashboard/blog/${p.id}`)
                                    }
                                    className="text-red-500"
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