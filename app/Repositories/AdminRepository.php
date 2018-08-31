<?php

namespace App\Repositories;

use App\Http\Requests\AdminRequest\CreateAdminRequest;
use App\Http\Requests\AdminRequest\EditAdminRequest;
use App\Models\Admin\Admin;
use App\Models\AdminLog\AdminLog;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminRepository
{
    public function create(CreateAdminRequest $request)
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

    public function update(EditAdminRequest $request, Admin $admin)
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

    public function changePassword(Request $request, Admin $admin)
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|confirmed|min:6'
        ]);

        if(\Hash::check($request->old_password, $admin->password)) {
            $admin->password = $request->new_password;
            $admin->save();

            flash()->success("Password Changed Successfully");
            return true;
        }else{
            flash()->error("Old Password doesn't match!")->important();
            return false;
        }
    }

    public function getActivities($paginate = 100)
    {
        return AdminLog::orderBy("done_at", 'desc')->paginate($paginate);
    }

    public function restoreActivity(AdminLog $activity)
    {
        if($activity->action() == "delete") {
            $activity->logged()->restore();
            AdminLog::createRecord("restore", $activity->logged());
            $activity->restored_at = Carbon::now();
            $activity->save();
            flash()->success($activity->humanReadableType() . ": " . $activity->logged()->name . " was restored successfully");
        }
    }
}