<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\AdminRequest;
use App\Models\Admin\Admin;
use App\Models\AdminLog\AdminLog;
use App\Repositories\AdminRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminsController extends Controller
{
    private $adminRepo;
    private $adminUrl;

    public function __construct(AdminRepository $adminRepo)
    {
        $this->adminRepo = $adminRepo;
        $this->adminUrl = \Config::get("app.admin_url");
        $this->middleware("auth:admin");
        $this->middleware("permission:add_admin", ['only' => "create"]);
        $this->middleware("permission:edit_admin", ['only' => "edit"]);
        $this->middleware("permission:view_admin", ['only' => ["show", "index"] ]);
        $this->middleware("permission:activity_admin", ['only' => "showActivity"]);
    }

    public function index()
    {
        $admins = $this->adminRepo->getAll();
        return view('admin.admins.index', compact('admins'));
    }

    public function show(Admin $admin)
    {
        return view('admin.admins.show', compact('admin'));
    }

    public function edit(Admin $admin)
    {
        return view('admin.admins.edit', compact('admin'));
    }

    public function create()
    {
        return view('admin.admins.create');
    }

    public function store(AdminRequest $request)
    {
        $this->adminRepo->create($request);
        return redirect("$this->adminUrl/admins/create");
    }

    public function update(AdminRequest $request, Admin $admin)
    {
        $this->adminRepo->update($request, $admin);
        return redirect("$this->adminUrl/admins/$admin->username/edit");
    }

    public function destroy(Admin $admin)
    {
        $this->adminRepo->delete($admin);
        return redirect("$this->adminUrl/admins");
    }

    public function showChangePasswordForm()
    {
        return view("admin.admins.changePassword");
    }

    public function changePassword(Request $request)
    {
        $this->adminRepo->changePassword($request, auth()->guard("admin")->user());
        return redirect("$this->adminUrl/change-password");
    }

    public function showActivity()
    {
        $activities = $this->adminRepo->getActivities();
        $admin = auth()->guard("admin")->user();
        return view("admin.admins.activity", compact("activities", "admin"));
    }

    public function restoreActivity(AdminLog $activity)
    {
        $this->adminRepo->restoreActivity($activity);
        return redirect()->back();
    }
}
