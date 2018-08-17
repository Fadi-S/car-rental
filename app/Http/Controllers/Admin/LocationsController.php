<?php

namespace App\Http\Controllers\Admin;

use App\Models\Location\Location;
use App\Repositories\LocationRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LocationsController extends Controller
{
    private $locationRepo;
    private $adminUrl;

    public function __construct(LocationRepository $locationRepo)
    {
        $this->locationRepo = $locationRepo;
        $this->adminUrl = \Config::get("app.admin_url");
    }

    public function index()
    {
        $locations = $this->locationRepo->getAll();
        return view('admin.locations.index', compact('locations'));
    }

    public function edit(Location $location)
    {
        return view('admin.locations.edit', compact('location'));
    }

    public function create()
    {
        return view('admin.locations.create');
    }

    public function store(Request $request)
    {
        $this->locationRepo->create($request);
        return redirect("$this->adminUrl/locations/create");
    }

    public function update(Request $request, Location $location)
    {
        $this->locationRepo->update($request, $location);
        return redirect("$this->adminUrl/locations/$location->id/edit");
    }

    public function destroy(Location $location)
    {
        $this->locationRepo->delete($location);
        return redirect("$this->adminUrl/locations");
    }
}
