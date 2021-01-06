<?php

namespace App\Http\Controllers\User;

use App\Models\Car\Car;
use App\Models\CarRequest\CarRequest;
use App\Models\CarSection\CarSection;
use App\Models\ClientArea\ClientArea;
use App\Models\Location\Location;
use App\Repositories\CarRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CarsController extends Controller
{
    private $carRepo;

    public function __construct(CarRepository $carRepository)
    {
        $this->carRepo = $carRepository;
        $this->middleware("auth")->only(["request", "showSellForm", "storeSellCar"]);
    }

    public function index(Request $request) {
        $cars = $this->carRepo->getAllForUser($request);

        return view("user.cars.index", compact("cars"));
    }

    public function show(Car $car)
    {
        $car->views = $car->views + 1;
        $car->save();
        $sections = CarSection::all();
        $locations = array_merge(["0" => "-"], Location::pluck("name", "id")->toArray());
        $areas = array_merge(["0" => "-"], ClientArea::pluck("name", "id")->toArray());
        $request = $car->requests()->where("client_id", auth()->id());
        return view("user.cars.show", compact("car", "sections", "locations", "areas", "request"));
    }

    public function request(Request $request, Car $car)
    {
        if($request->cancel) {
            $car->requests()->where("client_id", auth()->id())->delete();
            flash()->success("Request Canceled Successfully!");
            return redirect()->back();
        }
        $request->validate([
            "location_id" => "notIn:0",
            "area_id" => "notIn:0",
        ]);

        $user = auth()->user();
        if($user->location_id == null && $request->has("location_id"))
            $user->location_id = $request->location_id;

        if($user->phone == null && $request->has("phone"))
            $user->phone = $request->phone;

        if($user->area_id == null && $request->has("area_id"))
            $user->area_id = $request->area_id;

        $user->save();

        CarRequest::create([
            "car_id" => $car->id,
            "client_id" => $user->id,
            "message" => $request->message
        ]);

        flash()->success("Request Submitted Successfully!");
        return redirect()->back();
    }

    public function showSellForm()
    {
        return view("user.cars.sell");
    }

    public function storeSellCar(Request $request)
    {
        $request->validate([
            "fields.category_id" => "required|numeric|notIn:0",

            "fields.edition_id" => "required|numeric|notIn:0",

            "fields.type_id" => "required|numeric|notIn:0",

            "fields.octane_id" => "required|numeric|notIn:0",

            "fields.location_id" => "required|numeric|notIn:0",

            "fields.price" => "required|numeric",

            "cover" => "image",
        ]);

        $this->carRepo->userCreate($request);
        return redirect()->back();
    }
}
