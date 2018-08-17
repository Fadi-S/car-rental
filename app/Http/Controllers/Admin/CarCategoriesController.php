<?php

namespace App\Http\Controllers\Admin;

use App\Models\CarCategory\CarCategory;
use App\Repositories\CarCategoryRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CarCategoriesController extends Controller
{
    private $categoryRepo;
    private $adminUrl;

    public function __construct(CarCategoryRepository $categoryRepo)
    {
        $this->categoryRepo = $categoryRepo;
        $this->adminUrl = \Config::get("app.admin_url");
        $this->middleware("auth:admin");
        $this->middleware("permission:add_car", ['only' => "create"]);
        $this->middleware("permission:edit_car", ['only' => "edit"]);
        $this->middleware("permission:view_car", ['only' => ["show", "index"] ]);
    }

    public function index()
    {
        $categories = $this->categoryRepo->getAll();
        return view('admin.cars.categories.index', compact('categories'));
    }

    public function edit(CarCategory $category)
    {
        return view('admin.cars.categories.edit', compact('category'));
    }

    public function create()
    {
        return view('admin.cars.categories.create');
    }

    public function store(Request $request)
    {
        $this->categoryRepo->create($request);
        return redirect("$this->adminUrl/categories/create");
    }

    public function update(Request $request, CarCategory $category)
    {
        $this->categoryRepo->update($request, $category);
        return redirect("$this->adminUrl/categories/$category->id/edit");
    }

    public function destroy(CarCategory $category)
    {
        $this->categoryRepo->delete($category);
        return redirect("$this->adminUrl/categories");
    }
}
