<?php

namespace App\Models\Location;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use LocationRelationships;

    protected $guarded = [];

}
