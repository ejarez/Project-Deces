<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Aliaskan /login ke login Filament agar menjadi default aplikasi
Route::get('/login', function () {
    return redirect()->to('/admin/login');
})->name('login');

// Aliaskan /register ke register Filament
Route::get('/register', function () {
    return redirect()->to('/admin/register');
})->name('register');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
