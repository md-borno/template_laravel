<?php

test('returns a successful response', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
});

test('application always renders without system or dark appearance detection', function () {
    $this->get(route('home'))
        ->assertOk()
        ->assertDontSee('class="dark"')
        ->assertDontSee('prefers-color-scheme');
});
