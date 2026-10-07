<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    // Renders the submission form
    public function index()
    {
        return inertia('site/contact-us');
    }

    // Handles form submission
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email'     => ['required', 'email', 'max:255'],
            'phone'     => ['nullable', 'string', 'max:30'],
            'details'   => ['required', 'string'],
        ]);

        ContactUs::create($validated);

        return redirect()->back();
    }

    // Displays all messages
    public function list()
    {
        $messages = ContactUs::latest()->paginate(15);

        return inertia('user-messages', [
            'messages' => $messages,
        ]);
    }
}