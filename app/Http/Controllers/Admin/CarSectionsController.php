<?php

namespace App\Http\Controllers\Admin;

use App\Models\CarSection\CarSection;
use App\Repositories\CarSectionRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CarSectionsController extends Controller
{
    private $sectionRepo;
    private $adminUrl;

    public function __construct(CarSectionRepository $sectionRepo)
    {
        $this->sectionRepo = $sectionRepo;
        $this->adminUrl = \Config::get("app.admin_url");
        $this->middleware("permission:add_car", ['only' => "create"]);
        $this->middleware("permission:edit_car", ['only' => "edit"]);
        $this->middleware("permission:view_car", ['only' => ["show", "index"] ]);
    }

    public function index()
    {
        $sections = $this->sectionRepo->getAll();
        return view('admin.cars.sections.index', compact('sections'));
    }

    public function edit(CarSection $section)
    {
        return view('admin.cars.sections.edit', compact('section'));
    }

    public function create()
    {
        return view('admin.cars.sections.create');
    }

    public function store(Request $request)
    {
        $this->sectionRepo->create($request);
        return redirect("$this->adminUrl/sections/create");
    }

    public function update(Request $request, CarSection $section)
    {
        $this->sectionRepo->update($request, $section);
        return redirect("$this->adminUrl/sections/$section->id/edit");
    }

    public function destroy(CarSection $section)
    {
        $this->sectionRepo->delete($section);
        return redirect("$this->adminUrl/sections");
    }
}
