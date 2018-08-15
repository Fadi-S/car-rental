<?php

namespace App\Repositories\Admin;

use App\Http\Requests\Admin\AdminRequest;
use App\Models\Admin\Admin;
use App\Models\AdminLog\AdminLog;

class AdminRepository
{
    public function create(AdminRequest $request)
    {
        $admin = Admin::create($request->all());
        if (!is_null($admin)) {
            AdminLog::createRecord("add", $admin);
            flash()->success("Admin Created Successfully");
        } else {
            flash()->error("Error Creating Admin!")->important();
        }
        return $admin;
    }

    public function update(AdminRequest $request, Admin $admin)
    {
        if (!AdminLog::createRecord("edit", $admin, $request->keys(), $request->all())) {
            flash()->error("You didn't change anything!");
            return false;
        }

        if ($admin->update($request->except("password")))
            flash()->success("Admin Updated Successfully");
        else
            flash()->error("Error Updating Admin!")->important();

        return true;
    }

    public function getAll($paginate = 100)
    {
        return Admin::paginate($paginate);
    }

    public function delete(Admin $admin)
    {
        if($admin->delete()) {
            flash()->warning("Admin Deleted Successfully");
            AdminLog::createRecord("delete", $admin);
            return true;
        }else {
            flash()->error("Error Deleting Admin");
            return false;
        }
    }
}