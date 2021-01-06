<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCarFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('car_fields', function (Blueprint $table) {
            $table->increments('id');
            $table->string("name")->unique();
            $table->integer("section_id");
            $table->timestamps();
        });

        Schema::create('car_field', function (Blueprint $table) {
            $table->integer('car_id');
            $table->integer('field_id');
            $table->text("value");
            $table->primary(['car_id', 'field_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('car_fields');
        Schema::dropIfExists('car_field');
    }
}
