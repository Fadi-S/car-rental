<?php

namespace App\Models\Client;

use App\Models\AdminLog\AdminLog;
use App\Models\Car\Car;
use App\Models\CarRequest\CarRequest;
use App\Models\ClientArea\ClientArea;
use App\Models\Location\Location;

trait ClientRelationships
{

    public function adminLog()
    {
        return $this->morphMany(AdminLog::class, 'logable');
    }

    public function cars()
    {
        return $this->hasMany(Car::class);
    }

    public function requests()
    {
        return $this->hasMany(CarRequest::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function area()
    {
        return $this->belongsTo(ClientArea::class);
    }
}