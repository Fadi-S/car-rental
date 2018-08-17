<?php

namespace App\Models\CarType;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CarType extends Model
{
    use CarTypeRelationships, SoftDeletes;

    protected $guarded = [];
}
