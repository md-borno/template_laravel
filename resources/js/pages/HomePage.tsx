import { Head, useForm } from '@inertiajs/react';

interface Props {
    homePage: {
        title: string;
    };
}

export default function HomePage({ homePage }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: homePage.title,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        put('/dashboard/home-page/title');
    };

    return (
        <>
            <Head title="Home Page" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Home Page Settings
                </h1>

                <form onSubmit={submit} className="mt-6 max-w-xl">
                    <label className="block mb-2">
                        Home Page Title
                    </label>

                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) =>
                            setData('title', e.target.value)
                        }
                        className="w-full rounded-md border px-3 py-2"
                    />

                    {errors.title && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.title}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-4 rounded-md bg-black px-4 py-2 text-white"
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </div>
        </>
    );
}
