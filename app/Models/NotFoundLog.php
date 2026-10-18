<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NotFoundLog extends Model
{
    protected $guarded = [];

    protected $casts = [
        'last_occurred_at' => 'datetime',
    ];
}
