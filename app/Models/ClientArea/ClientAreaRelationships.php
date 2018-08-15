<?php

namespace App\Models\ClientArea;

use App\Models\AdminLog\AdminLog;

trait ClientAreaRelationships
{

    public function adminLog()
    {
        return $this->morphMany(AdminLog::class, 'logable');
    }

}