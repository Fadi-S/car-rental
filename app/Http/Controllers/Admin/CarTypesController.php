<?php

namespace App\Http\Controllers\Admin;

use App\Models\CarType\CarType;
use App\Repositories\CarTypeRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CarTypesController extends Controller
{
    private $typeRepo;
    private $adminUrl;

    public function __construct(CarTypeRepository $typeRepo)
    {
        $this->typeRepo = $typeRepo;
        $this->adminUrl = \Config::get("app.admin_url");
        $this->middleware("auth:admin");
        $this->middleware("permission:add_car", ['only' => "create"]);
        $this->middleware("permission:edit_car", ['only' => "edit"]);
        $this->middleware("permission:view_car", ['only' => ["show", "index"] ]);
    }

    public function index()
    {
        $types = $this->typeRepo->getAll();
        return view('admin.cars.types.index', compact('types'));
    }

    public function edit(CarType $type)
    {
        return view('admin.cars.types.edit', compact('type'));
    }

    public function create()
    {
        return view('admin.cars.types.create');
    }

    public function store(Request $request)
    {
        $this->typeRepo->create($request);
        return redirect("$this->adminUrl/types/create");
    }

    public function update(Request $request, CarType $type)
    {
        $this->typeRepo->update($request, $type);
        return redirect("$this->adminUrl/types/$type->id/edit");
    }

    public function destroy(CarType $type)
    {
        $this->typeRepo->delete($type);
        return redirect("$this->adminUrl/types");
    }
}
