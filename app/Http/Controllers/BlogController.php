<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index() {
        return view('blog', ['posts' => Blog::latest()->get()]);
        }
    public function manage() {
        return Inertia::render('BlogPage', ['posts' => Blog::latest()->get()]);
        }
    public function store(Request $r) {
        Blog::create($r->validate(['title' => 'required|max:255', 'body' => 'required'])); return back();
        }
    public function update(Request $r, Blog $post) {
        $post->update($r->validate(['title' => 'required|max:255', 'body' => 'required'])); return back();
        }
    public function destroy(Blog $post) {
        $post->delete(); return back();
        }
}
