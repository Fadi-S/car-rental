<?php

use Illuminate\Database\Seeder;

class CarEditionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\CarEdition\CarEdition::create(["name" => "Base"]);
        \App\Models\CarEdition\CarEdition::create(["name" => "Mid"]);
        \App\Models\CarEdition\CarEdition::create(["name" => "High"]);
        \App\Models\CarEdition\CarEdition::create(["name" => "Top Line"]);
    }
}
