<?php

namespace App\Models\Car;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Car extends Model
{
    use SoftDeletes, CarRelationships, CarAttributes, CarMethods;

    public static $excluded =
        ["location_id", "category_id", "type_id", "octane_id", "edition_id", "price", "client_id", "youtube"];

    protected $with = ["fields"];

    protected $table = "cars";
    protected $fillable = ["serial", "client_id", "status_id", "cover"];
    protected $dates = [
        "deleted_at"
    ];

}
