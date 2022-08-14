<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EmployeeController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::name('employees.')->group(function () {
    Route::post('/employees/Added', [EmployeeController::class,'store']);
    Route::get('/employees', [EmployeeController::class,'show']);
    Route::get('/add/Days/{id}', [EmployeeController::class,'addDay']);
    Route::get('/show/Days', [EmployeeController::class,'ShowDays']);
    Route::get('/show/Days/vaild', [EmployeeController::class,'vaild']);
    Route::post('/show/Days/unvaild', [EmployeeController::class,'unvaild']);
    Route::post('/Update/Days/{id}', [EmployeeController::class,'UpdateDays']);
    ;});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard')
;Route::get('/salary', function () {
    return Inertia::render('Salary');
})->middleware(['auth', 'verified'])->name('dashboard')
;
Route::get('/daily', function () {
    return Inertia::render('daily');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/day', function () {
    return Inertia::render('day');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/daysnote', function () {
    return Inertia::render('daynote');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/monthly', function () {
    return Inertia::render('Monthly');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/empployees', function () {
    return Inertia::render('Employees');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
