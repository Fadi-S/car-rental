<?php

use Illuminate\Database\Seeder;

class CarCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\CarCategory\CarCategory::create(["name" => "Petrol"]);
        \App\Models\CarCategory\CarCategory::create(["name" => "Hybrid"]);
        \App\Models\CarCategory\CarCategory::create(["name" => "Electric"]);
    }
}
