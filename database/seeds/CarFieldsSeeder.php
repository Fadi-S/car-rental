<?php

use Illuminate\Database\Seeder;
use \App\Models\CarSection\CarSection;
use \App\Models\CarField\CarField;

class CarFieldsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CarField::create(["name" => "category_id", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "type_id", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "edition_id", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "octane_id", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "location_id", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "price", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "youtube", "section_id"=> CarSection::where("name", "Information")->first()->id]);

        CarField::create(["name" => "brand", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "model", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "year", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "kilometer", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "color", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "cc", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "cylinders", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "horse_power", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "torque", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "valves", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "turbo", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "auto_transmission", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "stop_start_engine", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "service_history", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "original_rims", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "first_owner", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "sensor_park_front", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "sensor_park_rear", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "air_condition", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "auto_dim_center_mirror", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "leather_seats", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "audio_radio_cd", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "audio_usb", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "m_function_steering_wheel", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "new_tires", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "paint_condition", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "xdrive_system", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "fog_light", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "electrical_trunk", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "light_sensor", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "immobilizer", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "sound_system_brand", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "center_lock", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "power_steering", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "electric_seats_with_massage", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "heads_up_display", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "touch_screen", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "original_tended_glass", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "convertible_roof", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "rear_air_condition", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "license_plat_number", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "trunk_capacity", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "chase_number", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "abs", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "ebd", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "esc", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "tc", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "break_assist", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "hill_assist", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "cruise_control", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "speed_limiter", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "air_bags", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "electric_seats", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "electric_seats_memory", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "day_running_lights", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "front_leds", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "back_leds", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "interior_ambient_light", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "manual_transmission", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "steptronic_transmission", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "zenon_lights", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "original_zenon_lights", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "rims_allow", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "rims_steel", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "rims_size", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "rear_cam", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "auto_park", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "air_condition_dual", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "side_mirror_electric", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "side_mirror_auto_folding", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "audio_aux", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "audio_bluetooth", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "run_flat_tiers", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "license_expiration", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "under_warranty", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "sun_roof", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "electrical_curtis", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "gps", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "rain_sensor", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "alarm_system", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "factory_paint_in", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "factory_paint_out", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "television", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "panoramic_sunroof", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "drive_system", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "body_condition", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "electric_windows", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "panoramic_roof", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "tires", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "blind_point_assistance", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "rear_power_outlet", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "trunk_power_outlet", "section_id"=> CarSection::where("name", "Information")->first()->id]);
        CarField::create(["name" => "motor_number", "section_id"=> CarSection::where("name", "Information")->first()->id]);
    }
}
