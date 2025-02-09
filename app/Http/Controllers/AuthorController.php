<?php

namespace App\Http\Controllers;

use App\Post;
use App\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthorController extends Controller
{
    public function show(Request $request, User $author)
    {
        return inertia()->render('Author/Show', [
            'user' => auth()->user(),
            'author' => $author,
            'posts' => Post::with('author')->whereHas('author', function($query) use ($author) {
                $query->where('id', $author->id);
            })->orderBy('created_at', 'desc')->get(),
        ]);
    }
}
