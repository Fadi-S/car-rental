<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->increments('id');
            
            $table->text("make")->nullable();
            $table->text("model")->nullable();
            $table->text("year")->nullable();
            $table->text("kilometer")->nullable();
            $table->text("color")->nullable();
            $table->text("cc")->nullable();
            $table->text("cylinders")->nullable();
            $table->text("horse_power")->nullable();
            $table->text("torque")->nullable();
            $table->text("valves")->nullable();
            $table->text("turbo")->nullable();
            $table->text("auto_transmission")->nullable();
            $table->text("stop_start_engine")->nullable();
            $table->text("service_history")->nullable();
            $table->text("original_rims")->nullable();
            $table->text("first_owner")->nullable();
            $table->text("sensor_park_front")->nullable();
            $table->text("sensor_park_rear")->nullable();
            $table->text("air_condition")->nullable();
            $table->text("auto_dim_center_mirror")->nullable();
            $table->text("leather_seats")->nullable();
            $table->text("audio_radio_cd")->nullable();
            $table->text("audio_usb")->nullable();
            $table->text("m_function_steering_wheel")->nullable();
            $table->text("new_tires")->nullable();
            $table->text("paint_condition")->nullable();
            $table->text("xdrive_system")->nullable();
            $table->text("fog_light")->nullable();
            $table->text("electrical_trunk")->nullable();
            $table->text("light_sensor")->nullable();
            $table->text("immobilizer")->nullable();
            $table->text("sound_system_brand")->nullable();
            $table->text("center_lock")->nullable();
            $table->text("power_steering")->nullable();
            $table->text("electric_seats_with_massage")->nullable();
            $table->text("heads_up_display")->nullable();
            $table->text("touch_screen")->nullable();
            $table->text("original_tended_glass")->nullable();
            $table->text("convertible_roof")->nullable();
            $table->text("rear_air_condition")->nullable();
            $table->text("license_plat_number")->nullable();
            $table->text("trunk_capacity")->nullable();
            $table->text("chase_number")->nullable();
            $table->text("abs")->nullable();
            $table->text("ebd")->nullable();
            $table->text("esc")->nullable();
            $table->text("tc")->nullable();
            $table->text("break_assist")->nullable();
            $table->text("hill_assist")->nullable();
            $table->text("cruise_control")->nullable();
            $table->text("speed_limiter")->nullable();
            $table->text("air_bags")->nullable();
            $table->text("electric_seats")->nullable();
            $table->text("electric_seats_memory")->nullable();
            $table->text("day_running_lights")->nullable();
            $table->text("front_leds")->nullable();
            $table->text("back_leds")->nullable();
            $table->text("interior_ambient_light")->nullable();
            $table->text("manual_transmission")->nullable();
            $table->text("steptronic_transmission")->nullable();
            $table->text("zenon_lights")->nullable();
            $table->text("original_zenon_lights")->nullable();
            $table->text("rims_allow")->nullable();
            $table->text("rims_steel")->nullable();
            $table->text("rims_size")->nullable();
            $table->text("rear_cam")->nullable();
            $table->text("auto_park")->nullable();
            $table->text("air_condition_dual")->nullable();
            $table->text("side_mirror_electric")->nullable();
            $table->text("side_mirror_auto_folding")->nullable();
            $table->text("audio_aux")->nullable();
            $table->text("audio_bluetooth")->nullable();
            $table->text("run_flat_tiers")->nullable();
            $table->text("license_expiration")->nullable();
            $table->text("under_warranty")->nullable();
            $table->text("sun_roof")->nullable();
            $table->text("electrical_curtis")->nullable();
            $table->text("gps")->nullable();
            $table->text("rain_sensor")->nullable();
            $table->text("alarm_system")->nullable();
            $table->text("factory_paint_in")->nullable();
            $table->text("factory_paint_out")->nullable();
            $table->text("television")->nullable();
            $table->text("panoramic_sunroof")->nullable();
            $table->text("drive_system")->nullable();
            $table->text("body_condition")->nullable();
            $table->text("electric_windows")->nullable();
            $table->text("panoramic_roof")->nullable();
            $table->text("tires")->nullable();
            $table->text("blind_point_assistance")->nullable();
            $table->text("rear_power_outlet")->nullable();
            $table->text("trunk_power_outlet")->nullable();
            $table->text("motor_number")->nullable();

            $table->integer("category_id");
            $table->integer("type_id");
            $table->integer("edition_id");
            $table->integer("octane_id");
            $table->integer("location_id");
            $table->integer("client_id");
            $table->integer("status_id");
            $table->integer("price");

            $table->text("cover")->nullable();

            $table->timestamp("archived_at")->nullable();
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
        Schema::dropIfExists('cars');
    }
}
