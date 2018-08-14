<?php

namespace App\Models\Role;

use App\Models\Permission\Permission;

trait RoleMethods
{
    public static function createDefault()
    {
        $admin = static::create(['name'=>'Admin']);
        $permissions = Permission::permissionsArray();
        foreach($permissions as $perm)
        {
            $perm = Permission::create(
                [
                    'group' => $perm['group'],
                    'name'  => $perm['name'],
                    'label' => $perm['label']
                ]);
            $admin->permissions()->attach($perm->id);
        }
    }
}