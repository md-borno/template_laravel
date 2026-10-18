import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

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

export default function UserMessages({ messages }: Props) {
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
            <Head title="User Messages" />

            <main className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[#0F172A]">
                            User Messages / Inquiries
                        </h1>
                        <p className="mt-1 text-sm text-[#64748B]">
                            Total messages received: <span className="font-semibold text-[#0F172A]">{messages.total}</span>
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-[#DCE4F0] bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-[#64748B]">
                            <thead className="border-b border-[#DCE4F0] bg-[#F8FAFC] text-xs uppercase tracking-wider text-[#0F172A]">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Sender</th>
                                    <th className="px-6 py-4">Contact Info</th>
                                    <th className="px-6 py-4">Message</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DCE4F0]">
                                {messages.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-10 text-center text-[#94A3B8]">
                                            No messages received yet.
                                        </td>
                                    </tr>
                                ) : (
                                    messages.data.map((msg) => (
                                        <tr key={msg.id} className="hover:bg-[#EAF2FF]/50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-[#94A3B8]">
                                                #{msg.id}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-[#0F172A]">
                                                {msg.full_name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <a
                                                        href={`mailto:${msg.email}`}
                                                        className="text-[#004DEB] hover:underline font-medium block"
                                                    >
                                                        {msg.email}
                                                    </a>
                                                    {msg.phone ? (
                                                        <a
                                                            href={`tel:${msg.phone}`}
                                                            className="text-xs text-[#64748B] hover:text-[#004DEB] block mt-0.5"
                                                        >
                                                            {msg.phone}
                                                        </a>
                                                    ) : (
                                                        <span className="text-xs text-[#94A3B8]">No phone</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 max-w-xs truncate text-[#0F172A]">
                                                {msg.details}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-[#64748B] whitespace-nowrap">
                                                {formatDate(msg.created_at)}
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => setSelectedMessage(msg)}
                                                    className="rounded-lg bg-[#EAF2FF] px-3.5 py-1.5 text-xs font-semibold text-[#004DEB] transition hover:bg-[#00D0F4] hover:text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#004DEB]/40"
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-[#DCE4F0]">
                            <div className="flex items-start justify-between border-b border-[#DCE4F0] pb-3">
                                <div>
                                    <h3 className="text-lg font-bold text-[#0F172A]">
                                        {selectedMessage.full_name}
                                    </h3>
                                    <p className="text-xs text-[#64748B]">
                                        Received: {formatDate(selectedMessage.created_at)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="text-[#94A3B8] hover:text-[#0F172A] text-lg font-bold"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="mt-4 space-y-3 text-sm">
                                <div>
                                    <span className="font-semibold text-[#0F172A]">Email:</span>{' '}
                                    <a
                                        href={`mailto:${selectedMessage.email}`}
                                        className="text-[#004DEB] hover:underline font-medium"
                                    >
                                        {selectedMessage.email}
                                    </a>
                                </div>
                                <div>
                                    <span className="font-semibold text-[#0F172A]">Phone:</span>{' '}
                                    {selectedMessage.phone ? (
                                        <a
                                            href={`tel:${selectedMessage.phone}`}
                                            className="text-[#004DEB] hover:underline font-medium"
                                        >
                                            {selectedMessage.phone}
                                        </a>
                                    ) : (
                                        <span className="text-[#94A3B8]">Not provided</span>
                                    )}
                                </div>
                                <div>
                                    <span className="font-semibold text-[#0F172A] block mb-1">
                                        Message:
                                    </span>
                                    <div className="rounded-xl bg-[#F8FAFC] p-4 text-[#0F172A] whitespace-pre-wrap border border-[#DCE4F0] max-h-60 overflow-y-auto leading-relaxed">
                                        {selectedMessage.details}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="rounded-xl bg-[#004DEB] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0038B8]"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}