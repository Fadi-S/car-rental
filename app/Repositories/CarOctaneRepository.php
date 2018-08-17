<?php

namespace App\Repositories;

use App\Models\AdminLog\AdminLog;
use App\Models\CarOctane\CarOctane;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CarOctaneRepository
{
    public function create(Request $request)
    {
        $request->validate([
            'name' => "required|unique:car_octanes",
        ]);
        $octane = CarOctane::create($request->all());
        if (!is_null($octane)) {
            AdminLog::createRecord("add", $octane);
            flash()->success("Octane Created Successfully");
        } else {
            flash()->error("Error Creating Octane!")->important();
        }
        return $octane;
    }

    public function update(Request $request, CarOctane $octane)
    {
        $request->validate([
            'name' => [
                "required",
                Rule::unique('car_octanes')->ignore($octane->id)
            ],
        ]);
        if (!AdminLog::createRecord("edit", $octane, $request->keys(), $request->all())) {
            flash()->error("You didn't change anything!");
            return false;
        }

        if ($octane->update($request->except("password")))
            flash()->success("Octane Updated Successfully");
        else
            flash()->error("Error Updating Octane!")->important();

        return true;
    }

    public function getAll($paginate = 100)
    {
        return CarOctane::paginate($paginate);
    }

    public function delete(CarOctane $octane)
    {
        if($octane->delete()) {
            flash()->warning("Octane Deleted Successfully");
            AdminLog::createRecord("delete", $octane);
            return true;
        }else {
            flash()->error("Error Deleting Octane");
            return false;
        }
    }
}