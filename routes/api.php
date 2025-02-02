<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->post('/posts', function (Request $request) {
    $post = App\Post::create([
        'content' => $request->content,
        'user_id' => auth()->id(),
    ]);

    return response($post, 201);
});

Route::get('/posts', function (Request $request) {
    return App\Post::with('author')->orderBy('created_at', 'desc')->get();
});
