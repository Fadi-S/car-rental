<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class NavigationServiceProvider extends ServiceProvider
{

    public function boot()
    {
        $this->adminMasterViewComposer();
    }

    public function adminMasterViewComposer()
    {
        view()->composer("admin.*", function($view) {
            $view->with([
                'adminUrl' => \Config::get("app.admin_url"),
            ]);
        });
    }

    public function register() {}
}
