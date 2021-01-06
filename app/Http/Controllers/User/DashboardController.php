<?php

namespace App\Http\Controllers\User;

use App\Models\Car\Car;
use App\Http\Controllers\Controller;
use App\Models\Contact\Contact;
use App\Repositories\CarRepository;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    private $carRepo;

    public function __construct(CarRepository $carRepository)
    {
        $this->carRepo = $carRepository;
    }

    public function index()
    {
        $cars = $this->carRepo->getAllForUser();
        return view("user.index", compact("cars"));
    }

    public function about()
    {
        return view("user.about");
    }

    public function contact()
    {
        return view("user.contact");
    }

    public function saveContact(Request $request)
    {
        Contact::create($request->all());
        flash()->success("Message Sent Successfully");
        return redirect("contact");
    }

    public function terms()
    {
        return view("user.terms");
    }
}
