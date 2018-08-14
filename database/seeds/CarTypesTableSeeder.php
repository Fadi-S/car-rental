<?php

use Illuminate\Database\Seeder;

class CarTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\CarType\CarType::create(["name" => "Sedan"]);
        \App\Models\CarType\CarType::create(["name" => "Cross Over"]);
        \App\Models\CarType\CarType::create(["name" => "SUV"]);
        \App\Models\CarType\CarType::create(["name" => "Hatch Back"]);
        \App\Models\CarType\CarType::create(["name" => "Coupe"]);
        \App\Models\CarType\CarType::create(["name" => "7 seats"]);
        \App\Models\CarType\CarType::create(["name" => "Truck"]);
    }
}
