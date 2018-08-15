<?php

namespace App\Repositories\Admin;

use App\Http\Requests\Admin\RoleRequest;
use App\Models\AdminLog\AdminLog;
use App\Models\Role\Role;

class RoleRepository
{
    public function create(RoleRequest $request)
    {
        $role = Role::create($request->only(['name']));
        if (!is_null($role)) {
            $request->request->set('permissions',
            array_intersect(
                $request->permissions,
                auth()->guard('admin')->user()->role->permissions()->pluck('id')->toArray())
            );

            $role->permissions()->attach($request->post('permissions'));
            AdminLog::createRecord("add", $role);
            flash()->success("Role Created Successfully");
        } else {
            flash()->error("Error Creating Role!")->important();
        }
    }

    public function edit(RoleRequest $request, Role $role)
    {
        $request->request->set('permissions',
            array_intersect(
                $request->permissions,
                auth()->guard('admin')->user()->role->permissions()->pluck('id')->toArray())
        );

        if (!AdminLog::createRecord("edit", $role, $request->keys(), $request->all(), ['id' => 'permissions'])) {
            flash()->error("You didn't change anything!");

            return;
        }
        if ($role->update($request->only(['name']))) {
            flash()->success("Role Updated Successfully");
            $role->permissions()->sync($request->post('permissions'));
        }else
            flash()->error("Error Updating Role!")->important();
    }

    public function getAll($paginate = 100)
    {
        return Role::paginate($paginate);
    }

    public function delete(Role $role)
    {
        if($role->delete()) {
            flash()->warning("Role Deleted Successfully");
            AdminLog::createRecord("delete", $role);
        }else flash()->error("Error Deleting Role");
    }
}