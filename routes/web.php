<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

// Route::inertia('/', 'welcome')->name('home');
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// Route::get('/dashboard', [DashboardController::class, 'index'])
//     ->middleware('auth')
//     ->name('dashboard');

// Route::put('/dashboard/home-page/title', [DashboardController::class, 'updateTitle'])
//     ->middleware('auth')
//     ->name('dashboard.home-page.title.update');
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard/home-page', [DashboardController::class, 'index'])
        ->name('dashboard.home-page');

    Route::put('/dashboard/home-page/title', [DashboardController::class, 'updateTitle'])
        ->name('dashboard.home-page.title.update');
});

require __DIR__.'/settings.php';
