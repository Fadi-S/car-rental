<?php

namespace App\Models\Location;

use App\Models\AdminLog\AdminLog;

trait LocationRelationships
{

    public function adminLog()
    {
        return $this->morphMany(AdminLog::class, 'logable');
    }

}