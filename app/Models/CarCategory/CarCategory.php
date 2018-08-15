<?php

namespace App\Models\CarCategory;

use Illuminate\Database\Eloquent\Model;

class CarCategory extends Model
{
    use CarCategoryRelationships;

    protected $guarded = [];
}
