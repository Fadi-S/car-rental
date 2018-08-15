<?php

namespace App\Models\CarType;

use Illuminate\Database\Eloquent\Model;

class CarType extends Model
{
    use CarTypeRelationships;

    protected $guarded = [];
}
