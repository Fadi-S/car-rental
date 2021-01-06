<?php

namespace App\Models\CarRequest;

use Illuminate\Database\Eloquent\Model;

class CarRequest extends Model
{
    use CarRequestRelationships;

    public $table = "requests";
    protected $guarded = [];
}
