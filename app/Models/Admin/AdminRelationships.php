<?php

namespace App\Models\Admin;


use App\Models\AdminLog\AdminLog;
use App\Models\Location\Location;
use App\Models\Role\Role;

trait AdminRelationships
{

    public function adminLog()
    {
        return $this->morphMany(AdminLog::class, 'logable');
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function location()
    {
        return $this->belongsTo(Location::class, 'location_id');
    }

}