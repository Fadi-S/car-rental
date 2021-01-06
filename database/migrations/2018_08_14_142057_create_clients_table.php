<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("serial")->unique();
            $table->string("email")->unique();
            $table->string("name");
            $table->string("username")->unique();
            $table->string("phone")->nullable();
            $table->text("note")->nullable();
            $table->text("password")->nullable();
            $table->text("picture")->nullable();
            $table->integer("location_id")->nullable();
            $table->integer("area_id")->nullable();
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
