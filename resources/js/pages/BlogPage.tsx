import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Post {
    id: number;
    title: string;
    body: string;
}

export default function BlogPage({ posts }: { posts: Post[] }) {
    const [editId, setEditId] = useState<number | null>(null);
    const { data, setData, post, put, reset, processing, errors } = useForm({
        title: '',
        body: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                reset();
                setEditId(null);
            },
        };
        if (editId) put(`/dashboard/blog/${editId}`, options);
        else post('/dashboard/blog', options);
    };

    const edit = (p: Post) => {
        setEditId(p.id);
        setData({ title: p.title, body: p.body });
    };

    return (
        <>
            <Head title="Blog" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">Blog Settings</h1>

                <form onSubmit={submit} className="mt-6 max-w-xl">
                    <label className="block mb-2">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}

                    <label className="block mt-4 mb-2">Body</label>
                    <textarea
                        rows={6}
                        value={data.body}
                        onChange={(e) => setData('body', e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                    />
                    {errors.body && <p className="mt-1 text-sm text-red-500">{errors.body}</p>}

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-4 rounded-md bg-black px-4 py-2 text-white"
                    >
                        {editId ? 'Update Post' : 'Add Post'}
                    </button>

                    {editId && (
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                setEditId(null);
                            }}
                            className="mt-4 ml-2 rounded-md border px-4 py-2"
                        >
                            Cancel
                        </button>
                    )}
                </form>

                <div className="mt-8 max-w-xl space-y-2">
                    {posts.map((p) => (
                        <div key={p.id} className="flex items-center justify-between rounded-md border p-3">
                            <span>{p.title}</span>
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
