<?php

namespace App\Models\CarType;


use App\Models\AdminLog\AdminLog;

trait CarTypeRelationships
{

    public function adminLog()
    {
        return $this->morphMany(AdminLog::class, 'logable');
    }

}