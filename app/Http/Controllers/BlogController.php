<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index() { return Inertia::render('site/blog', ['posts' => Blog::latest()->get()]); }

    public function manage() { return Inertia::render('BlogPage', ['posts' => Blog::latest()->get()]); }

    public function store(Request $r) { Blog::create($this->data($r)); return back(); }

    public function update(Request $r, Blog $post) { $post->update($this->data($r, $post)); return back(); }

    public function destroy(Blog $post)
    {
        if ($post->image) @unlink(public_path($post->image));
        $post->delete();
        return back();
    }

    private function data(Request $r, ?Blog $post = null): array
    {
        $data = $r->validate([
            'title' => 'required|max:255',
            'body' => 'required',
            'image' => 'nullable|image|max:2048',
        ]);

        unset($data['image']);

        if ($r->hasFile('image')) {
            $name = $r->file('image')->hashName();
            $r->file('image')->move(public_path('blog-images'), $name);
            $data['image'] = 'blog-images/' . $name;

            if ($post?->image) @unlink(public_path($post->image));
        }

        return $data;
    }
}
