<?php

use Illuminate\Database\Seeder;

class StatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Status\Status::create(["name"=>"Approved", "color"=>"#5fbeaa"]);
        \App\Models\Status\Status::create(["name"=>"Pending", "color"=>"#ffbd4a"]);
        \App\Models\Status\Status::create(["name"=>"Sold", "color"=>"#f05050"]);
    }
}
