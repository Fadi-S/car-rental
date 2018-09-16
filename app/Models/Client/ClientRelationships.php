<?php

namespace App\Models\Client;

use App\Models\AdminLog\AdminLog;
use App\Models\Car\Car;

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

}