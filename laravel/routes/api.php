<?php
    use App\Http\Controllers\WeaponController;
    use Illuminate\Support\Facades\Route;

    Route::get('/weapons', [WeaponController::class, 'index']);
    Route::get('/weapons/{id}', [WeaponController::class, 'show']);