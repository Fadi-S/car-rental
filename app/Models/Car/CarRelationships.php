<?php

namespace App\Models\Car;

use App\Models\AdminLog\AdminLog;
use App\Models\CarCategory\CarCategory;
use App\Models\CarEdition\CarEdition;
use App\Models\CarOctane\CarOctane;
use App\Models\CarType\CarType;
use App\Models\Client\Client;
use App\Models\Image\Image;
use App\Models\Location\Location;
use App\Models\Role\Role;
use App\Models\Status\Status;

trait CarRelationships
{

    public function adminLog()
    {
        return $this->morphMany(AdminLog::class, 'logable');
    }

    public function category()
    {
        return $this->belongsTo(CarCategory::class, 'category_id');
    }

    public function edition()
    {
        return $this->belongsTo(CarEdition::class, 'edition_id');
    }

    public function octane()
    {
        return $this->belongsTo(CarOctane::class, 'octane_id');
    }

    public function type()
    {
        return $this->belongsTo(CarType::class, 'type_id');
    }

    public function location()
    {
        return $this->belongsTo(Location::class, 'location_id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id');
    }

    public function images()
    {
        return $this->belongsToMany(Image::class);
    }

}