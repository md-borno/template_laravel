import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';

interface ContactMessage {
    id: number;
    full_name: string;
    email: string;
    phone: string | null;
    details: string;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    messages: {
        data: ContactMessage[];
        links: PaginationLink[];
        total: number;
        current_page: number;
        per_page: number;
    };
}

export default function ContactUsList({ messages }: Props) {
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <>
            <Head title="Contact Messages" />
            <SiteNavbar />

            <main className="mx-auto mt-16 max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Contact Form Submissions / SMS
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Total messages received: <span className="font-semibold text-gray-700">{messages.total}</span>
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-700">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Sender</th>
                                    <th className="px-6 py-4">Contact Info</th>
                                    <th className="px-6 py-4">Message</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {messages.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                                            No messages received yet.
                                        </td>
                                    </tr>
                                ) : (
                                    messages.data.map((msg) => (
                                        <tr key={msg.id} className="hover:bg-gray-50/75 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-gray-400">
                                                #{msg.id}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {msg.full_name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <a
                                                        href={`mailto:${msg.email}`}
                                                        className="text-blue-600 hover:underline block"
                                                    >
                                                        {msg.email}
                                                    </a>
                                                    {msg.phone ? (
                                                        <a
                                                            href={`tel:${msg.phone}`}
                                                            className="text-xs text-gray-500 hover:text-gray-700 block mt-0.5"
                                                        >
                                                            {msg.phone}
                                                        </a>
                                                    ) : (
                                                        <span className="text-xs text-gray-400">No phone</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 max-w-xs truncate text-gray-700">
                                                {msg.details}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                                                {formatDate(msg.created_at)}
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => setSelectedMessage(msg)}
                                                    className="rounded bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {messages.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                            <span className="text-xs text-gray-500">
                                Showing page {messages.current_page}
                            </span>
                            <div className="flex gap-1">
                                {messages.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : link.url
                                                ? 'text-gray-700 hover:bg-gray-100'
                                                : 'text-gray-300 pointer-events-none'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Message Detail Modal */}
                {selectedMessage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {selectedMessage.full_name}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        Received: {formatDate(selectedMessage.created_at)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="text-gray-400 hover:text-gray-600 text-lg font-semibold"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="mt-4 space-y-3 text-sm">
                                <div>
                                    <span className="font-semibold text-gray-700">Email:</span>{' '}
                                    <a
                                        href={`mailto:${selectedMessage.email}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {selectedMessage.email}
                                    </a>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Phone:</span>{' '}
                                    {selectedMessage.phone ? (
                                        <a
                                            href={`tel:${selectedMessage.phone}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {selectedMessage.phone}
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">Not provided</span>
                                    )}
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700 block mb-1">
                                        Message:
                                    </span>
                                    <div className="rounded-lg bg-gray-50 p-3 text-gray-800 whitespace-pre-wrap border border-gray-200 max-h-60 overflow-y-auto">
                                        {selectedMessage.details}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <SiteFooter />
        </>
    );
}