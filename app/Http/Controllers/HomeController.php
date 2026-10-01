<?php

namespace App\Http\Controllers;

use App\Models\HomePage;
use Illuminate\Http\Request;

class HomeController extends Controller
{ public function index()
    {
        $homePage = HomePage::first();

        return view('home', compact('homePage'));
    }
}
