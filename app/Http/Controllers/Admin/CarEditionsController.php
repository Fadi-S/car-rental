<?php

namespace App\Http\Controllers\Admin;

use App\Models\CarEdition\CarEdition;
use App\Repositories\CarEditionRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CarEditionsController extends Controller
{
    private $editionRepo;
    private $adminUrl;

    public function __construct(CarEditionRepository $editionRepo)
    {
        $this->editionRepo = $editionRepo;
        $this->adminUrl = \Config::get("app.admin_url");
        $this->middleware("permission:add_car", ['only' => "create"]);
        $this->middleware("permission:edit_car", ['only' => "edit"]);
        $this->middleware("permission:view_car", ['only' => ["show", "index"] ]);
    }

    public function index()
    {
        $editions = $this->editionRepo->getAll();
        return view('admin.cars.editions.index', compact('editions'));
    }

    public function edit(CarEdition $edition)
    {
        return view('admin.cars.editions.edit', compact('edition'));
    }

    public function create()
    {
        return view('admin.cars.editions.create');
    }

    public function store(Request $request)
    {
        $this->editionRepo->create($request);
        return redirect("$this->adminUrl/editions/create");
    }

    public function update(Request $request, CarEdition $edition)
    {
        $this->editionRepo->update($request, $edition);
        return redirect("$this->adminUrl/editions/$edition->id/edit");
    }

    public function destroy(CarEdition $edition)
    {
        $this->editionRepo->delete($edition);
        return redirect("$this->adminUrl/editions");
    }
}
