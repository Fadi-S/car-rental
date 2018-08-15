<?php

namespace App\Models\Client;

use App\Models\AdminLog\AdminLog;

trait ClientRelationships
{

    public function adminLog()
    {
        return $this->morphMany(AdminLog::class, 'logable');
    }

}