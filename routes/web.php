<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Route::inertia('/', 'welcome')->name('home');
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/blog', [BlogController::class, 'index'])->name('blog');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard/home-page', [DashboardController::class, 'index'])
        ->name('dashboard.home-page');

    Route::put('/dashboard/home-page/title', [DashboardController::class, 'updateTitle'])
        ->name('dashboard.home-page.title.update');
Route::get('/register', [UserController::class, 'create'])->name('register');
Route::post('/register', [UserController::class, 'store'])->name('register.store');

    // Blog Management Routes
    Route::get('/dashboard/blog', [BlogController::class, 'manage']);
    Route::post('/dashboard/blog', [BlogController::class, 'store']);
    Route::put('/dashboard/blog/{post}', [BlogController::class, 'update']);
    Route::delete('/dashboard/blog/{post}', [BlogController::class, 'destroy']);
});

require __DIR__ . '/settings.php';
