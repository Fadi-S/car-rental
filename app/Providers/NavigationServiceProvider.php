<?php

namespace App\Providers;

use App\Models\Car\Car;
use App\Models\CarCategory\CarCategory;
use App\Models\CarEdition\CarEdition;
use App\Models\CarField\CarField;
use App\Models\CarOctane\CarOctane;
use App\Models\CarSection\CarSection;
use App\Models\CarType\CarType;
use App\Models\Client\Client;
use App\Models\ClientArea\ClientArea;
use App\Models\Location\Location;
use App\Models\Permission\Permission;
use App\Models\Role\Role;
use App\Models\Status\Status;
use Illuminate\Support\ServiceProvider;

class NavigationServiceProvider extends ServiceProvider
{

    public function boot()
    {
        $this->adminMasterViewComposer();
        $this->adminUrlComposer();
        $this->adminCarFormViewComposer();
        $this->adminAdminsFormViewComposer();
        $this->adminRolesFormViewComposer();
        $this->adminClientsFormViewComposer();
        $this->adminCarShowViewComposer();
        $this->userMostViewedViewComposer();
        $this->userSellCarFormViewComposer();
        $this->userSearchCarViewComposer();
    }

    public function adminUrlComposer()
    {
        view()->composer("admin.*", function($view) {
            $view->with([
                'adminUrl' => \Config::get("app.admin_url"),
            ]);
        });
    }

    public function adminMasterViewComposer()
    {
        view()->composer("admin.master", function($view) {
            $view->with([
                'currentAdmin' => auth()->guard("admin")->user(),
            ]);
        });
    }

    public function adminCarFormViewComposer()
    {
        view()->composer("admin.cars.form", function($view) {
            $view->with([
                'categories' => array_merge(["0" => "-"], CarCategory::pluck("name", "id")->toArray()),
                'locations' => array_merge(["0" => "-"], Location::pluck("name", "id")->toArray()),
                'types' => array_merge(["0" => "-"], CarType::pluck("name", "id")->toArray()),
                'editions' => array_merge(["0" => "-"], CarEdition::pluck("name", "id")->toArray()),
                'octanes' => array_merge(["0" => "-"], CarOctane::pluck("name", "id")->toArray()),
                'clients' => array_merge(["0" => "-"], Client::pluck("name", "id")->toArray()),
                'statuses' => array_merge(["0" => "-"], Status::pluck("name", "id")->toArray()),
                'sections' => CarSection::all()
            ]);
        });
    }

    public function adminCarShowViewComposer()
    {
        view()->composer("admin.cars.show", function($view) {
            $view->with([
                'sections' => CarSection::all()
            ]);
        });
    }

    public function adminRolesFormViewComposer()
    {
        view()->composer('admin.roles.form', function ($view) {
            $view->with([
                'groups' => Permission::groups()->toArray(),
                'admin' => auth()->guard("admin")->user()
            ]);
        });
    }

    public function adminAdminsFormViewComposer()
    {
        view()->composer("admin.admins.form", function($view) {
            $view->with([
                'roles' => array_merge(["0" => "-"], Role::pluck("name", "id")->toArray()),
                'locations' => array_merge(["0" => "-"], Location::pluck("name", "id")->toArray()),
            ]);
        });
    }

    public function adminClientsFormViewComposer()
    {
        view()->composer("admin.clients.form", function($view) {
            $view->with([
                'areas' => array_merge(["0" => "-"], ClientArea::pluck("name", "id")->toArray()),
                'locations' => array_merge(["0" => "-"], Location::pluck("name", "id")->toArray()),
            ]);
        });
    }

    public function userMostViewedViewComposer()
    {
        view()->composer("user.cars.mostViewed", function($view) {
            $view->with([
                'cars' => Car::where([["views", ">", 0], ["status_id", Status::where("name", "Approved")->first()->id]])->orderBy('views', 'desc')->take(3)->get()
            ]);
        });
    }

    public function userSellCarFormViewComposer()
    {
        view()->composer("user.cars.sell", function($view) {
            $view->with([
                'categories' => array_merge(["0" => "-"], CarCategory::pluck("name", "id")->toArray()),
                'locations' => array_merge(["0" => "-"], Location::pluck("name", "id")->toArray()),
                'types' => array_merge(["0" => "-"], CarType::pluck("name", "id")->toArray()),
                'editions' => array_merge(["0" => "-"], CarEdition::pluck("name", "id")->toArray()),
                'octanes' => array_merge(["0" => "-"], CarOctane::pluck("name", "id")->toArray()),
                'sections' => CarSection::all()
            ]);
        });
    }

    public function userSearchCarViewComposer()
    {
        view()->composer("user.cars.search", function($view) {
            $view->with([
                'categories' => array_merge(["0" => "-"], CarCategory::pluck("name", "id")->toArray()),
                'locations' => array_merge(["0" => "-"], Location::pluck("name", "id")->toArray()),
                'types' => array_merge(["0" => "-"], CarType::pluck("name", "id")->toArray()),
                'editions' => array_merge(["0" => "-"], CarEdition::pluck("name", "id")->toArray()),
                'octanes' => array_merge(["0" => "-"], CarOctane::pluck("name", "id")->toArray()),
            ]);
        });
    }

    public function register() {}
}
