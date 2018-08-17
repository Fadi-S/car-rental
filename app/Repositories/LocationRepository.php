<?php

namespace App\Repositories;

use App\Models\AdminLog\AdminLog;
use App\Models\Location\Location;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class LocationRepository
{
    public function create(Request $request)
    {
        $request->validate([
            'name' => "required|unique:locations",
        ]);
        $location = Location::create($request->all());
        if (!is_null($location)) {
            AdminLog::createRecord("add", $location);
            flash()->success("Location Created Successfully");
        } else {
            flash()->error("Error Creating Location!")->important();
        }
        return $location;
    }

    public function update(Request $request, Location $location)
    {
        $request->validate([
            'name' => [
                "required",
                Rule::unique('locations')->ignore($location->id)
            ],
        ]);
        if (!AdminLog::createRecord("edit", $location, $request->keys(), $request->all())) {
            flash()->error("You didn't change anything!");
            return false;
        }

        if ($location->update($request->except("password")))
            flash()->success("Location Updated Successfully");
        else
            flash()->error("Error Updating Location!")->important();

        return true;
    }

    public function getAll($paginate = 100)
    {
        return Location::paginate($paginate);
    }

    public function delete(Location $location)
    {
        if($location->delete()) {
            flash()->warning("Location Deleted Successfully");
            AdminLog::createRecord("delete", $location);
            return true;
        }else {
            flash()->error("Error Deleting Location");
            return false;
        }
    }
}