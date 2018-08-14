<?php

namespace App\Models\Permission;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use PermissionRelationships, PermissionMethods;

    protected $guarded = [];
}
