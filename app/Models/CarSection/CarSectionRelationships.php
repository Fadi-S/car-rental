<?php

namespace App\Models\CarSection;


use App\Models\AdminLog\AdminLog;
use App\Models\CarField\CarField;

trait CarSectionRelationships
{
    public function adminLog()
    {
        return $this->morphMany(AdminLog::class, 'logable');
    }

    public function fields()
    {
        return $this->hasMany(CarField::class, "section_id");
    }
}