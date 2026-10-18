<?php

namespace App\Http\Middleware;

use App\Models\NotFoundLog;
use App\Models\Visit;
use Closure;
use Illuminate\Http\Request;

class TrackVisit
{
    public function handle(Request $request, Closure $next)
    {
        // Don't track non-GET or prefetch requests
        if (! $request->isMethod('GET') || $request->header('Purpose') === 'prefetch') {
            return $next($request);
        }

        // Ignore admin, internal, and auth routes
        if ($request->is('dashboard*', 'api/*', 'settings*', 'up', 'login', 'register', 'logout', '_debugbar*', 'sanctum/*') || $request->user()) {
            return $next($request);
        }

        // Ignore static asset extensions
        $extension = strtolower(pathinfo($request->path(), PATHINFO_EXTENSION));
        if (in_array($extension, ['js', 'css', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico', 'woff', 'woff2', 'ttf', 'map'])) {
            return $next($request);
        }

        $response = $next($request);

        try {
            $userAgent = $request->userAgent() ?? '';
            $referer = $request->header('referer');
            $source = $this->resolveTrafficSource($referer, $request->getHost());
            $device = $this->resolveDeviceType($userAgent);
            $browser = $this->resolveBrowser($userAgent);
            $responseTime = defined('LARAVEL_START') ? (int) round((microtime(true) - LARAVEL_START) * 1000) : null;
            $sessionId = $request->hasSession() ? $request->session()->getId() : substr(md5($request->ip() . $userAgent . date('Y-m-d')), 0, 32);

            Visit::create([
                'ip' => $request->ip(),
                'path' => '/' . ltrim($request->path(), '/'),
                'referer' => $referer ? substr($referer, 0, 950) : null,
                'traffic_source' => $source,
                'device_type' => $device,
                'browser' => $browser,
                'session_id' => $sessionId,
                'response_time_ms' => $responseTime,
                'status_code' => $response->getStatusCode(),
            ]);

            if ($response->getStatusCode() === 404) {
                $this->logNotFound($request, $referer);
            }
        } catch (\Throwable $e) {
            report($e);
        }

        return $response;
    }

    protected function resolveTrafficSource(?string $referer, string $currentHost): string
    {
        if (empty($referer)) {
            return 'Direct';
        }

        $host = parse_url($referer, PHP_URL_HOST);
        if (! $host || strcasecmp($host, $currentHost) === 0) {
            return 'Direct';
        }

        $host = strtolower($host);

        // Search Engines
        $searchEngines = ['google.', 'bing.', 'yahoo.', 'duckduckgo.', 'baidu.', 'yandex.', 'ecosia.', 'ask.com'];
        foreach ($searchEngines as $engine) {
            if (str_contains($host, $engine)) {
                return 'Search Engines';
            }
        }

        // Social Media
        $socialNetworks = ['facebook.', 'instagram.', 'twitter.', 'x.com', 't.co', 'linkedin.', 'reddit.', 'pinterest.', 'tiktok.', 'threads.net', 'youtube.', 'whatsapp.', 'telegram.'];
        foreach ($socialNetworks as $social) {
            if (str_contains($host, $social)) {
                return 'Social Media';
            }
        }

        return 'Referral Websites';
    }

    protected function resolveDeviceType(string $userAgent): string
    {
        if (preg_match('/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i', $userAgent)) {
            return 'Tablet';
        }
        if (preg_match('/(mobi|ipod|iphone|android|blackberry|iemobile|opera mini)/i', $userAgent)) {
            return 'Mobile';
        }
        return 'Desktop';
    }

    protected function resolveBrowser(string $userAgent): string
    {
        if (str_contains($userAgent, 'Edg/')) return 'Edge';
        if (str_contains($userAgent, 'Chrome/')) return 'Chrome';
        if (str_contains($userAgent, 'Safari/') && !str_contains($userAgent, 'Chrome/')) return 'Safari';
        if (str_contains($userAgent, 'Firefox/')) return 'Firefox';
        if (str_contains($userAgent, 'OPR/') || str_contains($userAgent, 'Opera/')) return 'Opera';
        return 'Other';
    }

    protected function logNotFound(Request $request, ?string $referer): void
    {
        $path = '/' . ltrim($request->path(), '/');
        $log = NotFoundLog::firstOrNew(['url' => $path]);
        $log->referer = $referer ? substr($referer, 0, 950) : null;
        $log->ip = $request->ip();
        $log->user_agent = substr($request->userAgent() ?? '', 0, 500);
        $log->hits = ($log->exists ? $log->hits + 1 : 1);
        $log->last_occurred_at = now();
        $log->save();
    }
}