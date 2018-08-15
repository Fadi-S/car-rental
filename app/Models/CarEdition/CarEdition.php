<?php

namespace App\Models\CarEdition;

use Illuminate\Database\Eloquent\Model;

class CarEdition extends Model
{
    use CarEditionRelationships;

    protected $guarded = [];
}
