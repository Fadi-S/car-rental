<?php

namespace App\Models\Admin;


use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use SoftDeletes;

    protected $hidden = ["password", "remember_token"];
    protected $guarded = [];
}
