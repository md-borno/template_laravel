<?php

namespace App\Http\Controllers;

use App\Models\HomePage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Visit;

class DashboardController extends Controller
{
    public function index()
    {
        $homePage = HomePage::first();

        return Inertia::render('HomePage', [
            'homePage' => $homePage,
        ]);
    }

public function show()
{
    return Inertia::render('dashboard', [
        'visits' => [
            'total' => Visit::count(),
            'today' => Visit::whereDate('created_at', today())->count(),
            'unique' => Visit::distinct()->count('ip'),
        ],
        'recent' => Visit::latest()->limit(20)->get(['id', 'ip', 'path', 'created_at']),
    ]);
}
    public function updateTitle(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
        ]);

        $homePage = HomePage::first();

        $homePage->update([
            'title' => $request->title,
        ]);

        return back();
    }
}
