<?php

use Illuminate\Database\Seeder;

class ClientAreasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\ClientArea\ClientArea::create(["name" => "Agami"]);
        \App\Models\ClientArea\ClientArea::create(["name" => "Roshdi"]);
    }
}
