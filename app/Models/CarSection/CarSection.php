<?php

namespace App\Models\CarSection;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CarSection extends Model
{
    use CarSectionRelationships, SoftDeletes;

    protected $guarded = [];

    protected $with = ["fields"];
}
