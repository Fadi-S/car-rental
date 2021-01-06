<?php

namespace App\Repositories;

use App\Http\Requests\CarRequest\CreateCarRequest;
use App\Http\Requests\CarRequest\EditCarRequest;
use App\Models\AdminLog\AdminLog;
use App\Models\Car\Car;
use App\Models\CarField\CarField;
use App\Models\Status\Status;
use Illuminate\Http\Request;

class CarRepository
{

    public function getAll($pagination = 100)
    {
        return Car::paginate($pagination);
    }

    public function getAllForUser(Request $request = null, $pagination = 9)
    {
        $cars = Car::where("status_id", Status::where("name", "Approved")->first()->id);

        if($request) {
            foreach($request->keys() as $filter) {
                if($request[$filter] != null && $request[$filter] != "" && $request[$filter] != 0) {
                    if($filter != "highest_price" || $filter != "lowest_price") {
                        $cars->whereHas("fields", function($query) use($filter, $request) {
                            return $query->where("name", $filter)->whereValue($request[$filter]);
                        });
                    }
                }
            }

            $cars->whereHas("fields", function($query) use($request) {
                if($request->lowest_price && $request->highest_price)
                    $query->where("name", "price")->whereBetween("value", [$request->lowest_price, $request->highest_price]);
                else {
                    if ($request->lowest_price)
                        $query->where("name", "price")->where("value", ">=", $request->lowest_price);
                    if ($request->highest_price)
                        $query->where("name", "price")->where("value", "<=", $request->highest_price);
                }
            });
        }

        return $cars->paginate($pagination);
    }

    public function create(CreateCarRequest $request)
    {
        $request['images'] = $this->uploadImages($request);

        $request->request->set("serial", Car::max("serial") + 1);


        if($request->hasFile("coverImage")) {
            $file = $request->file("coverImage");

            $image = str_random(60) . '.' . $file->extension();

            $file->storeAs('public/photos/cars' , $image);

            $request->request->set("cover", $image);
        }

        $car = Car::create($request->all());

        $car->admin_id = auth("admin")->id();
        $car->save();

        if (!is_null($car))
        {
            $this->attachFields($request, $car);

            $this->attachImages($car, $request);

            AdminLog::createRecord("add", $car);
            flash()->success("Car Created Successfully");

        } else {
            flash()->error("Error Creating Car!")->important();
        }
        return $car;
    }

    private function attachFields(Request $request, Car $car)
    {
        $finalKeys = CarField::get(["name", "id"]);
        $fields = $request->get("fields");

        foreach($finalKeys as $key) {
            $id = $key->id;
            $name = $key->name;
            if(in_array($name, Car::$excluded)) {
                if($fields[$name] != "") {
                    $value = $fields[$name];
                    $car->fields()->detach($id);
                    $car->fields()->attach($id, ["value" => $value]);
                }

            }else if($request->get($id . "__checkbox") == "1") {

                if($fields[$name] != "")
                    $value = $fields[$name];
                else
                    $value = "Yes";

                $car->fields()->detach($id);
                $car->fields()->attach($id, ["value" => $value]);
            }

        }
    }

    public function update(EditCarRequest $request, Car $car)
    {
        $request['images'] = $this->uploadImages($request);

        if($request->hasFile("coverImage")) {
            $file = $request->file("coverImage");

            $image = str_random(60) . '.' . $file->extension();

            $file->storeAs('public/photos/cars' , $image);

            $request->request->set("cover", $image);
        }

        if($car->creator == null) {
            $car->admin_id = auth("admin")->id();
            $car->save();
        }

        if ($car->update($request->all()))
        {
            $this->attachFields($request, $car);
            $this->attachImages($car , $request);

            AdminLog::createRecord("edit", $car, $request->keys(), $request->all(), ["name" => "fields"]);

            flash()->success("Car Updated Successfully");
        }
        else
        {
            flash()->error("Error Updating Car!")->important();
        }

        return true;
    }

    public function userCreate(Request $request)
    {
        $request['images'] = $this->uploadImages($request);

        $request->request->set("serial", Car::max("serial") + 1);

        if($request->hasFile("coverImage")) {
            $file = $request->file("coverImage");

            $image = str_random(60) . '.' . $file->extension();

            $file->storeAs('public/photos/cars' , $image);

            $request->request->set("cover", $image);
        }

        $request->request->set("status_id", Status::where("name", "Pending")->first()->id);
        $request->request->set("client_id", auth()->id());

        $user = auth()->user();
        if($user->location_id == null && $request->has("location_id"))
            $user->location_id = $request->location_id;

        if($user->phone == null && $request->has("phone"))
            $user->phone = $request->phone;

        $user->save();

        $car = Car::create($request->all());

        if (!is_null($car))
        {
            $finalKeys = CarField::get(["name", "id"]);
            $fields = $request->get("fields");

            foreach($finalKeys as $key) {
                $id = $key->id;
                $name = $key->name;
                if(in_array($name, Car::$excluded)) {
                    if($fields[$name] != "") {
                        $value = $fields[$name];
                        $car->fields()->detach($id);
                        $car->fields()->attach($id, ["value" => $value]);
                    }

                }else {

                    if($fields[$name] != "") {
                        $value = $fields[$name];
                        $car->fields()->detach($id);
                        $car->fields()->attach($id, ["value" => $value]);
                    }
                }
            }

            $this->attachImages($car, $request);

            flash()->success("Car Added Successfully");

        } else
            flash()->error("Error Adding Car!")->important();

        return $car;
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
            if($request['images'])
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