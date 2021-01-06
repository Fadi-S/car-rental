<?php

namespace App\Repositories;


use App\Models\AdminLog\AdminLog;
use App\Models\CarSection\CarSection;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CarSectionRepository
{
    public function create(Request $request)
    {
        $request->validate([
            'name' => "required|unique:car_sections",
        ]);
        $section = CarSection::create($request->all());
        if (!is_null($section)) {
            AdminLog::createRecord("add", $section);
            flash()->success("Section Created Successfully");
        } else {
            flash()->error("Error Creating Section!")->important();
        }
        return $section;
    }

    public function update(Request $request, CarSection $section)
    {
        $request->validate([
            'name' => [
                "required",
                Rule::unique('car_sections')->ignore($section->id)
            ],
        ]);

        if (!AdminLog::createRecord("edit", $section, $request->keys(), $request->all())) {
            flash()->error("You didn't change anything!");
            return false;
        }

        if ($section->update($request->except("password")))
            flash()->success("Section Updated Successfully");
        else
            flash()->error("Error Updating Section!")->important();

        return true;
    }

    public function getAll($paginate = 100)
    {
        return CarSection::paginate($paginate);
    }

    public function delete(CarSection $section)
    {
        if($section->delete()) {
            flash()->warning("Section Deleted Successfully");
            AdminLog::createRecord("delete", $section);
            return true;
        }else {
            flash()->error("Error Deleting Section");
            return false;
        }
    }
}