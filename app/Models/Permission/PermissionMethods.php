<?php

namespace App\Models\Permission;

trait PermissionMethods
{
    public static function groups()
    {
        return \DB::table('permissions')->distinct()->get(['group']);
    }

    public static function permissionsByGroup($group)
    {
        return static::where('group' , $group)->orderBy('id' , 'asc')->get();
    }

    public static function permissionsArray()
    {
        $permissions = [
            /* Roles */
            [
                'group'  => 'Roles',
                'name'   => 'add_role',
                'label'  => 'Add Role',
            ],
            [
                'group'  => 'Roles',
                'name'   => 'edit_role',
                'label'  => 'Edit Role',
            ],
            [
                'group'  => 'Roles',
                'name'   => 'delete_role',
                'label'  => 'Delete Role',
            ],
            [
                'group'  => 'Roles',
                'name'   => 'view_role',
                'label'  => 'View Roles',
            ],

            /* Admins */
            [
                'group'  => 'Admins',
                'name'   => 'add_admin',
                'label'  => 'Add Admin',
            ],
            [
                'group'  => 'Admins',
                'name'   => 'edit_admin',
                'label'  => 'Edit Admin',
            ],
            [
                'group'  => 'Admins',
                'name'   => 'delete_admin',
                'label'  => 'Delete Admin',
            ],
            [
                'group'  => 'Admins',
                'name'   => 'view_admin',
                'label'  => 'View Admins',
            ],
            [
                'group'  => 'Admins',
                'name'   => 'activity_admin',
                'label'  => 'View Admins Activity',
            ],


            /* Clients */
            [
                'group'  => 'Clients',
                'name'   => 'add_client',
                'label'  => 'Add Client',
            ],
            [
                'group'  => 'Clients',
                'name'   => 'edit_client',
                'label'  => 'Edit Client',
            ],
            [
                'group'  => 'Clients',
                'name'   => 'delete_client',
                'label'  => 'Delete Client',
            ],
            [
                'group'  => 'Clients',
                'name'   => 'view_client',
                'label'  => 'View Clients',
            ],

            /* Cars */
            [
                'group'  => 'Cars',
                'name'   => 'add_car',
                'label'  => 'Add Car',
            ],
            [
                'group'  => 'Cars',
                'name'   => 'edit_car',
                'label'  => 'Edit Car',
            ],
            [
                'group'  => 'Cars',
                'name'   => 'delete_car',
                'label'  => 'Delete Car',
            ],
            [
                'group'  => 'Cars',
                'name'   => 'view_car',
                'label'  => 'View Car',
            ],
            [
                'group'  => 'Cars',
                'name'   => 'activity_car',
                'label'  => 'View Cars Activity',
            ],

        ];
        return $permissions;
    }
}