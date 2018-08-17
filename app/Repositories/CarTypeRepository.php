<?php

namespace App\Repositories;

use App\Models\AdminLog\AdminLog;
use App\Models\CarType\CarType;
use Illuminate\Http\Request;

class CarTypeRepository
{
    public function create(Request $request)
    {
        $type = CarType::create($request->all());
        if (!is_null($type)) {
            AdminLog::createRecord("add", $type);
            flash()->success("Type Created Successfully");
        } else {
            flash()->error("Error Creating Type!")->important();
        }
        return $type;
    }

    public function update(Request $request, CarType $type)
    {
        if (!AdminLog::createRecord("edit", $type, $request->keys(), $request->all())) {
            flash()->error("You didn't change anything!");
            return false;
        }

        if ($type->update($request->except("password")))
            flash()->success("Type Updated Successfully");
        else
            flash()->error("Error Updating Type!")->important();

        return true;
    }

    public function getAll($paginate = 100)
    {
        return CarType::paginate($paginate);
    }

    public function delete(CarType $type)
    {
        if($type->delete()) {
            flash()->warning("Type Deleted Successfully");
            AdminLog::createRecord("delete", $type);
            return true;
        }else {
            flash()->error("Error Deleting Type");
            return false;
        }
    }
}