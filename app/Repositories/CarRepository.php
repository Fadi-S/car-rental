<?php

namespace App\Repositories;

use App\Http\Requests\Admin\CarRequest;
use App\Models\AdminLog\AdminLog;
use App\Models\Car\Car;

class CarRepository
{

    public function getAll($pagination = 100)
    {
        return Car::paginate($pagination);
    }

    public function create(CarRequest $request)
    {
        $car = Car::create($this->getValues($request));

        if (!is_null($car)) {

            AdminLog::createRecord("add", $car);
            flash()->success("Car Created Successfully");

        } else {
            flash()->error("Error Creating Car!")->important();
        }
        return $car;
    }

    private function getValues(CarRequest $request)
    {
        $keys = $request->keys() - Car::$excluded;
        $finalKeys = [];
        foreach($keys as $key) {
            if(!str_contains($key, "__checkbox"))
                $finalKeys[] = $key;
        }

        $values = [];
        foreach($finalKeys as $key) {
            if($request->get($key . "__checkbox") == "1") {

                if($request->get($key) != "")
                    $values[$key] = $request->get($key);

            }
        }
        return array_merge($request->only(Car::$excluded), $values);
    }

    public function update(CarRequest $request, Car $car)
    {
        if (!AdminLog::createRecord("edit", $car, $request->keys(), $request->all())) {
            flash()->error("You didn't change anything!");
            return false;
        }


        if ($car->update($this->getValues($request)))
            flash()->success("Car Updated Successfully");
        else
            flash()->error("Error Updating Car!")->important();

        return true;
    }

    public function delete(Car $car)
    {
        if($car->delete()) {
            flash()->warning("Car Deleted Successfully");
            AdminLog::createRecord("delete", $car);
            return true;
        }else {
            flash()->error("Error Deleting Car")->important();
            return false;
        }
    }

}