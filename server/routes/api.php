<?php

use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ImagesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

//images
Route::get('/images',[ImagesController::class, 'show']);
Route::get('/images/mywork',[ImagesController::class, 'mywork']);
Route::post('/images',[ImagesController::class, 'store']);

// お気に入り
Route::get('/favorites',[FavoriteController::class, 'index']);
Route::post('/favorites',[FavoriteController::class, 'toggleFavorite']);
Route::get('/favorites/status',[FavoriteController::class, 'checkFavoriteStatus']);