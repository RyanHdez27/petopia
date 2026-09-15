<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PetController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes - Petopia v1
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // 🔐 Auth
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // 🐾 Servicios Públicos / Catálogo
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{identifier}', [ServiceController::class, 'show']);

    // 🛍️ Tienda Pública
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{identifier}', [ProductController::class, 'show']);

    // 🔒 Rutas Protegidas (Requiere Sanctum)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // Mascotas
        Route::apiResource('pets', PetController::class);

        // Reservas
        Route::get('/bookings', [BookingController::class, 'index']);
        Route::post('/bookings', [BookingController::class, 'store']);
    });

    // Rutas públicas de fallback para desarrollo frontend rápido
    Route::get('/dev/pets', [PetController::class, 'index']);
    Route::post('/dev/bookings', [BookingController::class, 'store']);
});
