<?php

namespace App\Providers;

use App\Models\Car\Car;
use App\Models\CarCategory\CarCategory;
use App\Models\CarEdition\CarEdition;
use App\Models\CarOctane\CarOctane;
use App\Models\CarType\CarType;
use App\Models\Location\Location;
use Illuminate\Support\ServiceProvider;

class NavigationServiceProvider extends ServiceProvider
{

    public function boot()
    {
        $this->adminMasterViewComposer();
        $this->adminUrlComposer();
        $this->adminCarFormViewComposer();
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
                'fields' => array_diff(\Schema::getColumnListing("cars"), Car::$excluded, ["id"]) ,
            ]);
        });
    }

    public function register() {}
}