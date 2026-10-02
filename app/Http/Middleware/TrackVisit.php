<?php

namespace App\Http\Middleware;

use App\Models\Visit;
use Closure;
use Illuminate\Http\Request;

class TrackVisit
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->isMethod('GET') && ! $request->user() && $request->header('Purpose') !== 'prefetch') {
            Visit::create([
                'ip' => $request->ip(),
                'path' => '/' . ltrim($request->path(), '/'),
            ]);
        }

        return $next($request);
    }
}