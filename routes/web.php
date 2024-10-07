<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home/Index');
});
Route::get('/book', function () {
    return Inertia::render('Book/Index');
});
use App\Http\Controllers\LoaiSachController;

Route::get('/loai-sach', [LoaiSachController::class, 'index']);


use App\Http\Controllers\UserController;
  
Route::get('/users', [UserController::class, 'index']);
Route::get('/users-export', [UserController::class, 'export'])->name('users.export');
Route::post('/users-import', [UserController::class, 'import'])->name('users.import');
