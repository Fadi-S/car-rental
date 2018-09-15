<?php

namespace App\Repositories;

use App\Http\Requests\CarRequest\CreateCarRequest;
use App\Http\Requests\CarRequest\EditCarRequest;
use App\Models\AdminLog\AdminLog;
use App\Models\Car\Car;
use Illuminate\Http\Request;

class CarRepository
{

    public function getAll($pagination = 100)
    {
        return Car::paginate($pagination);
    }

    public function create(CreateCarRequest $request)
    {
        $request['images'] = $this->uploadImages($request);

        if($request->hasFile("coverImage"))
            $request->request->set("cover", $request->file("coverImage")->store("public/photos/cars"));

        $car = Car::create($this->getValues($request));

        if (!is_null($car)) 
        {
            $this->attachImages($car, $request);

            AdminLog::createRecord("add", $car);
            flash()->success("Car Created Successfully");

        } else {
            flash()->error("Error Creating Car!")->important();
        }
        return $car;
    }

    private function getValues(Request $request)
    {
        $finalKeys = array_diff(\Schema::getColumnListing("cars"), Car::$excluded, ["id"]);
        $values = [];
        foreach($finalKeys as $key) {
            if($request->get($key . "__checkbox") == "1") {

                if($request->get($key) != "")
                    $values[$key] = $request->get($key);
                else
                    $values[$key] = "Yes";

            }else{
                $values[$key] = null;
            }
        }
        return array_merge($request->only(Car::$excluded), $values);
    }

    public function update(EditCarRequest $request, Car $car)
    {
        $request['images'] = $this->uploadImages($request);

        if($request->hasFile("coverImage"))
            $request->request->set("cover", $request->file("coverImage")->store("public/photos"));

        $values = $this->getValues($request);
        AdminLog::createRecord("edit", $car, $request->keys(), $values);

        if ($car->update($values))
        {   
            $this->attachImages($car , $request);
            flash()->success("Car Updated Successfully");
        }
        else
        {
            flash()->error("Error Updating Car!")->important();
        }

        return true;
    }

    private function uploadImages(Request $request)
    {
        $images = [];

        if($request->hasFile('files'))
        {
            foreach($request['files'] as $file)
            {
                $image = str_random(60) . '.' . $file->extension();

                $file->storeAs('public/photos/cars' , $image);

                $images[] = $image;
            }
        }

        return $images;
    }

    /**
     * Attach images to car
     * @param Car $car
     * @param Request $request
     */
    private function attachImages(Car $car , Request $request)
    {
        if(array_key_exists('images' , $request->all()))
        {
            $car->images()->delete();
            foreach($request['images'] as $image)
            {
                $car->images()->create([
                    'path' => $image
                ]);
            }
        }
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