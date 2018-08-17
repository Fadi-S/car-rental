<?php

namespace App\Models\CarCategory;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CarCategory extends Model
{
    use CarCategoryRelationships, SoftDeletes;

    protected $guarded = [];
}
