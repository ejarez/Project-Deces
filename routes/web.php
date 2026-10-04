<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\PendaftaranController::class, 'index'])->name('home');
Route::post('/daftar', [\App\Http\Controllers\PendaftaranController::class, 'store'])->name('pendaftaran.store');

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

// Route untuk melihat / stream berkas pendaftaran PDF secara aman tanpa kendala symlink/403
Route::get('/berkas-siswa/{calonSiswa}', function (\App\Models\CalonSiswa $calonSiswa) {
    if (!$calonSiswa->berkas_pendaftaran) {
        abort(404, 'Berkas pendaftaran tidak ditemukan.');
    }

    $filePath = storage_path('app/public/' . $calonSiswa->berkas_pendaftaran);

    if (!file_exists($filePath)) {
        abort(404, 'File fisik berkas tidak ditemukan di server.');
    }

    return response()->file($filePath, [
        'Content-Type' => 'application/pdf',
        'Content-Disposition' => 'inline; filename="Berkas-' . \Illuminate\Support\Str::slug($calonSiswa->nama_lengkap) . '.pdf"',
    ]);
})->name('calon-siswa.berkas');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
