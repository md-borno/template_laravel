<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        return Inertia::render('site/blog', ['posts' => Blog::latest()->get()]);
    }

    public function manage()
    {
        return Inertia::render('BlogPage', ['posts' => Blog::latest()->get()]);
    }

    public function store(Request $r)
    {
        Blog::create($this->data($r));
        return back();
    }

    public function update(Request $r, Blog $post)
    {
        $post->update($this->data($r));
        return back();
    }

    public function destroy(Blog $post)
    {
        $this->deleteLocalImage($post->image);
        $post->delete();
        return back();
    }

    private function data(Request $r): array
    {
        return $r->validate([
            'title' => 'required|max:255',
            'body'  => 'required',
            'image' => 'nullable|url|max:2048',
        ]);
    }

    // Only remove files that were uploaded locally (old posts), never URLs
    private function deleteLocalImage(?string $image): void
    {
        if ($image && !preg_match('#^https?://#', $image)) {
            @unlink(public_path($image));
        }
    }
}