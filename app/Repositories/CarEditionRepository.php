<?php

namespace App\Repositories;

use App\Models\AdminLog\AdminLog;
use App\Models\CarEdition\CarEdition;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CarEditionRepository
{
    public function create(Request $request)
    {
        $request->validate([
            'name' => "required|unique:car_editions",
        ]);
        $edition = CarEdition::create($request->all());
        if (!is_null($edition)) {
            AdminLog::createRecord("add", $edition);
            flash()->success("Edition Created Successfully");
        } else {
            flash()->error("Error Creating Edition!")->important();
        }
        return $edition;
    }

    public function update(Request $request, CarEdition $edition)
    {
        $request->validate([
            'name' => [
                "required",
                Rule::unique('car_editions')->ignore($edition->id)
            ],
        ]);
        if (!AdminLog::createRecord("edit", $edition, $request->keys(), $request->all())) {
            flash()->error("You didn't change anything!");
            return false;
        }

        if ($edition->update($request->except("password")))
            flash()->success("Edition Updated Successfully");
        else
            flash()->error("Error Updating Edition!")->important();

        return true;
    }

    public function getAll($paginate = 100)
    {
        return CarEdition::paginate($paginate);
    }

    public function delete(CarEdition $edition)
    {
        if($edition->delete()) {
            flash()->warning("Edition Deleted Successfully");
            AdminLog::createRecord("delete", $edition);
            return true;
        }else {
            flash()->error("Error Deleting Edition");
            return false;
        }
    }
}