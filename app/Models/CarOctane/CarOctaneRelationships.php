<?php

namespace App\Models\CarOctane;

use App\Models\AdminLog\AdminLog;

trait CarOctaneRelationships
{

    public function adminLog()
    {
        return $this->morphMany(AdminLog::class, 'logable');
    }

}