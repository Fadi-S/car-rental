<?php

namespace App\Models\CarImage;

use App\Models\Car\Car;

use Illuminate\Database\Eloquent\Model;

class CarImage extends Model
{
    protected $table = 'car_image';

    protected $guarded = [];
    
    public function car()
    {
        return $this->belongsTo(Car::class , 'car_id');
    }

    public function getPathAttribute($image)
    {
    	return url(\Storage::url('public/photos/cars/' . $image));
    }

}
