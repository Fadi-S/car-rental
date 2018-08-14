<?php

use Illuminate\Database\Seeder;

class LocationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Location\Location::create(["name" => "Cairo"]);
        \App\Models\Location\Location::create(["name" => "Alexandria"]);
    }
}
