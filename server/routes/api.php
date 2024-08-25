<?php

use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ImagesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

//images
Route::get('/images',[ImagesController::class, 'show']);//全ての作品
Route::get('/images/mywork',[ImagesController::class, 'mywork']);// 自分の作品のみ
Route::get('/images/search/{query}', [ImagesController::class, 'search']);
Route::post('/images',[ImagesController::class, 'store']);
Route::delete('/image/{image}',[ImagesController::class, 'destroy']);

// お気に入り
Route::get('/favorites',[FavoriteController::class, 'index']);
Route::post('/favorites',[FavoriteController::class, 'toggleFavorite']);
Route::get('/favorites/status',[FavoriteController::class, 'checkFavoriteStatus']);//お気に入りされているかの判定