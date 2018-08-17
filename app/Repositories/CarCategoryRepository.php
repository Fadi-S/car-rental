<?php

namespace App\Repositories;

use App\Models\AdminLog\AdminLog;
use App\Models\CarCategory\CarCategory;
use Illuminate\Http\Request;

class CarCategoryRepository
{
    public function create(Request $request)
    {
        $category = CarCategory::create($request->all());
        if (!is_null($category)) {
            AdminLog::createRecord("add", $category);
            flash()->success("Category Created Successfully");
        } else {
            flash()->error("Error Creating Category!")->important();
        }
        return $category;
    }

    public function update(Request $request, CarCategory $category)
    {
        if (!AdminLog::createRecord("edit", $category, $request->keys(), $request->all())) {
            flash()->error("You didn't change anything!");
            return false;
        }

        if ($category->update($request->except("password")))
            flash()->success("Category Updated Successfully");
        else
            flash()->error("Error Updating Category!")->important();

        return true;
    }

    public function getAll($paginate = 100)
    {
        return CarCategory::paginate($paginate);
    }

    public function delete(CarCategory $category)
    {
        if($category->delete()) {
            flash()->warning("Car Category Deleted Successfully");
            AdminLog::createRecord("delete", $category);
            return true;
        }else {
            flash()->error("Error Deleting Category");
            return false;
        }
    }
}