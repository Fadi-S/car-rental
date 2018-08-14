<?php

namespace App\Models\Permission;

use App\Models\Role\Role;

trait PermissionRelationships
{
    public function roles()
    {
        return $this->belongsToMany(Role::class , 'permission_role');
    }

    public function hasRole($roleId)
    {
        return $this->roles()->where('role_id' , $roleId)->exists();
    }


}