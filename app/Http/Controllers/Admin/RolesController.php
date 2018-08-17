<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\RoleRequest;
use App\Models\Role\Role;
use App\Http\Controllers\Controller;
use App\Repositories\RoleRepository;

class RolesController extends Controller
{
    private $roleRepo;
    private $adminUrl;

    public function __construct(RoleRepository $roleRepo)
    {
        $this->roleRepo = $roleRepo;
        $this->adminUrl = \Config::get("app.admin_url");
        $this->middleware("auth:admin");
        $this->middleware("permission:add_role", ['only' => "create"]);
        $this->middleware("permission:edit_role", ['only' => "edit"]);
        $this->middleware("permission:view_role", ['only' => ["show", "index"] ]);
    }

    public function index()
    {
        $roles = $this->roleRepo->getAll();
        return view('admin.roles.index', compact('roles'));
    }

    public function edit(Role $role)
    {
        return view('admin.roles.edit', compact('role'));
    }

    public function create()
    {
        return view('admin.roles.create');
    }

    public function store(RoleRequest $request)
    {
        $this->roleRepo->create($request);
        return redirect("$this->adminUrl/roles/create");
    }

    public function update(RoleRequest $request, Role $role)
    {
        $this->roleRepo->edit($request, $role);
        return redirect("$this->adminUrl/roles/$role->id/edit");
    }

    public function destroy(Role $role)
    {
        $this->roleRepo->delete($role);
        return redirect("$this->adminUrl/roles");
    }
}
