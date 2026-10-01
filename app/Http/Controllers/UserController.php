<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\CreateNewUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserController extends Controller
{
  public function create()
{
    return Inertia::render('RegisterUser', [
        'users' => User::latest()->get(['id', 'name', 'email']),
    ]);
}

    public function store(Request $r, CreateNewUser $action)
    {
        $action->create($r->all());
        return back();
    }
}
