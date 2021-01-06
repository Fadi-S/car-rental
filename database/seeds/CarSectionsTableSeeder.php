<?php

use Illuminate\Database\Seeder;

class CarSectionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\CarSection\CarSection::create(["name" => "Information"]);
        \App\Models\CarSection\CarSection::create(["name" => "Safety"]);
        \App\Models\CarSection\CarSection::create(["name" => "Options"]);
        \App\Models\CarSection\CarSection::create(["name" => "Luxury Options"]);
    }
}
