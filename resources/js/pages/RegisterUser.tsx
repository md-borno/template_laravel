import { Head, useForm } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
}

export default function RegisterUser({ users }: { users: User[] }) {
    const {
        data,
        setData,
        post,
        reset,
        processing,
        errors,
        recentlySuccessful,
    } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/register', {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Add User" />

            <div className="p-6">
                <h2 className="mt-10 text-xl font-bold text-[#0F172A]">All Users</h2>

                <div className="mt-4 max-w-xl space-y-2">
                    {users.map((u) => (
                        <div key={u.id} className="rounded-xl border border-[#DCE4F0] bg-white p-3.5 shadow-sm">
                            <div className="font-semibold text-[#0F172A]">{u.name}</div>
                            <div className="text-sm text-[#64748B]">
                                {u.email}
                            </div>
                        </div>
                    ))}
                </div>
                <h1 className="mt-12 text-2xl font-bold text-[#0F172A]">Add User</h1>

                <form onSubmit={submit} className="mt-6 max-w-xl">
                    <label className="mb-2 block text-sm font-semibold text-[#0F172A]">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full rounded-xl border border-[#DCE4F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#004DEB] focus:outline-none focus:ring-2 focus:ring-[#004DEB]/20"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm font-medium text-[#DC2626]">
                            {errors.name}
                        </p>
                    )}

                    <label className="mt-4 mb-2 block text-sm font-semibold text-[#0F172A]">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-xl border border-[#DCE4F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#004DEB] focus:outline-none focus:ring-2 focus:ring-[#004DEB]/20"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm font-medium text-[#DC2626]">
                            {errors.email}
                        </p>
                    )}

                    <label className="mt-4 mb-2 block text-sm font-semibold text-[#0F172A]">Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full rounded-xl border border-[#DCE4F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#004DEB] focus:outline-none focus:ring-2 focus:ring-[#004DEB]/20"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm font-medium text-[#DC2626]">
                            {errors.password}
                        </p>
                    )}

                    <label className="mt-4 mb-2 block text-sm font-semibold text-[#0F172A]">Confirm Password</label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        className="w-full rounded-xl border border-[#DCE4F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#004DEB] focus:outline-none focus:ring-2 focus:ring-[#004DEB]/20"
                    />

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-6 rounded-xl bg-[#004DEB] px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0038B8] disabled:bg-[#E2E8F0] disabled:text-[#94A3B8]"
                    >
                        {processing ? 'Saving...' : 'Create User'}
                    </button>

                    {recentlySuccessful && (
                        <p className="mt-3 text-sm font-semibold text-[#059669]">
                            User created successfully.
                        </p>
                    )}
                </form>
            </div>
        </>
    );
}
