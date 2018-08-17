<?php

namespace App\Models\CarEdition;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CarEdition extends Model
{
    use CarEditionRelationships, SoftDeletes;

    protected $guarded = [];
}
