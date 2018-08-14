<?php

namespace App\Models\Permission;

trait PermissionRelationships
{
    public function roles()
    {
        return $this->belongsToMany('App\Role' , 'permission_role');
    }

    public function hasRole($roleId)
    {
        return $this->roles()->where('role_id' , $roleId)->exists();
    }


}