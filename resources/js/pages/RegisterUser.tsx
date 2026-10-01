import { Head, useForm } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
}

export default function RegisterUser({ users }: { users: User[] }) {
    const { data, setData, post, reset, processing, errors, recentlySuccessful } = useForm({
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
                <h2 className="mt-10 text-xl font-semibold">All Users</h2>

                <div className="mt-4 max-w-xl space-y-2">
                    {users.map((u) => (
                        <div key={u.id} className="rounded-md border p-3">
                            <div>{u.name}</div>
                            <div className="text-sm text-gray-500">{u.email}</div>
                        </div>
                    ))}
                </div>
                <h1 className="text-2xl font-semibold">Add User</h1>

                <form onSubmit={submit} className="mt-6 max-w-xl">
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}

                    <label className="block mt-4 mb-2">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}

                    <label className="block mt-4 mb-2">Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}

                    <label className="block mt-4 mb-2">Confirm Password</label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                    />

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-4 rounded-md bg-black px-4 py-2 text-white"
                    >
                        {processing ? 'Saving...' : 'Create User'}
                    </button>

                    {recentlySuccessful && (
                        <p className="mt-3 text-sm text-green-600">User created.</p>
                    )}
                </form>


            </div>
        </>
    );
}
