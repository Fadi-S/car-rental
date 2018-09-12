<?php

namespace App\Models\Image;


use App\Models\Car\Car;

trait ImageRelationships
{

    public function cars()
    {
        return $this->hasMany(Car::class);
    }

}