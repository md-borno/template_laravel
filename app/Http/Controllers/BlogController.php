<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Services\GoogleDriveService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function __construct(private GoogleDriveService $drive) {}

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
        $data = $this->data($r);

        // Only replace the image if a new file was uploaded
        if (isset($data['image'])) {
            $this->drive->deleteByUrl($post->image);
            $this->deleteLocalImage($post->image);
        }

        $post->update($data);
        return back();
    }

    public function destroy(Blog $post)
    {
        $this->drive->deleteByUrl($post->image);
        $this->deleteLocalImage($post->image);
        $post->delete();
        return back();
    }

    private function data(Request $r): array
    {
        $data = $r->validate([
            'title' => 'required|max:255',
            'body'  => 'required',
            'image' => 'nullable|image|max:5120', // 5 MB
        ]);

        if ($r->hasFile('image')) {
            $data['image'] = $this->drive->upload($r->file('image'));
        } else {
            unset($data['image']); // keep the existing image on update
        }

        return $data;
    }

    // Only remove files that were uploaded locally (old posts), never URLs
    private function deleteLocalImage(?string $image): void
    {
        if ($image && !preg_match('#^https?://#', $image)) {
            @unlink(public_path($image));
        }
    }
}