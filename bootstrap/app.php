<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            \App\Http\Middleware\TrackVisit::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );

        $exceptions->renderable(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, Request $request) {
            try {
                $path = '/' . ltrim($request->path(), '/');
                $log = \App\Models\NotFoundLog::firstOrNew(['url' => $path]);
                $referer = $request->header('referer');
                $log->referer = $referer ? substr($referer, 0, 950) : null;
                $log->ip = $request->ip();
                $log->user_agent = substr($request->userAgent() ?? '', 0, 500);
                $log->hits = ($log->exists ? $log->hits + 1 : 1);
                $log->last_occurred_at = now();
                $log->save();
            } catch (\Throwable $th) {
                // Ignore analytics errors
            }
            return null; // Continue with default 404 response
        });
    })->create();
