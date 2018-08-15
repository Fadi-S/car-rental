<?php

namespace App\Models\Car;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Car extends Model
{
    use SoftDeletes, CarRelationships;

    public static $excluded =
        [
            "created_at", "updated_at", "deleted_at", "archived_at", "location_id", "category_id", "type_id", "octane_id", "edition_id"
        ];

    protected $table = "cars";
    protected $guarded = [];
    protected $dates = [
        "deleted_at",
        "archived_at"
    ];

}
