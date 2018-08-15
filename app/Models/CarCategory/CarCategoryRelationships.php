<?php

namespace App\Models\CarCategory;


use App\Models\AdminLog\AdminLog;

trait CarCategoryRelationships
{

    public function adminLog()
    {
        return $this->morphMany(AdminLog::class, 'logable');
    }

}