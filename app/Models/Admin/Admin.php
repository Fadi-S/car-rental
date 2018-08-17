<?php

namespace App\Models\Admin;


use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use Notifiable, SoftDeletes, AdminAttributes, AdminRelationships, AdminMethods;

    protected $hidden = ["password", "remember_token"];
    protected $fillable = ["name", "username", "email", "phone", "password", "role_id", "location_id", "department"];
    protected $dates = [
        "deleted_at",
        "archived_at"
    ];

    public function getRouteKeyName()
    {
        return "username";
    }
}
