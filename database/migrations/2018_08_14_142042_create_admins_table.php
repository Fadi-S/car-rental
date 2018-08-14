<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->increments('id');
            $table->string("email")->unique();
            $table->string("name")->unique();
            $table->string("username")->unique();
            $table->string("phone")->unique();
            $table->text("password");
            $table->string("department")->nullable();
            $table->text("picture")->nullable();
            $table->integer("role_id");
            $table->integer("location_id");
            $table->timestamp("archived_at")->nullable();
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
        Schema::dropIfExists('admins');
    }
}
