<?php

use Illuminate\Database\Seeder;

class CarOctaneTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\CarOctane\CarOctane::create(["name" => "80"]);
        \App\Models\CarOctane\CarOctane::create(["name" => "90"]);
        \App\Models\CarOctane\CarOctane::create(["name" => "92"]);
        \App\Models\CarOctane\CarOctane::create(["name" => "Diesel"]);
    }
}
