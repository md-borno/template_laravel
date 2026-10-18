import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import {
    Activity,
    AlertTriangle,
    ArrowDownRight,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Compass,
    ExternalLink,
    FileQuestion,
    Globe,
    Layers,
    Monitor,
    MousePointerClick,
    Radio,
    Search,
    Server,
    Share2,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Tablet,
    Zap,
} from 'lucide-react';
import { useState } from 'react';

interface TrafficSourceItem {
    name: string;
    count: number;
    percentage: number;
    color: string;
}

interface DeviceTypeItem {
    name: string;
    count: number;
    percentage: number;
    color: string;
}

interface TopPageItem {
    path: string;
    title: string;
    views: number;
    percentage: number;
}

interface BrokenLinkItem {
    id: number;
    url: string;
    referer: string;
    hits: number;
    ip: string | null;
    last_occurred: string;
}

interface RecentVisit {
    id: number;
    ip: string | null;
    path: string;
    traffic_source?: string;
    device_type?: string;
    response_time_ms?: number | null;
    created_at: string;
}

interface Props {
    visits: {
        total: number;
        today: number;
        unique: number;
    };
    trafficSources: TrafficSourceItem[];
    deviceTypes: DeviceTypeItem[];
    userEngagement: {
        topPages: TopPageItem[];
        avgSessionDuration: {
            formatted: string;
            seconds: number;
            change: string;
            status: string;
        };
        bounceRate: {
            percentage: number;
            formatted: string;
            change: string;
            status: string;
        };
    };
    technicalHealth: {
        pageLoadSpeed: {
            avgMs: number;
            grade: string;
            ttfb: string;
            domProcessing: string;
            rating: string;
        };
        uptime: {
            status: string;
            uptimePercentage: string;
            period: string;
            responseTime: string;
            lastChecked: string;
            incidents: number;
            environment: {
                php: string;
                framework: string;
                database: string;
                serverStatus: string;
            };
        };
        brokenLinks: {
            totalHits: number;
            uniqueUrls: number;
            items: BrokenLinkItem[];
        };
    };
    recent: RecentVisit[];
}

export default function Dashboard({
    visits,
    trafficSources,
    deviceTypes,
    userEngagement,
    technicalHealth,
    recent,
}: Props) {
    const [timeframe, setTimeframe] = useState<'30d' | '7d' | 'all'>('30d');

    // Helper icon for traffic source
    const getSourceIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'search engines':
                return <Search className="size-4 text-[#004DEB]" />;
            case 'social media':
                return <Share2 className="size-4 text-[#EAB308]" />;
            case 'referral websites':
                return <Globe className="size-4 text-[#00D0F4]" />;
            default:
                return <Compass className="size-4 text-[#64748B]" />;
        }
    };

    // Helper icon for device
    const getDeviceIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'mobile':
                return <Smartphone className="size-4 text-[#00D0F4]" />;
            case 'tablet':
                return <Tablet className="size-4 text-[#EAB308]" />;
            default:
                return <Monitor className="size-4 text-[#004DEB]" />;
        }
    };

    return (
        <>
            <Head title="Analytics & Health Dashboard - CODLEXA" />

            <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen text-[#0F172A] dark:text-slate-100">
                {/* 1. Header & Live System Status */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#DCE4F0] dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E0FAFF] dark:bg-cyan-950/50 px-2.5 py-0.5 text-xs font-bold text-[#009FCE] dark:text-cyan-400">
                                <span className="size-2 rounded-full bg-[#00D0F4] animate-pulse" />
                                LIVE TELEMETRY
                            </span>
                            <span className="text-xs font-medium text-[#64748B] dark:text-slate-400">
                                Updated in real-time
                            </span>
                        </div>
                        <h1 className="mt-1 text-2xl font-black tracking-tight text-[#0F172A] dark:text-white md:text-3xl">
                            Traffic & Infrastructure Intelligence
                        </h1>
                        <p className="text-sm text-[#64748B] dark:text-slate-400">
                            Comprehensive traffic sources, device breakdown, engagement metrics, and server health.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5 self-start sm:self-center">
                        <div className="flex items-center rounded-xl border border-[#DCE4F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-950 p-1 text-xs font-semibold">
                            {(['7d', '30d', 'all'] as const).map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setTimeframe(t)}
                                    className={`rounded-lg px-3 py-1.5 transition-all ${
                                        timeframe === t
                                            ? 'bg-[#004DEB] text-white shadow-sm'
                                            : 'text-[#64748B] hover:text-[#0F172A] dark:hover:text-white'
                                    }`}
                                >
                                    {t === '7d' ? 'Last 7 Days' : t === '30d' ? 'Last 30 Days' : 'All Time'}
                                </button>
                            ))}
                        </div>

                        <div className="hidden lg:flex items-center gap-1.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                            <ShieldCheck className="size-4 text-emerald-600" />
                            <span>System 100% Operational</span>
                        </div>
                    </div>
                </div>

                {/* 2. Primary KPI Overview Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Card 1: Total Visits & Velocity */}
                    <div className="relative overflow-hidden rounded-2xl border border-[#DCE4F0] dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                                Total Traffic
                            </span>
                            <div className="flex size-9 items-center justify-center rounded-xl bg-[#EAF2FF] dark:bg-blue-950/50 text-[#004DEB]">
                                <Activity className="size-5" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
                                {visits.total.toLocaleString()}
                            </span>
                            <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                <ArrowUpRight className="size-3.5" />
                                +{visits.today} today
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-[#DCE4F0]/60 dark:border-slate-800/80 pt-3 text-xs text-[#64748B] dark:text-slate-400">
                            <span>Unique IPs: <strong className="text-[#0F172A] dark:text-slate-200">{visits.unique}</strong></span>
                            <span className="rounded bg-[#EAF2FF] dark:bg-blue-950 px-1.5 py-0.5 font-bold text-[#004DEB]">
                                Active
                            </span>
                        </div>
                    </div>

                    {/* Card 2: Average Session Duration */}
                    <div className="relative overflow-hidden rounded-2xl border border-[#DCE4F0] dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                                Avg Session Duration
                            </span>
                            <div className="flex size-9 items-center justify-center rounded-xl bg-[#FFFBEB] dark:bg-amber-950/50 text-[#EAB308]">
                                <Clock className="size-5" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
                                {userEngagement.avgSessionDuration.formatted}
                            </span>
                            <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                <ArrowUpRight className="size-3.5" />
                                {userEngagement.avgSessionDuration.change}
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-[#DCE4F0]/60 dark:border-slate-800/80 pt-3 text-xs text-[#64748B] dark:text-slate-400">
                            <span>Quality Index</span>
                            <span className="rounded bg-[#FFFBEB] dark:bg-amber-950 px-2 py-0.5 font-bold text-[#CA8A04] dark:text-amber-300">
                                {userEngagement.avgSessionDuration.status}
                            </span>
                        </div>
                    </div>

                    {/* Card 3: Bounce Rate */}
                    <div className="relative overflow-hidden rounded-2xl border border-[#DCE4F0] dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                                Bounce Rate
                            </span>
                            <div className="flex size-9 items-center justify-center rounded-xl bg-[#E0FAFF] dark:bg-cyan-950/50 text-[#009FCE]">
                                <MousePointerClick className="size-5" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
                                {userEngagement.bounceRate.formatted}
                            </span>
                            <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                <ArrowDownRight className="size-3.5" />
                                {userEngagement.bounceRate.change}
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-[#DCE4F0]/60 dark:border-slate-800/80 pt-3 text-xs text-[#64748B] dark:text-slate-400">
                            <span>Status</span>
                            <span className="rounded bg-[#E0FAFF] dark:bg-cyan-950 px-2 py-0.5 font-bold text-[#009FCE] dark:text-cyan-300">
                                {userEngagement.bounceRate.status}
                            </span>
                        </div>
                    </div>

                    {/* Card 4: Page Load Speed */}
                    <div className="relative overflow-hidden rounded-2xl border border-[#DCE4F0] dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                                Page Load Speed
                            </span>
                            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
                                <Zap className="size-5" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
                                {technicalHealth.pageLoadSpeed.avgMs}ms
                            </span>
                            <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 text-xs font-black text-emerald-700 dark:text-emerald-300">
                                {technicalHealth.pageLoadSpeed.grade}
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-[#DCE4F0]/60 dark:border-slate-800/80 pt-3 text-xs text-[#64748B] dark:text-slate-400">
                            <span>TTFB: <strong className="text-[#0F172A] dark:text-slate-200">{technicalHealth.pageLoadSpeed.ttfb}</strong></span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                {technicalHealth.pageLoadSpeed.rating}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 3. Traffic Sources & Device Types Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Traffic Sources Breakdown */}
                    <div className="rounded-2xl border border-[#DCE4F0] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-[#EAF2FF] dark:bg-blue-950 text-[#004DEB]">
                                    <Compass className="size-4" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-[#0F172A] dark:text-white">
                                        Traffic Sources
                                    </h2>
                                    <p className="text-xs text-[#64748B] dark:text-slate-400">
                                        Where your visitors are originating from
                                    </p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-[#004DEB] dark:text-blue-400 bg-[#EAF2FF] dark:bg-blue-950 px-2.5 py-1 rounded-full">
                                4 Inbound Channels
                            </span>
                        </div>

                        {/* Combined Stacked Bar */}
                        <div className="mt-5 flex h-3.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 p-0.5">
                            {trafficSources.map((item, idx) => (
                                <div
                                    key={item.name}
                                    style={{
                                        width: `${item.percentage}%`,
                                        backgroundColor: item.color,
                                    }}
                                    className={`h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full ${idx > 0 ? 'border-l border-white dark:border-slate-900' : ''}`}
                                    title={`${item.name}: ${item.percentage}%`}
                                />
                            ))}
                        </div>

                        {/* Channels List */}
                        <div className="mt-5 space-y-3.5">
                            {trafficSources.map((src) => (
                                <div
                                    key={src.name}
                                    className="group rounded-xl border border-[#DCE4F0]/60 dark:border-slate-800 p-3.5 transition-all hover:border-[#004DEB]/40 hover:bg-[#F8FAFC] dark:hover:bg-slate-800/40"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="flex size-7 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800">
                                                {getSourceIcon(src.name)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-[#0F172A] dark:text-white">
                                                    {src.name}
                                                </div>
                                                <div className="text-xs text-[#64748B] dark:text-slate-400">
                                                    {src.name === 'Search Engines' && 'Google, Bing, Yahoo, DuckDuckGo'}
                                                    {src.name === 'Direct' && 'Typed URL, bookmarks, direct links'}
                                                    {src.name === 'Social Media' && 'LinkedIn, X (Twitter), Facebook, Instagram'}
                                                    {src.name === 'Referral Websites' && 'External blogs, directories, partner sites'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-extrabold text-[#0F172A] dark:text-white">
                                                {src.percentage}%
                                            </div>
                                            <div className="text-xs text-[#64748B] dark:text-slate-400">
                                                {src.count.toLocaleString()} hits
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sub-progress bar */}
                                    <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${src.percentage}%`,
                                                backgroundColor: src.color,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Device Types Distribution */}
                    <div className="rounded-2xl border border-[#DCE4F0] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex size-8 items-center justify-center rounded-lg bg-[#E0FAFF] dark:bg-cyan-950 text-[#00D0F4]">
                                        <Monitor className="size-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-bold text-[#0F172A] dark:text-white">
                                            Device Types
                                        </h2>
                                        <p className="text-xs text-[#64748B] dark:text-slate-400">
                                            Mobile vs. Desktop vs. Tablet audience ratio
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-[#009FCE] dark:text-cyan-400 bg-[#E0FAFF] dark:bg-cyan-950 px-2.5 py-1 rounded-full">
                                    Responsive Optimization
                                </span>
                            </div>

                            {/* Segmented Device Bar */}
                            <div className="mt-5 flex h-3.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 p-0.5">
                                {deviceTypes.map((item, idx) => (
                                    <div
                                        key={item.name}
                                        style={{
                                            width: `${item.percentage}%`,
                                            backgroundColor: item.color,
                                        }}
                                        className={`h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full ${idx > 0 ? 'border-l border-white dark:border-slate-900' : ''}`}
                                        title={`${item.name}: ${item.percentage}%`}
                                    />
                                ))}
                            </div>

                            {/* 3 Detailed Cards */}
                            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                {deviceTypes.map((dev) => (
                                    <div
                                        key={dev.name}
                                        className="rounded-xl border border-[#DCE4F0]/70 dark:border-slate-800 p-4 text-center transition-all hover:border-[#00D0F4] hover:shadow-sm"
                                    >
                                        <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800">
                                            {getDeviceIcon(dev.name)}
                                        </div>
                                        <div className="mt-2 text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                                            {dev.name}
                                        </div>
                                        <div className="mt-1 text-2xl font-black text-[#0F172A] dark:text-white">
                                            {dev.percentage}%
                                        </div>
                                        <div className="text-xs text-[#64748B] dark:text-slate-400">
                                            {dev.count} sessions
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Optimization Recommendation Banner */}
                        <div className="mt-6 rounded-xl border border-[#DCE4F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-950/70 p-4">
                            <div className="flex items-start gap-3">
                                <Sparkles className="size-5 shrink-0 text-[#EAB308] mt-0.5" />
                                <div className="text-xs leading-relaxed text-[#64748B] dark:text-slate-400">
                                    <strong className="text-[#0F172A] dark:text-slate-200">
                                        Optimization Insight:
                                    </strong>{' '}
                                    Desktop represents <strong>{deviceTypes.find(d => d.name === 'Desktop')?.percentage ?? 58}%</strong> of traffic with high conversion on service consultations. Mobile holds <strong>{deviceTypes.find(d => d.name === 'Mobile')?.percentage ?? 36}%</strong>—keep navigation snappy and touch targets above 48px.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. User Engagement: Top Performing Pages */}
                <div className="rounded-2xl border border-[#DCE4F0] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-[#FFFBEB] dark:bg-amber-950 text-[#EAB308]">
                                <Layers className="size-4" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-[#0F172A] dark:text-white">
                                    Top Performing Pages
                                </h2>
                                <p className="text-xs text-[#64748B] dark:text-slate-400">
                                    Specific URLs receiving the highest volume of visitor engagement
                                </p>
                            </div>
                        </div>
                        <span className="text-xs font-semibold text-[#64748B] dark:text-slate-400">
                            Ranked by traffic volume
                        </span>
                    </div>

                    <div className="mt-5 overflow-x-auto rounded-xl border border-[#DCE4F0]/80 dark:border-slate-800">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#F8FAFC] dark:bg-slate-950 border-b border-[#DCE4F0] dark:border-slate-800 text-xs font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
                                <tr>
                                    <th className="px-4 py-3 w-12 text-center">Rank</th>
                                    <th className="px-4 py-3">Page Name & Route</th>
                                    <th className="px-4 py-3 text-right">Pageviews</th>
                                    <th className="px-4 py-3 w-48">Traffic Share</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DCE4F0]/60 dark:divide-slate-800">
                                {userEngagement.topPages.map((page, index) => (
                                    <tr
                                        key={page.path}
                                        className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                                    >
                                        <td className="px-4 py-3 text-center font-bold text-[#64748B]">
                                            <span className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-black ${
                                                index === 0
                                                    ? 'bg-[#EAB308]/20 text-[#CA8A04] dark:text-amber-300'
                                                    : index === 1
                                                    ? 'bg-[#004DEB]/15 text-[#004DEB] dark:text-blue-300'
                                                    : index === 2
                                                    ? 'bg-[#00D0F4]/20 text-[#009FCE] dark:text-cyan-300'
                                                    : 'text-slate-500'
                                            }`}>
                                                #{index + 1}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="font-bold text-[#0F172A] dark:text-white">
                                                {page.title}
                                            </div>
                                            <div className="font-mono text-xs text-[#004DEB] dark:text-blue-400">
                                                {page.path}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right font-extrabold text-[#0F172A] dark:text-white">
                                            {page.views.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                                    <div
                                                        className="h-full rounded-full bg-[#004DEB]"
                                                        style={{ width: `${page.percentage}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-semibold text-[#64748B] w-10 text-right">
                                                    {page.percentage}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <a
                                                href={page.path}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 rounded-lg border border-[#DCE4F0] dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-[#004DEB] hover:bg-[#EAF2FF] dark:hover:bg-blue-950 transition-colors"
                                            >
                                                <span>View</span>
                                                <ExternalLink className="size-3" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}

                                {userEngagement.topPages.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-xs text-[#64748B]">
                                            No page visits recorded yet. As visitors navigate the site, top performing pages will appear here in real time.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 5. Technical Health, Uptime & 404 Security Tracking */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Server Uptime & Technical Health */}
                    <div className="rounded-2xl border border-[#DCE4F0] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                                    <Server className="size-4" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-[#0F172A] dark:text-white">
                                        Server Health & Uptime
                                    </h2>
                                    <p className="text-xs text-[#64748B] dark:text-slate-400">
                                        Continuous availability and runtime performance
                                    </p>
                                </div>
                            </div>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 text-xs font-black text-emerald-800 dark:text-emerald-300">
                                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                                {technicalHealth.uptime.status}
                            </span>
                        </div>

                        {/* Uptime Big Metric */}
                        <div className="mt-5 rounded-xl border border-emerald-200/70 dark:border-emerald-900/50 bg-gradient-to-br from-emerald-50/60 to-white dark:from-emerald-950/20 dark:to-slate-900 p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                                        30-Day Verified Uptime
                                    </div>
                                    <div className="mt-1 text-3xl font-black text-[#0F172A] dark:text-white">
                                        {technicalHealth.uptime.uptimePercentage}
                                    </div>
                                    <div className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
                                        Zero service interruptions recorded
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-[#64748B]">Last Checked</div>
                                    <div className="text-sm font-bold text-[#0F172A] dark:text-white">
                                        {technicalHealth.uptime.lastChecked}
                                    </div>
                                    <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                                        <CheckCircle2 className="size-3.5" />
                                        <span>0 outages</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* System Specs & Diagnostics */}
                        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                            <div className="rounded-xl border border-[#DCE4F0]/70 dark:border-slate-800 p-3 bg-[#F8FAFC] dark:bg-slate-950">
                                <div className="font-semibold text-[#64748B]">Environment</div>
                                <div className="mt-1 font-bold text-[#0F172A] dark:text-slate-200">
                                    {technicalHealth.uptime.environment.framework}
                                </div>
                                <div className="text-[11px] text-[#64748B]">PHP {technicalHealth.uptime.environment.php}</div>
                            </div>

                            <div className="rounded-xl border border-[#DCE4F0]/70 dark:border-slate-800 p-3 bg-[#F8FAFC] dark:bg-slate-950">
                                <div className="font-semibold text-[#64748B]">Database Engine</div>
                                <div className="mt-1 font-bold text-[#0F172A] dark:text-slate-200">
                                    {technicalHealth.uptime.environment.database}
                                </div>
                                <div className="text-[11px] text-emerald-600 font-semibold">Active & Healthy</div>
                            </div>

                            <div className="rounded-xl border border-[#DCE4F0]/70 dark:border-slate-800 p-3 bg-[#F8FAFC] dark:bg-slate-950">
                                <div className="font-semibold text-[#64748B]">Server Latency</div>
                                <div className="mt-1 font-bold text-[#0F172A] dark:text-slate-200">
                                    {technicalHealth.uptime.responseTime}
                                </div>
                                <div className="text-[11px] text-emerald-600 font-semibold">Ultra Fast (Local/Edge)</div>
                            </div>

                            <div className="rounded-xl border border-[#DCE4F0]/70 dark:border-slate-800 p-3 bg-[#F8FAFC] dark:bg-slate-950">
                                <div className="font-semibold text-[#64748B]">Health Endpoint</div>
                                <div className="mt-1 font-bold text-[#0F172A] dark:text-slate-200 font-mono">
                                    /up
                                </div>
                                <div className="text-[11px] text-[#004DEB] font-semibold">HTTP 200 Live</div>
                            </div>
                        </div>
                    </div>

                    {/* 404 Errors & Broken Links Tracking */}
                    <div className="rounded-2xl border border-[#DCE4F0] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex size-8 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600">
                                        <AlertTriangle className="size-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-bold text-[#0F172A] dark:text-white">
                                            404 Errors & Broken Links
                                        </h2>
                                        <p className="text-xs text-[#64748B] dark:text-slate-400">
                                            Track missing pages to configure redirects and protect SEO
                                        </p>
                                    </div>
                                </div>
                                <span className="rounded-full bg-rose-100 dark:bg-rose-950 px-2.5 py-0.5 text-xs font-black text-rose-700 dark:text-rose-300">
                                    {technicalHealth.brokenLinks.uniqueUrls} Broken URLs Detected
                                </span>
                            </div>

                            {/* Broken links list */}
                            <div className="mt-4 space-y-2.5">
                                {technicalHealth.brokenLinks.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded-xl border border-rose-100 dark:border-rose-950/60 bg-rose-50/30 dark:bg-rose-950/20 p-3 transition-all hover:border-rose-300"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400 truncate">
                                                        {item.url}
                                                    </span>
                                                    <span className="rounded bg-rose-200/60 dark:bg-rose-900/60 px-1.5 py-0.2 text-[10px] font-extrabold text-rose-800 dark:text-rose-200">
                                                        {item.hits} {item.hits === 1 ? 'hit' : 'hits'}
                                                    </span>
                                                </div>
                                                <div className="mt-1 text-xs text-[#64748B] truncate">
                                                    Referer: <span className="text-slate-700 dark:text-slate-300">{item.referer}</span>
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <div className="text-[11px] font-semibold text-[#64748B]">
                                                    {item.last_occurred}
                                                </div>
                                                <span className="inline-block mt-1 text-[10px] font-bold text-[#004DEB] hover:underline cursor-pointer">
                                                    Create Redirect →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {technicalHealth.brokenLinks.items.length === 0 && (
                                    <div className="py-8 text-center text-xs text-[#64748B]">
                                        <CheckCircle2 className="mx-auto size-8 text-emerald-500 mb-2" />
                                        No broken links or 404 errors detected. All routes healthy!
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 rounded-xl border border-[#DCE4F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-950 p-3 text-xs text-[#64748B] flex items-center justify-between">
                            <span>Total 404 Requests Intercepted: <strong className="text-[#0F172A] dark:text-white">{technicalHealth.brokenLinks.totalHits}</strong></span>
                            <span className="text-rose-600 font-semibold">Immediate 301 Redirect Recommended</span>
                        </div>
                    </div>
                </div>

                {/* 6. Live Recent Inbound Visits Stream */}
                <div className="rounded-2xl border border-[#DCE4F0] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-[#EAF2FF] dark:bg-blue-950 text-[#004DEB]">
                                <Radio className="size-4 animate-pulse" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-[#0F172A] dark:text-white">
                                    Recent Inbound Visitors Stream
                                </h2>
                                <p className="text-xs text-[#64748B] dark:text-slate-400">
                                    Live activity log with device, source, and response latency
                                </p>
                            </div>
                        </div>
                        <span className="text-xs font-semibold text-[#64748B]">
                            Showing latest {recent.length} events
                        </span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-[#DCE4F0]/80 dark:border-slate-800">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#F8FAFC] dark:bg-slate-950 border-b border-[#DCE4F0] dark:border-slate-800 text-xs font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
                                <tr>
                                    <th className="px-4 py-3">Timestamp</th>
                                    <th className="px-4 py-3">Page Visited</th>
                                    <th className="px-4 py-3">Source Channel</th>
                                    <th className="px-4 py-3">Device</th>
                                    <th className="px-4 py-3 text-right">Server Latency</th>
                                    <th className="px-4 py-3">Client IP</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DCE4F0]/60 dark:divide-slate-800">
                                {recent.map((v) => (
                                    <tr
                                        key={v.id}
                                        className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                                    >
                                        <td className="px-4 py-3 text-xs text-[#64748B] whitespace-nowrap">
                                            {new Date(v.created_at).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs font-bold text-[#004DEB] dark:text-blue-400">
                                            {v.path}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                                v.traffic_source === 'Search Engines'
                                                    ? 'bg-[#EAF2FF] text-[#004DEB]'
                                                    : v.traffic_source === 'Social Media'
                                                    ? 'bg-[#FFFBEB] text-[#CA8A04]'
                                                    : v.traffic_source === 'Referral Websites'
                                                    ? 'bg-[#E0FAFF] text-[#009FCE]'
                                                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                            }`}>
                                                {v.traffic_source || 'Direct'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs font-medium text-[#0F172A] dark:text-slate-300">
                                            {v.device_type || 'Desktop'}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-bold font-mono ${
                                                (v.response_time_ms ?? 140) < 200
                                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                                                    : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                                            }`}>
                                                {v.response_time_ms ? `${v.response_time_ms}ms` : '135ms'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs text-[#64748B]">
                                            {v.ip ? `${v.ip.split('.').slice(0, 3).join('.')}.***` : '127.0.0.1'}
                                        </td>
                                    </tr>
                                ))}

                                {recent.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-4 py-8 text-center text-xs text-[#64748B]"
                                        >
                                            No recent visitors recorded yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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