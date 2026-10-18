<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Public Website Routes (Tracked automatically by TrackVisit middleware)
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/services', [ServicesController::class, 'index'])->name('services');
Route::get('/portfolio', [PortfolioController::class, 'index'])->name('portfolio');
Route::get('/about-us', [AboutUsController::class, 'index'])->name('about-us');
Route::get('/career', [CareerController::class, 'index'])->name('career');
Route::get('/careers', fn() => redirect('/career'));
Route::get('/blog', [BlogController::class, 'index'])->name('blog');
Route::get('/blog/{post}', [BlogController::class, 'show'])->name('blog.show');
Route::get('/contact-us', [ContactUsController::class, 'index'])->name('contact-us');
Route::post('/contact-us', [ContactUsController::class, 'store'])->name('contact-us.store');

// Authenticated Admin Dashboard Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'show'])->name('dashboard');
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

    // Contact Us Management Routes
    Route::get('/user-messages', [ContactUsController::class, 'list'])->name('messages.list');
});

require __DIR__.'/settings.php';
