<?php

namespace App\Models\CarRequest;

use App\Models\Car\Car;
use App\Models\Client\Client;

trait CarRequestRelationships
{

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}