<?php

use App\Models\Blog;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('blog posts can be updated with multipart form method spoofing', function () {
    $post = Blog::create([
        'title' => 'Original title',
        'body' => 'Original body',
    ]);

    $this->actingAs(User::factory()->create())
        ->post("/dashboard/blog/{$post->id}", [
            '_method' => 'put',
            'title' => 'Updated title',
            'body' => 'Updated body',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('blogs', [
        'id' => $post->id,
        'title' => 'Updated title',
        'body' => 'Updated body',
    ]);
});

test('full article body is available on the article page', function () {
    $body = implode(' ', array_fill(0, 1000, 'article'));
    $post = Blog::create([
        'title' => 'Long article',
        'body' => $body,
    ]);

    $this->get(route('blog.show', $post))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('site/blog-detail')
            ->where('post.body', $body),
        );
});
