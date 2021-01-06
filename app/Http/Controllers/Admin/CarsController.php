<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\CarRequest\CreateCarRequest;
use App\Http\Requests\CarRequest\EditCarRequest;
use App\Models\Car\Car;
use App\Repositories\CarRepository;
use App\Http\Controllers\Controller;

class CarsController extends Controller
{
    private $carRepo;
    private $adminUrl;

    public function __construct(CarRepository $carRepo)
    {
        $this->middleware("permission:add_car", ['only' => "create"]);
        $this->middleware("permission:edit_car", ['only' => "edit"]);
        $this->middleware("permission:view_car", ['only' => ["show", "index"] ]);

        $this->carRepo = $carRepo;
        $this->adminUrl = \Config::get("app.admin_url");
    }

    public function index()
    {
        $cars = $this->carRepo->getAll();
        return view("admin.cars.index", compact("cars"));
    }

    public function create()
    {
        return view("admin.cars.create");
    }

    public function store(CreateCarRequest $request)
    {
        $car = $this->carRepo->create($request);

        return redirect($this->adminUrl . "/cars/$car->id/edit");
    }

    public function show(Car $car)
    {
        return view("admin.cars.show", compact("car"));
    }

    public function edit(Car $car)
    {
        return view("admin.cars.edit", compact("car"));
    }

    public function update(EditCarRequest $request, Car $car)
    {
        $this->carRepo->update($request, $car);

        return redirect($this->adminUrl . "/cars/$car->id/edit");
    }

    public function destroy(Car $car)
    {
        $this->carRepo->delete($car);

        return redirect($this->adminUrl . "/cars");
    }

}
