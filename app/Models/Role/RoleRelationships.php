<?php

namespace App\Models\Role;

use App\Models\Admin\Admin;
use App\Models\AdminLog\AdminLog;
use App\Models\Permission\Permission;

trait RoleRelationships
{
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'permission_role' , 'role_id' , 'permission_id');
    }

    public function admins()
    {
        return $this->hasMany(Admin::class);
    }

    public function adminLog()
    {
        return $this->morphMany(AdminLog::class, 'logable');
    }
}