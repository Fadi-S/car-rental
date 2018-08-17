<?php

namespace App\Models\CarOctane;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CarOctane extends Model
{
    use CarOctaneRelationships, SoftDeletes;

    protected $guarded = [];
}
