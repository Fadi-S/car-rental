<?php

use Illuminate\Database\Seeder;

class AdminsTableSeeder extends Seeder
{
    public function run()
    {
        \App\Models\Admin\Admin::create([
            "name" => \Illuminate\Support\Facades\Config::get("app.default_admin"),
            "username" => "administrator",
            "email" => "admin@email.com",
            "password" => " 12345",
            "phone" => "01111111111",
            "role_id" => \App\Models\Role\Role::first()->id,
            "location_id" => \App\Models\Location\Location::first()->id,
        ]);
    }
}
