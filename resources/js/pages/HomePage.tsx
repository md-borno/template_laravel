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
                <h1 className="text-2xl font-bold text-[#0F172A]">Home Page Settings</h1>

                <form onSubmit={submit} className="mt-6 max-w-xl">
                    <label className="mb-2 block text-sm font-semibold text-[#0F172A]">Home Page Title</label>

                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full rounded-xl border border-[#DCE4F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#004DEB] focus:outline-none focus:ring-2 focus:ring-[#004DEB]/20"
                    />

                    {errors.title && (
                        <p className="mt-1 text-sm font-medium text-[#DC2626]">
                            {errors.title}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-5 rounded-xl bg-[#004DEB] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0038B8] disabled:bg-[#E2E8F0] disabled:text-[#94A3B8]"
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </div>
        </>
    );
}
