<?php

use App\Models\ContactUs;
use App\Models\User;

test('contact form messages are saved and visible in the admin inbox', function () {
    $this->post(route('contact-us.store'), [
        'full_name' => 'Ada Lovelace',
        'email' => 'ada@example.com',
        'phone' => '555-0100',
        'details' => 'Please contact me about a project.',
    ])->assertRedirect();

    $message = ContactUs::query()->firstOrFail();

    $this->actingAs(User::factory()->create())
        ->get(route('messages.list'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('user-messages')
            ->has('messages.data', 1)
            ->where('messages.data.0.id', $message->id)
            ->where('messages.data.0.full_name', 'Ada Lovelace')
            ->where('messages.data.0.details', 'Please contact me about a project.'));
});

test('guests cannot view the contact message inbox', function () {
    $this->get(route('messages.list'))
        ->assertRedirect(route('login'));
});