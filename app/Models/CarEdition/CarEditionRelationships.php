<?php

namespace App\Models\CarEdition;


use App\Models\AdminLog\AdminLog;

trait CarEditionRelationships
{

    public function adminLog()
    {
        return $this->morphMany(AdminLog::class, 'logable');
    }

}