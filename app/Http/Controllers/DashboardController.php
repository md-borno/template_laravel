<?php

namespace App\Http\Controllers;

use App\Models\HomePage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $homePage = HomePage::first();

        return Inertia::render('HomePage', [
            'homePage' => $homePage,
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
