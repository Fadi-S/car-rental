<?php

namespace App\Models\Client;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Client extends Authenticatable
{
    use Notifiable, SoftDeletes, ClientAttributes, ClientRelationships;

    protected $guarded = [];
    protected $dates = [
        "deleted_at",
        "archived_at"
    ];
}
