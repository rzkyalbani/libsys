<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
        return redirect()->route('dashboard');
});

Route::get('/dashboard', function () {
    $user = Auth::user();

    if ($user->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }

    return redirect()->route('member.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])
    ->name('dashboard');
    Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class);
    Route::resource('books', \App\Http\Controllers\Admin\BookController::class);
    Route::resource('members', \App\Http\Controllers\Admin\MemberController::class)
    ->only(['index', 'destroy']);
    Route::get('/borrowings', [\App\Http\Controllers\Admin\BorrowingController::class, 'index'])->name('borrowings.index');
    Route::patch('/borrowings/{borrowing}', [\App\Http\Controllers\Admin\BorrowingController::class, 'update'])->name('borrowings.update');
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
}); 

Route::middleware(['auth', 'role:member'])->prefix('member')->name('member.')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Member/Dashboard'))->name('dashboard');
    Route::get('/profile', [\App\Http\Controllers\Member\ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [\App\Http\Controllers\Member\ProfileController::class, 'update'])->name('profile.update');
    Route::get('/books', [\App\Http\Controllers\Member\BookController::class, 'index'])->name('books.index');
    Route::post('/books/{book}/reserve', [\App\Http\Controllers\Member\BookController::class, 'reserve'])->name('books.reserve');
    Route::post('/borrow', [\App\Http\Controllers\Member\BorrowingController::class, 'store'])->name('borrow.store');
    Route::get('/reservations', [\App\Http\Controllers\Member\ReservationController::class, 'index'])->name('reservations.index');
    Route::delete('/reservations/{reservation}', [\App\Http\Controllers\Member\ReservationController::class, 'destroy'])->name('reservations.destroy');
});


Route::middleware(['auth', 'role:member'])->group(function () {
    Route::get('/member/dashboard', fn() => Inertia::render('Member/Dashboard'))
        ->name('member.dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
