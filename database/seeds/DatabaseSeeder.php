<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RolesTableSeeder::class);
        $this->call(LocationTableSeeder::class);
        $this->call(AdminsTableSeeder::class);

        $this->call(CarCategoriesTableSeeder::class);
        $this->call(CarTypesTableSeeder::class);
        $this->call(CarEditionsTableSeeder::class);
        $this->call(CarOctaneTableSeeder::class);
        $this->call(StatusTableSeeder::class);

        $this->call(ClientAreasTableSeeder::class);
    }
}
