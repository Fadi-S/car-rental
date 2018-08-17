<?php

namespace App\Http\Controllers\Admin;

use App\Models\CarOctane\CarOctane;
use App\Repositories\CarOctaneRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CarOctanesController extends Controller
{
    private $octaneRepo;
    private $adminUrl;

    public function __construct(CarOctaneRepository $octaneRepo)
    {
        $this->octaneRepo = $octaneRepo;
        $this->adminUrl = \Config::get("app.admin_url");
        $this->middleware("auth:admin");
        $this->middleware("permission:add_car", ['only' => "create"]);
        $this->middleware("permission:edit_car", ['only' => "edit"]);
        $this->middleware("permission:view_car", ['only' => ["show", "index"] ]);
    }

    public function index()
    {
        $octanes = $this->octaneRepo->getAll();
        return view('admin.cars.octanes.index', compact('octanes'));
    }

    public function edit(CarOctane $octane)
    {
        return view('admin.cars.octanes.edit', compact('octane'));
    }

    public function create()
    {
        return view('admin.cars.octanes.create');
    }

    public function store(Request $request)
    {
        $this->octaneRepo->create($request);
        return redirect("$this->adminUrl/octanes/create");
    }

    public function update(Request $request, CarOctane $octane)
    {
        $this->octaneRepo->update($request, $octane);
        return redirect("$this->adminUrl/octanes/$octane->id/edit");
    }

    public function destroy(CarOctane $octane)
    {
        $this->octaneRepo->delete($octane);
        return redirect("$this->adminUrl/octanes");
    }
}
