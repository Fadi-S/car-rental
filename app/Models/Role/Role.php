<?php

namespace App\Models\Role;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use SoftDeletes, RoleRelationships, RoleMethods;

    protected $fillable = ['name'];
    protected $dates = ['deleted_at'];
    protected $with = ['permissions'];
}
