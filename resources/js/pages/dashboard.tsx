import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';

interface Visit {
    id: number;
    ip: string | null;
    path: string;
    created_at: string;
}

interface Props {
    visits: {
        total: number;
        today: number;
        unique: number;
    };
    recent: Visit[];
}

export default function Dashboard({ visits, recent }: Props) {
    const cards = [
        { label: 'Total Visits', value: visits.total },
        { label: 'Visits Today', value: visits.today },
        { label: 'Unique Visitors', value: visits.unique },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {cards.map((c) => (
                        <div
                            key={c.label}
                            className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
                        >
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            <div className="relative z-10 flex h-full flex-col items-center justify-center">
                                <div className="text-sm text-muted-foreground">
                                    {c.label}
                                </div>
                                <div className="mt-2 text-5xl font-bold">
                                    {c.value}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <div className="relative z-10 flex h-full flex-col p-4">
                        <h2 className="mb-4 text-xl font-semibold">
                            Recent Visits
                        </h2>
                        <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 bg-background/90 backdrop-blur-sm dark:border-sidebar-border">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-sidebar-border/70 dark:border-sidebar-border">
                                    <tr>
                                        <th className="px-4 py-3">Date & Time</th>
                                        <th className="px-4 py-3">Page</th>
                                        <th className="px-4 py-3">IP Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recent.map((v) => (
                                        <tr
                                            key={v.id}
                                            className="border-b border-sidebar-border/70 last:border-0 dark:border-sidebar-border"
                                        >
                                            <td className="px-4 py-3">
                                                {new Date(
                                                    v.created_at,
                                                ).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">{v.path}</td>
                                            <td className="px-4 py-3">{v.ip}</td>
                                        </tr>
                                    ))}

                                    {recent.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-4 py-6 text-center text-muted-foreground"
                                            >
                                                No visits yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};